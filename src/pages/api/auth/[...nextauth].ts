import NextAuth, { NextAuthOptions } from 'next-auth';
import clientPromise from '../../../lib/mongodb';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { CustomUser, CustomSession, CustomToken } from '../../../interfaces/interfaces';
import jwt from 'jsonwebtoken';
import { elkLog } from '../../../lib/elasticLog';

const generateSignedToken = (token: CustomToken): string => {
    const secret = process.env.NEXT_PUBLIC_SECRET;

    if (!secret) {
        throw new Error('Secret key is missing');
    }

    const signedToken = jwt.sign(token, secret);
    return signedToken;
};

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Email and Password',
            credentials: {
                email: { label: 'Email', type: 'text', placeholder: 'email@example.com' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials, req) {
                if (!credentials) {
                    throw new Error('Aucun credentials fournis');
                }
                const client = await clientPromise;
                const db = client.db('challenge_hub');

                const user = await db.collection('users').findOne({ email: credentials.email });

                if (!user) {
                    throw new Error('Aucun utilisateur trouvé avec cet e-mail');
                }

                const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

                if (!isPasswordCorrect) {
                    throw new Error('Mot de passe incorrect');
                }

                elkLog('info', 'auth:success', 'log', {
                    message: 'User successfully logged in',
                    user
                });

                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    pseudo: user.pseudo,
                    experience: user.experience,
                    level: user.level,
                    nextLevelExperience: user.nextLevelExperience,
                    permRole: user.permRole
                };
            }
        })
    ],
    theme: {
        colorScheme: 'light'
    },
    callbacks: {
        async jwt({ token, user }) {
            const newToken: CustomToken = { ...token } as CustomToken;
            const newUser: CustomUser | undefined = user as CustomUser | undefined;

            if (newUser) {
                const signedToken = generateSignedToken(newToken);

                newToken.signedToken = signedToken;
                newToken.id = newUser.id.toString();
                newToken.name = newUser.name!;
                newToken.pseudo = newUser.pseudo;
                newToken.email = newUser.email!;
                newToken.experience = newUser.experience;
                newToken.level = newUser.level;
                newToken.nextLevelExperience = newUser.nextLevelExperience;
                newToken.permRole = newUser.permRole;
            }
            return newToken;
        },
        async session({ session, token }): Promise<CustomSession> {
            const newToken: CustomToken = { ...token } as CustomToken;

            const customSession: CustomSession = {
                ...session,
                user: {
                    signedToken: newToken.signedToken,
                    id: newToken.id,
                    name: newToken.name,
                    pseudo: newToken.pseudo,
                    email: newToken.email,
                    experience: newToken.experience,
                    level: newToken.level,
                    nextLevelExperience: newToken.nextLevelExperience,
                    permRole: newToken.permRole
                }
            };

            return customSession;
        }
    },
    secret: process.env.NEXT_PUBLIC_SECRET
};

export default NextAuth(authOptions);
