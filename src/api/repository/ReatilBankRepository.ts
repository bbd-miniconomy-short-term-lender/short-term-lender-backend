import * as https from 'https';
import { getOptions } from '../../utils';
import { DebitOrderPost } from '../../types/retail-bank';

const fetch = require('node-fetch')

export class RetailBankRepository {
    private RETAIL_BANK_BASE_URL = 'https://api.retailbank.projects.bbdgrad.com';

    async createDebitOrder(body: DebitOrderPost) {
        const options = getOptions(this.RETAIL_BANK_BASE_URL, '/api/debitorders', 'POST');

        const agent = new https.Agent({
            rejectUnauthorized: options.rejectUnauthorized,
            key: options.key,
            cert: options.cert
        });

        const res = await fetch(`${options.hostname}${options.path}`, {agent: agent, method: options.method, body: JSON.stringify(body)});
        return res.json();
    }
}
