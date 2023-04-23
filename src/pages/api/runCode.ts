// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import { randomUUID } from 'crypto';
const { spawn } = require('child_process');

function runUserCode(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const dockerCommand = `docker run --rm -v ${filePath}:/usr/src/app/usercode.js --memory=256m --cpus=1 --ulimit nofile=64:64 --ulimit nproc=32:32 --pids-limit=32 --net=none --name mon-conteneur-sandbox challenge-hub-code-sandbox node usercode.js`;

        const dockerProcess = spawn('bash', ['-c', dockerCommand]);

        let output = '';
        let errors = '';

        dockerProcess.stdout.on('data', (data: any) => {
            output += data.toString();
        });

        dockerProcess.stderr.on('data', (data: any) => {
            errors += data.toString();
        });

        dockerProcess.on('close', (code: number) => {
            if (code === 0) {
                resolve(output);
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

    try {
        fs.writeFileSync(codeFilePath, req.body.code);
    } catch (error) {
        res.status(400).json({ message: 'Error, file not created' });
    }

    try {
        const result = await runUserCode(codeFilePath);
        res.status(200).json({ console: result, type: 'success' });
    } catch (error) {
        res.status(200).json({ console: error, type: 'error' });
    } finally {
        try {
            fs.unlinkSync(codeFilePath);
            console.log('File deleted successfully');
        } catch (error) {
            console.error('Error deleting the file:', error);
        }
    }
};
export default handler;
