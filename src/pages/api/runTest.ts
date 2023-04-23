// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import { randomUUID } from 'crypto';
const { spawn } = require('child_process');

function runUserTest(filePath: string, testFilePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
        // const testFilePath = `${__dirname}/../../challenges/01/test.ts`;

        // Construisez la commande Docker avec les options et les limites appropriées
        const dockerCommand = `sudo docker run --rm -v ${filePath}:/usr/src/app/usercode.js -v ${testFilePath}:/usr/src/app/challenge_test.js --memory=256m --cpus=1 --ulimit nofile=64:64 --ulimit nproc=32:32 --pids-limit=32 --net=none --name mon-conteneur-sandbox challenge-hub-code-sandbox node -e "const userFunction = require('./usercode'); const { testCases } = require('./challenge_test'); const testResults = []; for (const testCase of testCases) { const result = userFunction(testCase.input) === testCase.expectedOutput; testResults.push({ input: testCase.input, expectedOutput: testCase.expectedOutput, actualOutput: userFunction(testCase.input), passed: result }); } console.log(JSON.stringify(testResults));"`;

        // Exécutez la commande Docker en utilisant le module child_process
        const dockerProcess = spawn('bash', ['-c', dockerCommand]);

        let output = '';
        let errors = '';

        // Capturez la sortie (stdout)
        dockerProcess.stdout.on('data', (data: any) => {
            output += data.toString();
        });

        // Capturez les erreurs (stderr)
        dockerProcess.stderr.on('data', (data: any) => {
            errors += data.toString();
        });

        // Gérez le cas où le processus se termine avec succès
        dockerProcess.on('close', (code: number) => {
            if (code === 0) {
                const testResults = JSON.parse(output);
                resolve(testResults);
            } else {
                reject(errors || "Une erreur est survenue lors de l'exécution du code.");
            }
        });
    });
}

type Data = {
    message: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
    const fileName = `${randomUUID()}.js`;
    const codeFilePath = `${process.env.CODE_FILE_PATH}/${fileName}`;

    const testFilePath = `${process.env.TEST_FILE_PATH}/${req.body.id}/test.js`;

    try {
        fs.writeFileSync(codeFilePath, req.body.code);
    } catch (error) {
        res.status(400).json({ message: 'Error, file not created' });
    }

    try {
        const result = await runUserTest(codeFilePath, testFilePath);
        res.status(200).json({ console: result, type: 'success' });
    } catch (error) {
        console.log(error);
        res.status(200).json({ console: error, type: 'error' });
    } finally {
        // Supprimez le fichier utilisateur après l'exécution
        try {
            fs.unlinkSync(codeFilePath);
            console.log('File deleted successfully');
        } catch (error) {
            console.error('Error deleting the file:', error);
        }
    }
};
export default handler;
