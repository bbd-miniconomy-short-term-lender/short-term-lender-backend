import * as fs from 'fs';

export const getOptions = (base_url: string, path: string, port: number, method: string) => ({
    hostname: base_url,
    port: port,
    path: path,
    method: method,
    rejectUnauthorized: false,
    cert: fs.readFileSync('./short_term_lender 1.crt'),
    key: fs.readFileSync('./short_term_lender 1.key')
});
