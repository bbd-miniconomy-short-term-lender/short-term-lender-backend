import * as https from 'https';
import { getOptions } from '../../utils';
import { AccountBalanceResponse, LoanApplication } from '../../types/commercial-bank';

const fetch = require('node-fetch')

export class CommercialBankRepository {
    private COMMERCIAL_BANK_BASE_URL = 'https://api.commercialbank.projects.bbdgrad.com';

    async requestLoan(body: LoanApplication) {
        const options = getOptions(this.COMMERCIAL_BANK_BASE_URL, '/loans/apply', 'POST');

        const agent = new https.Agent({
            rejectUnauthorized: options.rejectUnauthorized,
            key: options.key,
            cert: options.cert
        });

        const res = await fetch(`${options.hostname}${options.path}`, {agent: agent, method: options.method, body: JSON.stringify(body)});
        return res.json();
    }

    async getAccountBalance(): Promise<AccountBalanceResponse> {
        const options = getOptions(this.COMMERCIAL_BANK_BASE_URL, '/account/balance', 'GET');

        const agent = new https.Agent({
            rejectUnauthorized: options.rejectUnauthorized,
            key: options.key,
            cert: options.cert
        });

        const res = await fetch(`${options.hostname}${options.path}`, {agent: agent, method: options.method});
        return res.json() as AccountBalanceResponse;
    }
}
