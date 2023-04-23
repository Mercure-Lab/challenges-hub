import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { signIn, useSession } from 'next-auth/react';

interface ChildComponentProps {
    onStatusChange: (newValue: boolean) => void;
    formStatus: boolean;
}
const LoginForm: React.FC<ChildComponentProps> = ({ onStatusChange, formStatus }) => {
    const [formState, setBooleanState] = useState<boolean>(formStatus);
    const [loginError, setloginError] = useState<string>('');
    const router = useRouter();
    const { data: session, status } = useSession();

    const handleStatus = (): void => {
        const newFormState = !formState;
        setBooleanState(newFormState);
        onStatusChange(newFormState);
    };

    async function handleSignIn(e: any) {
        setloginError('');
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        const result = await signIn('credentials', {
            redirect: false,
            email,
            password
        });

        if (!result?.error) {
            router.push('/profil');
        } else {
            setloginError("L'adresse e-mail ou le mot de passe est incorrect !");
        }
    }

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="w-full max-w-md mx-auto">
                <h2 className="text-4xl font-bold mb-8 text-center">Se connecter</h2>
                <div className="bg-white text-gray-900 p-8 rounded-2xl">
                    <form onSubmit={handleSignIn}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Adresse e-mail
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                required
                                placeholder="Entrez votre adresse e-mail"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Mot de passe
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                required
                                placeholder="Entrez votre mot de passe"
                            />
                        </div>
                        <div className="text-red-500 text-center mb-4">{loginError}</div>
                        <div className="flex items-center justify-between mb-4">
                            <button
                                className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Se connecter
                            </button>
                            <a
                                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                                href="#"
                            >
                                Mot de passe oublié?
                            </a>
                        </div>
                        <div className="flex items-center">
                            <div className="mx-auto">
                                <button
                                    className="discord-bg text-white font-bold py-2 px-24 rounded focus:outline-none focus:shadow-outline flex items-center justify-center"
                                    type="submit"
                                >
                                    <Image src="/discord-logo.png" alt="Discord" height={30} width={30}></Image> Discord
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <p className="text-white mt-8 text-center">
                    Vous n&apos;avez pas de compte?{' '}
                    <a onClick={handleStatus} className="font-bold text-blue-500 hover:text-blue-800" href="#">
                        Inscrivez-vous
                    </a>
                </p>
            </div>
            {session ? <p>logger : {status}</p> : <p>pas logger</p>}
        </div>
    );
};

export default LoginForm;
