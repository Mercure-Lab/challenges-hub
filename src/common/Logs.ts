class Log {
    severity: string;
    event: string;
    type: string;
    body: string;
    env: string;
    application: string;

    constructor(severity: string, event: string, type: string, others: object) {
        this.severity = severity;
        this.event = event;
        this.type = type;
        this.body = JSON.stringify(others);
        this.env = process.env.NODE_ENV || 'development';
        this.application = 'edi-services';
    }
}

export { Log };
