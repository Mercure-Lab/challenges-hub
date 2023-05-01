import Image from 'next/image';
import Link from 'next/link';
import NavBar from '@/components/navbar';
import { useState } from 'react';
import { getSession } from 'next-auth/react';
import { CustomSession } from '@/interfaces/interfaces';
import axios from 'axios';
import { elkLog } from '../lib/elasticLog';
import Head from 'next/head';
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

const languages = ['Javascript', 'Python'];
const difficulties = ['Débutant', 'Intermédiaire', 'Avancé'];

interface ProfileProps {
    customSession: CustomSession;
    challenges: Challenge[];
}

export default function Challenges({ customSession, challenges }: ProfileProps) {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState('');

    console.log('challenges', challenges);

    return (
        <>
            <Head>
                <title>Challenges Hub - Challenges</title>
            </Head>
            <main className="bg-gray-900 text-white min-h-screen">
                <NavBar customSession={customSession} />
                <section className="container py-16 mx-auto px-4">
                    <h1 className="text-5xl font-bold mb-6 text-center">Challenges</h1>

                    <div className="mb-8 flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
                        <div className="flex flex-col">
                            <label htmlFor="category" className="font-semibold">
                                Catégorie
                            </label>
                            <select
                                id="category"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="py-2 px-4 mt-1 rounded text-black"
                            >
                                <option value="">Toutes</option>
                                {languages.map((language) => (
                                    <option key={language} value={language}>
                                        {language}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="difficulty" className="font-semibold">
                                Difficulté
                            </label>
                            <select
                                id="difficulty"
                                value={selectedDifficulty}
                                onChange={(e) => setSelectedDifficulty(e.target.value)}
                                className="py-2 px-4 mt-1 rounded text-black"
                            >
                                <option value="">Toutes</option>
                                {difficulties.map((difficulty) => (
                                    <option key={difficulty} value={difficulty}>
                                        {difficulty}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {challenges
                            .slice(0, 1)
                            .filter(
                                (challenge) =>
                                    (selectedCategory === '' || challenge.category === selectedCategory) &&
                                    (selectedDifficulty === '' || challenge.difficulty === selectedDifficulty)
                            )
                            .map((challenge) => (
                                <div key={challenge._id} className="challenge rounded-xl shadow-xl overflow-hidden">
                                    <div className="relative h-48">
                                        <Image src={challenge.image} alt={challenge.title} fill={true} className="rounded-t-xl" />
                                    </div>
                                    <div className="bg-white p-4 sm:p-6 lg:p-8 text-gray-900">
                                        <h3 className="text-lg font-bold">{challenge.title}</h3>
                                        <p className="mt-2 text-sm text-gray-500">{challenge.description}</p>
                                        <Link href={`/challenge/${challenge._id}`}>
                                            <p className="mt-4 inline-block py-2 px-4 bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold rounded hover:shadow-lg hover:from-pink-600 hover:to-blue-600 transition-colors duration-200">
                                                Lancer
                                            </p>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                    </div>
                </section>
            </main>
        </>
    );
}

export async function getServerSideProps(context: any) {
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        };
    }
    const customSession: CustomSession = session as CustomSession;
    let challenges;
    try {
        challenges = await axios.get('http://127.0.0.1:3000/api/challenges');
        elkLog('info', 'challenges:getAllChallenges:success', 'log', {
            message: 'All challenges fetched',
            user: customSession
        });
    } catch (error) {
        elkLog('err', 'challenges:getAllChallenges:error', 'log', {
            message: 'Error when trying to fetch all challenges',
            user: customSession
        });
        console.log(error);
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        };
    }

    return {
        props: {
            customSession,
            challenges: challenges.data
        }
    };
}
