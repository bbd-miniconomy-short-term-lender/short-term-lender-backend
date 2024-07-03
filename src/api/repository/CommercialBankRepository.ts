import * as https from 'https';
import { getOptions } from '../../utils';
import { LoanApplication } from '../../types/commercial-bank';

const fetch = require('node-fetch')

export class CommercialBankRepository {
    private COMMERCIAL_BANK_BASE_URL = 'https://api.commercialbank.projects.bbdgrad.com';

    async requestLoan(body: LoanApplication) {
        // confirm port
        const options = getOptions(this.COMMERCIAL_BANK_BASE_URL, '/loans/apply', 3000, 'POST');

        const agent = new https.Agent({
            rejectUnauthorized: options.rejectUnauthorized,
            key: options.key,
            cert: options.cert
        });

        const res = await fetch(`${options.hostname}/loans/apply`, {agent: agent, method: options.method, body: JSON.stringify(body)});
        return res.json();
    }
}
