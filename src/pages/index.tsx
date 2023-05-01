import Image from 'next/image';
import NavBar from '@/components/navbar';
import Head from 'next/head';
import { getSession } from 'next-auth/react';
import { CustomSession } from '@/interfaces/interfaces';

interface ProfileProps {
    customSession: CustomSession;
}

export default function Home({ customSession }: ProfileProps) {
    return (
        <>
            <Head>
                <title>Challenges Hub - Accueil</title>
            </Head>

            {/* <div
                id="defaultModal"
                className="z-10 fixed top-0 left-0 right-0 grid content-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
            >
                <div>
                    <dialog open className="rounded-lg">
                        <div className="rounded-2xl bg-gradient-to-r from-pink-500 to-blue-500 p-1 shadow-xl">
                            <a className="block rounded-xl bg-white p-4 sm:p-6 lg:p-8" href="">
                                <div className="mt-0">
                                    <h3 className="text-lg font-bold text-gray-900 sm:text-xl">Evénement en cours</h3>

                                    <p className="mt-2 text-sm text-gray-500">
                                        Un challenge pour dévelopeur, organisé par <b>Talent-Hub</b> est en cours !
                                    </p>

                                    <form method="dialog">
                                        <button>Voir</button>
                                    </form>
                                </div>
                            </a>
                        </div>
                    </dialog>
                </div>
            </div> */}

            <main className="bg-gray-900 text-white min-h-screen ">
                {' '}
                {/*blur-xl */}
                <NavBar customSession={customSession} />
                <section className="container py-16 flex flex-col md:flex-row items-center mx-auto">
                    <div className="container px-4 md:w-1/2">
                        <h1 className="text-5xl font-bold mb-6">
                            Bienvenue <br /> sur notre plateforme de code
                        </h1>
                        <p className="text-2xl font-semibold mb-10">
                            Apprenez à coder en relevant des défis et en résolvant des problèmes
                        </p>
                        <div className="flex justify-center space-x-4">
                            <button className="animate-bounce  bg-purple-500 px-8 py-4 rounded-full font-semibold hover:shadow-blue-500 transition-colors duration-200">
                                Commencez maintenant
                            </button>
                            <button className="bg-white text-blue-500 px-8 py-4 rounded-full font-semibold hover:bg-blue-100 transition-colors duration-200">
                                En savoir plus
                            </button>
                        </div>
                    </div>
                    <div className="md:w-1/2">
                        <Image src={'/dev-top-landing.webp'} alt="Developer" width="500" height="500"></Image>
                    </div>
                </section>
                <section className="container mx-auto px-4 py-16">
                    <h2 className="text-4xl font-bold mb-8 text-center">Fonctionnalités</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="rounded-2xl bg-gradient-to-r from-pink-500 to-blue-500 p-1 shadow-xl">
                            <a className="block rounded-xl bg-white p-4 sm:p-6 lg:p-8" href="">
                                <div className="mt-0">
                                    <h3 className="text-lg font-bold text-gray-900 sm:text-xl">Défis de développement</h3>

                                    <p className="mt-2 text-sm text-gray-500">
                                        Améliorez vos compétences en programmation en résolvant une variété de défis de codage
                                        adaptés à votre niveau.
                                    </p>
                                </div>
                            </a>
                        </div>
                        <div className="rounded-2xl bg-blue-500 p-1 shadow-xl">
                            <a className="block rounded-xl bg-white p-4 sm:p-6 lg:p-8" href="">
                                <div className="mt-0">
                                    <h3 className="text-lg font-bold text-gray-900 sm:text-xl">Évaluation en temps réel</h3>

                                    <p className="mt-2 text-sm text-gray-500">
                                        Obtenez des retours instantanés sur votre code et découvrez comment améliorer vos
                                        solutions grâçe à nos challenges.
                                    </p>
                                </div>
                            </a>
                        </div>
                        <div className="rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 p-1 shadow-xl">
                            <a className="block rounded-xl bg-white p-4 sm:p-6 lg:p-8" href="">
                                <div className="mt-0">
                                    <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                                        Communauté d&apos;apprentissage
                                    </h3>

                                    <p className="mt-2 text-sm text-gray-500">
                                        Apprenez des autres, partagez vos connaissances et collaborez sur des projets au sein de
                                        notre communauté.{' '}
                                    </p>
                                </div>
                            </a>
                        </div>
                    </div>
                </section>
                <section className="py-16 ">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-4xl font-bold mb-8">Rejoignez notre communauté</h2>
                        <p className="text-2xl font-semibold mb-10">
                            Rejoignez notre plateforme dès aujourd&apos;hui et démarrez votre parcours d&apos;apprentissage en
                            programmation !
                        </p>
                        <button className="hover-grow bg-blue-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-600 transition-colors duration-200">
                            Inscrivez-vous gratuitement
                        </button>
                    </div>
                </section>
                <section className="container mx-auto px-4 py-16">
                    <h2 className="text-4xl font-bold mb-8 text-center">Témoignages</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-gray-900">
                        <a
                            href="#"
                            className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 bg-white"
                        >
                            <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-pink-500 to-blue-500"></span>

                            <div className="sm:flex sm:justify-between sm:gap-4">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                                        S&apos;amuser tout en apprenant
                                    </h3>

                                    <p className="mt-1 text-xs font-medium text-gray-600">Par John Doe</p>
                                </div>

                                <div className="hidden sm:block sm:shrink-0">
                                    <Image
                                        alt="Paul Clapton"
                                        src={'/js.png'}
                                        className="h-16 w-16 rounded-lg object-cover shadow-sm"
                                        height={64}
                                        width={64}
                                    />
                                </div>
                            </div>

                            <div className="mt-4">
                                <p className="max-w-[40ch] text-sm text-gray-500">
                                    <span className="text-lg italic mb-4">
                                        &quot;Cette plateforme m&apos;a permis de développer mes compétences en programmation tout
                                        en m&apos;amusant. Les défis sont stimulants et instructifs.&quot;
                                    </span>
                                </p>
                            </div>
                        </a>

                        <a
                            href="#"
                            className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 bg-white"
                        >
                            <span className="absolute inset-x-0 bottom-0 h-2  bg-blue-500"></span>

                            <div className="sm:flex sm:justify-between sm:gap-4">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                                        Mon rendez vous quotidien pour apprendre
                                    </h3>

                                    <p className="mt-1 text-xs font-medium text-gray-600">Par John Doe</p>
                                </div>

                                <div className="hidden sm:block sm:shrink-0">
                                    <Image
                                        alt="Paul Clapton"
                                        src={'/js.png'}
                                        className="h-16 w-16 rounded-lg object-cover shadow-sm"
                                        height={64}
                                        width={64}
                                    />
                                </div>
                            </div>

                            <div className="mt-4">
                                <p className="max-w-[40ch] text-sm text-gray-500">
                                    <span className="text-lg italic mb-4">
                                        &quot;Je suis impressionné par la qualité des défis et la facilité d&apos;utilisation de
                                        la plateforme. Je la recommande vivement à tous ceux qui souhaitent apprendre à
                                        coder.&quot;
                                    </span>
                                </p>
                            </div>
                        </a>

                        <a
                            href="#"
                            className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 bg-white"
                        >
                            <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-blue-500 to-purple-500"></span>

                            <div className="sm:flex sm:justify-between sm:gap-4">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 sm:text-xl">Une plateforme de qualité</h3>

                                    <p className="mt-1 text-xs font-medium text-gray-600">Par John Doe</p>
                                </div>

                                <div className="hidden sm:block sm:shrink-0">
                                    <Image
                                        alt="Paul Clapton"
                                        src={'/js.png'}
                                        className="h-16 w-16 rounded-lg object-cover shadow-sm"
                                        height={64}
                                        width={64}
                                    />
                                </div>
                            </div>

                            <div className="mt-4">
                                <p className="max-w-[40ch] text-sm text-gray-500">
                                    <span className="text-lg italic mb-4 ">
                                        &quot;La communauté est incroyablement utile et encourageante. J&apos;ai beaucoup appris
                                        grâce aux autres membres et aux ressources partagées sur la plateforme.&quot;
                                    </span>
                                </p>
                            </div>
                        </a>
                    </div>

                    <section className="py-16 ">
                        <div className="container mx-auto px-4 text-center">
                            <h2 className="text-4xl font-bold mb-8">Team</h2>
                            <p className="text-2xl font-semibold mb-10">
                                Vous voulez ajouter votre pière à l&apos;édifice ? Rejoignez notre équipe !
                            </p>
                            <div className="flex flex-row justify-center">
                                <div className="basis-1/4">
                                    <div className="flex flex-row justify-center text-left">
                                        <div className="mr-4">
                                            <Image
                                                src="/d3Ex2.jpg"
                                                alt="d3Ex2"
                                                width={150}
                                                height={150}
                                                className="rounded"
                                            ></Image>
                                        </div>
                                        <div className="">
                                            <b>d3Ex2</b>
                                            <br />
                                            Fondateur & Developpeur
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
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
