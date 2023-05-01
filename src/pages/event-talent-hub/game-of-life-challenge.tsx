import Image from 'next/image';
import NavBar from '@/components/navbar';
import { CustomSession } from '@/interfaces/interfaces';
import { getSession } from 'next-auth/react';
import CountUp from 'react-countup';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faIdBadge } from '@fortawesome/free-solid-svg-icons';
import Timer from '@/components/Timer';

interface ProfileProps {
    customSession: CustomSession;
}

export default function Profile({ customSession }: ProfileProps) {
    const percentage = 75;
    const targetDateTimeUTC = '2023-05-01T15:38:00.000Z';

    const targetDateTimeInDateObject = new Date(targetDateTimeUTC);
    const now = new Date();

    console.log('targetDateTimeInDateObject', targetDateTimeInDateObject);
    console.log('now', now);

    return (
        <>
            <Head>
                <title>Challenges Hub - Profil</title>
            </Head>
            <main className="bg-gray-900 text-white min-h-screen">
                <NavBar customSession={customSession} />
                <div className="container mx-auto px-4 py-16">
                    <div className="rounded-2xl bg-white text-gray-900 shadow-xl p-8 sm:p-12 lg:p-16">
                        <div className="">
                            <div className="row-span-4 text-center">
                                <h2 className="text-4xl font-bold mb-4">Game of Life</h2>
                                <h3 className="text-2xl font-bold mb-4">
                                    Temps restant{' '}
                                    {now < targetDateTimeInDateObject ? (
                                        <span className="text-green-500">
                                            {' '}
                                            <Timer targetDateTime={targetDateTimeUTC} />
                                        </span>
                                    ) : (
                                        <>
                                            <br />
                                            <span className="text-red-500">Temps écoulé</span>
                                        </>
                                    )}
                                </h3>
                                <p className="text-2xl font-semibold mb-10">{customSession?.user.pseudo}</p>
                                <h3 className="text-2xl font-bold mb-4">Enoncé</h3>
                                <hr />
                                <div className="flex text-left m-4">
                                    <div className="flex-none w-1/3">
                                        <Image
                                            // className="border-solid border-2 border-purple-500"
                                            src="/game-of-life-gif.gif"
                                            height={400}
                                            width={400}
                                            alt="game-of-life"
                                        ></Image>
                                    </div>
                                    <div className="flex-initial w-2/3">
                                        <p>
                                            Le Jeu de la vie est un « jeu à zéro joueur », puisqu&apos;il ne nécessite aucune
                                            intervention du joueur lors de son déroulement. Il s’agit d’un automate cellulaire, un
                                            modèle où chaque état conduit mécaniquement à l’état suivant à partir de règles
                                            préétablies.
                                        </p>
                                        <br />
                                        <p>
                                            Le jeu se déroule sur une grille à deux dimensions, théoriquement infinie, dont les
                                            cases — appelées « cellules », par analogie avec les cellules vivantes — peuvent
                                            prendre deux états distincts : « vivante » ou « morte ».
                                        </p>
                                        <br />
                                        <p>
                                            Une cellule possède huit voisines, qui sont les cellules adjacentes horizontalement,
                                            verticalement et diagonalement. À chaque itération, l&apos;état d’une cellule est
                                            entièrement déterminée par l’état de ses huit cellules voisines, selon les règles
                                            suivantes :<br />
                                            <br />
                                            <FontAwesomeIcon icon={faArrowRight} /> Une cellule morte possédant exactement trois
                                            cellules voisines vivantes devient vivante, elle naît. <br />
                                            <FontAwesomeIcon icon={faArrowRight} /> Une cellule vivante possédant deux ou trois
                                            cellules voisines vivantes le reste, sinon elle meurt.
                                        </p>
                                        <br />
                                        <p>
                                            Plus d&apos;information{' '}
                                            <a className="text-blue-500" href="https://fr.wikipedia.org/wiki/Jeu_de_la_vie">
                                                ici.
                                            </a>{' '}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-4 mt-10">Rendu</h3>
                                    <hr />
                                    <div className="mt-4">
                                        <p>
                                            <b>Type de projet : </b> Web
                                            <br />
                                            <b>Technologies : </b> Aucune restriction
                                            <br />
                                            <b>Architecture : </b> Tout doit se faire faire côté client. (Pas de back-end donc)
                                        </p>
                                        <br />
                                        <p>
                                            Le rendu doit être fait dans le temps imparti. Tout commit fait <b> après ce délai</b>{' '}
                                            vous disqualifiera automatiquement du challenge.
                                        </p>
                                        <br />
                                        <p>
                                            Le rendu doit être sous la forme d&apos;un dépôt Github contenant un fichier README.md
                                            expliquant comment accéder à la page web.
                                        </p>
                                        <br />
                                        <div className="flex justify-center">
                                            {now > targetDateTimeInDateObject && (
                                                <form action="">
                                                    <button
                                                        type="submit"
                                                        className="mt-4 text-white bg-purple-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-purple-500 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                    >
                                                        <a
                                                            href="https://docs.google.com/forms/d/e/1FAIpQLSfIsgHGd2zWzT6WS9Yj_ysR03O2fLKagnEyJzhepsPSKRfZeA/viewform"
                                                            target="_blank"
                                                        >
                                                            Rendre le projet
                                                        </a>
                                                    </button>
                                                </form>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="">
                                    <h3 className="text-2xl font-bold mb-4 mt-10">Lots à gagner</h3>
                                    <hr />
                                    <div className="mt-4 ">
                                        <p>
                                            Un jury évaluera les projets sur différents critères et décernera un prix au
                                            challenger qui aura le meilleur projet.
                                        </p>
                                        <br />
                                        <div className="flex justify-center">
                                            <div className="w-1/2 flex justify-end">
                                                <Image
                                                    // className="border-solid border-2 border-purple-500"
                                                    src="/badge-placeholder.png"
                                                    height={100}
                                                    width={100}
                                                    alt="game-of-life"
                                                ></Image>
                                            </div>
                                            <div className="w-1/2 text-left">
                                                <p className="mt-4">Un badge exclusif sur la V2 du site Talent-Hub</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-center mt-4">
                                            <div className="w-1/2 flex justify-end">
                                                <Image
                                                    // className="border-solid border-2 border-purple-500"
                                                    src="/discord-logo.png"
                                                    height={100}
                                                    width={100}
                                                    alt="game-of-life"
                                                ></Image>
                                            </div>
                                            <div className="w-1/2 text-left">
                                                <p className="mt-4">Un rôle exclusif sur le discord Talent-Hub</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-center mt-4">
                                            <div className="w-1/2 flex justify-end">
                                                <Image
                                                    // className="border-solid border-2 border-purple-500"
                                                    src="/discord-nitro.jpeg"
                                                    height={90}
                                                    width={90}
                                                    alt="game-of-life"
                                                ></Image>
                                            </div>
                                            <div className="w-1/2 text-left">
                                                <p className="mt-4">Un nitro pour une période d&apos;un mois.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
