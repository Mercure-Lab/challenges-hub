import React, { useState } from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff, faUser, faCode, faMessage, faGear } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { getSession } from 'next-auth/react';
import { CustomSession } from '@/interfaces/interfaces';

interface ProfileProps {
    customSession: CustomSession;
}

const logOut = () => {
    signOut();
};

const NavBar = ({ customSession }: ProfileProps) => {
    // const { data: session, status } = useSession();
    console.log('session', customSession);
    return (
        <header className="text-white pt-4">
            <nav className="container mx-auto px-4 flex items-center justify-between bg-purple-500 text-white py-4 rounded-t-2xl rounded-b-3xl overflow-hidden">
                <Image src="/logo.png" alt="Logo" width={50} height={50} />
                <div className="text-2xl font-semibold">
                    <Link href="/">Challenge Hub</Link>
                </div>
                <ul className="hidden md:flex space-x-4">
                    <li>
                        <Link href="/" className="hover:text-pink-400 transition-colors duration-200">
                            <FontAwesomeIcon icon={faMessage} />
                        </Link>
                    </li>

                    {customSession && (
                        <li className="group">
                            <Link href="/challenges" className="hover:text-pink-400 transition-colors duration-200">
                                <FontAwesomeIcon icon={faCode} />
                            </Link>
                            {/* <span className="group-hover:opacity-100 transition-opacity bg-pink-400 px-1 text-sm text-gray-100 rounded-md absolute mt-6 mr-6 opacity-0 mx-auto">
                                Tooltip
                            </span> */}
                        </li>
                    )}

                    {customSession && (
                        <li>
                            <Link href="/profil" className="hover:text-pink-400 transition-colors duration-200">
                                <FontAwesomeIcon icon={faUser} />
                            </Link>
                        </li>
                    )}

                    {customSession && customSession.user?.permRole === 'owner' && (
                        <li>
                            <Link href="/admin" className="hover:text-pink-400 transition-colors duration-200">
                                <FontAwesomeIcon icon={faGear} />
                            </Link>
                        </li>
                    )}

                    {customSession ? (
                        <li>
                            <button onClick={logOut} className="hover:text-pink-400 transition-colors duration-200">
                                <FontAwesomeIcon icon={faPowerOff} />
                            </button>
                        </li>
                    ) : (
                        <li>
                            <Link href="/login" className="hover:text-pink-400 transition-colors duration-200">
                                <FontAwesomeIcon icon={faPowerOff} className="animate-bounce" />
                            </Link>
                        </li>
                    )}
                </ul>
                <div className="md:hidden flex items-center">
                    <button id="mobile-menu-button">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
            </nav>
            <ul id="mobile-menu" className="mobile-menu hidden md:hidden mt-4 space-y-2">
                <li>
                    <Link href="/" className="hover:text-pink-400 transition-colors duration-200">
                        Accueil
                    </Link>
                </li>
                <li>
                    <Link href="/defis" className="hover:text-pink-400 transition-colors duration-200">
                        Défis
                    </Link>
                </li>
                <li>
                    <Link href="/communaute" className="hover:text-pink-400 transition-colors duration-200">
                        Communauté
                    </Link>
                </li>
                <li>
                    <Link href="/ressources" className="hover:text-pink-400 transition-colors duration-200">
                        Ressources
                    </Link>
                </li>
                <li>
                    <Link href="/contact" className="hover:text-pink-400 transition-colors duration-200">
                        Contact
                    </Link>
                </li>
            </ul>
        </header>
    );
};

export default NavBar;
