import NextAuth, { NextAuthOptions, User, Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';

interface CustomUser extends User {
    id: string;
    experience: number;
    level: number;
    nextLevelExperience: number;
    pseudo: string;
    permRole: string;
}
interface CustomSession extends Session {
    user: {
        signedToken: string;
        id: string;
        name: string | null;
        pseudo: string;
        email: string | null;
        experience: number;
        level: number;
        nextLevelExperience: number;
        permRole: string;
    };
}

interface CustomToken extends JWT {
    signedToken: string;
    id: string;
    name: string | null;
    pseudo: string;
    email: string | null;
    experience: number;
    level: number;
    nextLevelExperience: number;
    permRole: string;
}

enum Language {
    javascript = 'Javascript',
    python = 'Python'
}
enum Difficulty {
    beginner = 'Débutant',
    intermediate = 'Intermédiaire',
    advanced = 'Avancé'
}

interface Challenge {
    _id: number;
    title: string;
    description: string;
    image: string;
    category: Language;
    difficulty: Difficulty;
}

export type { CustomUser, CustomSession, CustomToken, Language, Difficulty, Challenge };
