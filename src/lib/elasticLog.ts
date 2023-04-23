import axios from 'axios';
import { getConfig } from '../config/config';
import { randomUUID } from 'crypto';
import { Log } from '../common/Logs';

const config = getConfig();

// const headers = {
//     Authorization: config.elastic.apiKey
// };

const elkLog = async (severity: string, event: string, type: string, data: object): Promise<void> => {
    if (config.elastic.index) {
        const payload: Log = new Log(severity, event, type, data);
        const id: string = randomUUID();
        await axios.post(
            `${config.elastic.baseURL}/${config.elastic.index}/_create/${id}`,
            {
                severity,
                event,
                type,
                ...data,
                '@timestamp': new Date().toISOString()
            }
            // {
            //     headers
            // }
        );
    }
};

export { elkLog };
