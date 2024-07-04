import * as fs from 'fs';
import { HandOfZeusRepository } from '../api/repository/HandOfZeusRepository';

export const getOptions = (base_url: string, path: string, method: string) => ({
    headers: {
        'X-Origin': 'short-term-lender',
    },
    hostname: base_url,
    path: path,
    method: method,
    rejectUnauthorized: false,
    cert: fs.readFileSync('./src/utils/short_term_lender 1.crt'),
    key: fs.readFileSync('./src/utils/short_term_lender 1.key')
});

export const getLoanEndDate = async (repository: HandOfZeusRepository, time: number): Promise<string> => {
    const nextSixMonths = 12 * 60 * 60 * 1000;

    const response = await repository.getcurrentDate(time + nextSixMonths);

    return response.date;
}
