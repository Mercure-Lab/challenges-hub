import React, { useState } from 'react';

interface ChildComponentProps {
    onStatusChange: (newValue: boolean) => void;
    status: boolean;
}
const RegisterForm: React.FC<ChildComponentProps> = ({ onStatusChange, status }) => {
    const [formState, setBooleanState] = useState<boolean>(status);

    const handleStatus = (): void => {
        console.log('poneyB', formState);

        const newFormState = !formState;
        setBooleanState(newFormState);
        onStatusChange(newFormState);
    };

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="w-full max-w-md mx-auto">
                <h2 className="text-4xl font-bold mb-8 text-center">S&apos;enregistrer</h2>
                <div className="bg-white text-gray-900 p-8 rounded-2xl">
                    <form>
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
                        <div className="flex items-center justify-between">
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
                    </form>
                </div>
                <p className="text-white mt-8 text-center">
                    Vous avez déjà compte?{' '}
                    <a onClick={handleStatus} className="font-bold text-blue-500 hover:text-blue-800" href="#">
                        Connectez vous
                    </a>
                </p>
            </div>
        </div>
    );
};

export default RegisterForm;
