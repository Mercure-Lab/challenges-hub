import { join } from 'path';
import { readFileSync } from 'fs';
import configFile from '../../config.json';

// const configFile = JSON.parse(
//     readFileSync(process.env.CONFIG_PATH || '../../config.json', {
//         encoding: 'utf8',
//         flag: 'r'
//     })
// );

if (!configFile.elastic.baseURL || !configFile.elastic.index) {
    console.error('Missing elastic_base_url / elastic_index in config file');
    process.exit(1);
}

interface ElkConfig {
    baseURL: string;
    index: string;
    apiKey: string;
}

interface Config {
    env: string;
    elastic: ElkConfig;
}

const config: Config = {
    env: process.env.NODE_ENV || 'development',
    elastic: {
        baseURL: configFile.elastic.baseURL,
        index: configFile.elastic.index,
        apiKey: configFile.elastic.apiKey
    }
};

const getConfig = (): Config => config;

export type { Config };
export { getConfig };
