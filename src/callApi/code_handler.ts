import axios from 'axios';

const sendCodeForSandboxing = async (code: string) => {
    const response = await axios.post('/api/runCode', {
        code: code
    });
    return response.data;
};

const sendCodeForTestSandboxing = async (code: string, id: number) => {
    const response = await axios.post('/api/runTest', {
        code: code,
        id
    });
    return response.data;
};

export { sendCodeForSandboxing, sendCodeForTestSandboxing };
