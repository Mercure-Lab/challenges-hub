import { useRef, useState } from 'react';
import MonacoEditor from '../../components/monacoEditor';
import { sendCodeForSandboxing, sendCodeForTestSandboxing } from '../../callApi/code_handler';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faRocket } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { elkLog } from '@/lib/elasticLog';
import { getSession } from 'next-auth/react';
import { CustomSession, Challenge } from '@/interfaces/interfaces';
import axios from 'axios';
import Head from 'next/head';

interface ProfileProps {
    customSession: CustomSession;
    challenge: Challenge;
}

export default function Challenge({ customSession, challenge }: ProfileProps) {
    const monacoEditorRef = useRef<{ getValue: () => string | undefined }>();
    const [consoleOutput, setConsoleOutput] = useState<string>('');
    const [testResults, setTestResults] = useState<[]>([]);
    const [testAreValid, setTestAreValid] = useState<boolean>(false);

    const runCode = async () => {
        const editorValue = monacoEditorRef.current?.getValue();
        if (editorValue) {
            const response = await sendCodeForSandboxing(editorValue);
            console.log(response);
            setConsoleOutput(response.console);
        } else {
            alert("Impossible d'obtenir la valeur de l'éditeur");
        }
    };

    const runTest = async () => {
        setTestAreValid(false);
        const editorValue = monacoEditorRef.current?.getValue();
        if (editorValue) {
            const response = await sendCodeForTestSandboxing(editorValue, challenge._id);
            if (response.type === 'error') {
                setTestResults(response.console);
                setTestAreValid(false);
            } else {
                setTestResults(response.console);
                setTestAreValid(true);
            }
        } else {
            alert("Impossible d'obtenir la valeur de l'éditeur");
        }
    };

    return (
        <>
            <Head>
                <title>Challenges Hub - Challenge</title>
            </Head>
            <main className="bg-gray-900 text-white min-h-screen">
                <div className="rocket-container">
                    <FontAwesomeIcon icon={faRocket} className="rocket rocket-1" />
                </div>
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-12 gap-8">
                        <div className="col-span-12 md:col-span-4">
                            <h1 className="text-4xl font-bold mb-4">Challenge</h1>
                            {challenge.description}
                            {/* <p>
                            Ecrire un algorithme qui demande un nombre de départ, et qui calcule la somme des entiers jusqu’à ce
                            nombre.
                        </p>
                        <p>Par exemple, si l’on entre 5, le programme doit calculer : 1 + 2 + 3 + 4 + 5 = 15</p>
                        <p> NB : on souhaite afficher uniquement le résultat, pas la décomposition du calcul.</p>
                        <p>
                            Niveau : <b>Noob</b>
                        </p> */}
                        </div>
                        <div className="col-span-12 md:col-span-8 h-[45vh]">
                            <h1 className="text-4xl font-bold mb-4">Code Editor</h1>
                            <div className="bg-white text-black rounded-lg p-4">
                                <MonacoEditor ref={monacoEditorRef} />
                            </div>
                            <div className="flex mt-4 relative">
                                <div className="absolute top-0 right-0">
                                    <button
                                        onClick={runCode}
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4 transition duration-300"
                                    >
                                        Run ▶️
                                    </button>
                                    <button
                                        onClick={runTest}
                                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                                    >
                                        Test ✅
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-4 mt-24">
                            <h1 className="text-4xl font-bold mb-4">Astuces</h1>
                            <div className="bg-gray-800 text-white rounded-lg p-4">Astuces</div>
                        </div>
                        <div className="col-span-8 mt-24">
                            <h1 className="text-4xl font-bold mb-4">Console</h1>
                            <div className="bg-gray-800 text-white rounded-lg p-4">
                                <pre className="p-4">{consoleOutput}</pre>
                                {testResults &&
                                    testResults.map((test: any, index: number) => (
                                        <div key={index} className="bg-gray-700 rounded-lg p-4 mb-2">
                                            {test.passed ? (
                                                <span className="text-green-500">
                                                    <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                                                    Test réussi : Input({test.input}) ={'>'} Expected Output:{' '}
                                                    {test.expectedOutput}, Actual Output: {test.actualOutput}
                                                </span>
                                            ) : (
                                                <span className="text-red-500">
                                                    <FontAwesomeIcon icon={faTimesCircle} className="mr-2" />
                                                    Test échoué : Input({test.input}) ={'>'} Expected Output:{' '}
                                                    {test.expectedOutput}, Actual Output: {test.actualOutput}
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                {testAreValid && (
                                    <button
                                        onClick={() => {}}
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 transition duration-300"
                                    >
                                        Valider l&apos;exercice
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export async function getServerSideProps(context: any) {
    const { id } = context.query;

    console.log(id);
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

    let challenge;
    try {
        challenge = await axios.get(`http://localhost:3000/api/challenge/${id}`);
        elkLog('info', 'challenges:getChallenge:success', 'log', {
            message: 'All challenges fetched',
            challengeId: id,
            user: customSession
        });
    } catch (error) {
        elkLog('err', 'challenges:getChallenge:error', 'log', {
            message: 'Error when trying to fetch a challenges',
            challengeId: id,
            user: customSession
        });

        return {
            redirect: {
                destination: '/challenges',
                permanent: false
            }
        };
    }

    return {
        props: {
            customSession,
            challenge: challenge.data
        }
    };
}
