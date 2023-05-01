import Image from 'next/image';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import ProgressProvider from '@/components/ProgressProvider';
import 'react-circular-progressbar/dist/styles.css';
import NavBar from '@/components/navbar';
import { CustomSession } from '@/interfaces/interfaces';
import { getSession } from 'next-auth/react';
import CountUp from 'react-countup';
import Head from 'next/head';

interface ProfileProps {
    customSession: CustomSession;
}

export default function Profile({ customSession }: ProfileProps) {
    const percentage = 75;

    return (
        <>
            <Head>
                <title>Challenges Hub - Profil</title>
            </Head>
            <main className="bg-gray-900 text-white min-h-screen">
                <NavBar customSession={customSession} />
                <div className="container mx-auto px-4 py-16">
                    <div className="rounded-2xl bg-white text-gray-900 shadow-xl p-8 sm:p-12 lg:p-16">
                        <div className="grid grid-rows-2 grid-flow-col gap-4">
                            <div className="row-span-4">
                                <h2 className="text-4xl font-bold mb-4">Votre profil</h2>
                                <p className="text-2xl font-semibold mb-10">{customSession?.user.pseudo}</p>
                                <h3 className="text-2xl font-bold mb-4">Badges</h3>
                                <hr />
                                <div className="grid grid-cols-5 gap-2 pl-2 pt-4">
                                    <div>
                                        <Image src="/badge.png" alt="Badge 1" width="100" height="100" />
                                    </div>
                                    <div>
                                        <Image src="/badge.png" alt="Badge 2" width="100" height="100" />
                                    </div>
                                    <div>
                                        <Image src="/badge.png" alt="Badge 3" width="100" height="100" />
                                    </div>
                                    <div>
                                        <Image src="/badge.png" alt="Badge 1" width="100" height="100" />
                                    </div>
                                    <div>
                                        <Image src="/badge.png" alt="Badge 2" width="100" height="100" />
                                    </div>
                                    <div>
                                        <Image src="/badge.png" alt="Badge 3" width="100" height="100" />
                                    </div>
                                    <div>
                                        <Image src="/badge.png" alt="Badge 3" width="100" height="100" />
                                    </div>
                                    <div>
                                        <Image src="/badge.png" alt="Badge 1" width="100" height="100" />
                                    </div>
                                    <div>
                                        <Image src="/badge.png" alt="Badge 2" width="100" height="100" />
                                    </div>
                                    <div>
                                        <Image src="/badge.png" alt="Badge 3" width="100" height="100" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-4 mt-10">Statistiques</h3>
                                    <hr />
                                    <div className="grid grid-cols-2 gap-4 pt-4">
                                        <div className="text-center">
                                            <p className="text-2xl font-semibold mb-4">Challenges lancées</p>
                                            <p className="text-4xl font-bold">
                                                <CountUp end={25} />
                                            </p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-2xl font-semibold mb-4">Challenges réussis</p>
                                            <p className="text-4xl font-bold">
                                                <CountUp end={19} />
                                            </p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-2xl font-semibold mb-4">Taux de réussite</p>
                                            <p className="text-4xl font-bold text-green-600">
                                                <CountUp end={87} />%
                                            </p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-2xl font-semibold mb-4">Nombres de caractères</p>
                                            <p className="text-4xl font-bold">
                                                <CountUp end={1345} />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center p-8 ">
                                <div className="w-52">
                                    <h3 className="text-2xl font-bold mb-4">Niveau en cours</h3>
                                    <ProgressProvider valueStart={0} valueEnd={percentage}>
                                        {(percentage: any) => (
                                            <CircularProgressbar
                                                value={percentage}
                                                text={`${percentage}%`}
                                                styles={buildStyles({
                                                    strokeLinecap: 'butt',
                                                    textSize: '24px',
                                                    pathColor: '#A855F7',
                                                    textColor: '#A855F7',
                                                    trailColor: '#D3D3D3'
                                                })}
                                            />
                                        )}
                                    </ProgressProvider>

                                    <p className="text-2xl font-semibold mt-6">Niveau 5</p>
                                </div>
                            </div>
                            <div className="row-span-2 col-span-2">3</div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export async function getServerSideProps(context: any) {
    console.log('context', context);
    const session = await getSession(context);
    console.log(session);
    if (!session) {
        console.log('neeeeein');
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        };
    }
    const customSession: CustomSession = session as CustomSession;

    return {
        props: {
            customSession
        }
    };
}
