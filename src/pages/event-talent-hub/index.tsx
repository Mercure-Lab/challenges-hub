import Link from 'next/link';
import NavBar from '@/components/navbar';
import { getSession } from 'next-auth/react';
import { CustomSession } from '@/interfaces/interfaces';
// import { elkLog } from '../lib/elasticLog';
import Head from 'next/head';

interface ProfileProps {
    customSession: CustomSession;
}

const cards = [
    {
        value: 'game-of-life-challenge',
        label: 'Challenge : Game of Life',
        description: 'Participer au premier event développeur de la communauté.',
        id: 1
    }
    // {
    //     value: 'manage-users',
    //     label: 'Gérer les utilisateurs',
    //     description: 'Créer manuellement un compte, afficher la liste des utilisateurs.',
    //     id: 2
    // },
    // {
    //     value: 'manage-discord-servers',
    //     label: 'Gérer les serveurs discord',
    //     description: 'Voir les serveurs discord linker.',
    //     id: 2
    // }
];

export default function Challenges({ customSession }: ProfileProps) {
    return (
        <>
            <Head>
                <title>Challenges Hub - Events</title>
            </Head>
            <main className="bg-gray-900 text-white min-h-screen">
                <NavBar customSession={customSession} />
                <section className="container py-16 mx-auto px-4">
                    <h1 className="text-5xl font-bold mb-6 text-center">Talent Hub Event</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cards.map((card) => (
                            <div key={card.id} className="challenge rounded-xl shadow-xl overflow-hidden">
                                {/* <div className="relative h-48">
                                    <Image src={challenge.image} alt={challenge.title} fill={true} className="rounded-t-xl" />
                                </div> */}
                                <div className="bg-white p-4 sm:p-6 lg:p-8 text-gray-900">
                                    <h3 className="text-lg font-bold">{card.label}</h3>
                                    <p className="mt-2 text-sm text-gray-500">{card.description}</p>
                                    <Link href={`/event-talent-hub/${card.value}`}>
                                        <p className="mt-4 inline-block py-2 px-4 bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold rounded hover:shadow-lg hover:from-pink-600 hover:to-blue-600 transition-colors duration-200">
                                            Aller
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
    const customSession: CustomSession = session as CustomSession;

    return {
        props: {
            customSession
        }
    };
}
