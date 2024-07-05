import * as https from 'https';
import { getOptions } from '../../utils';

const fetch = require('node-fetch')

export class RevenueServiceRepository {
    private REVENUE_BASE_URL = 'https://api.mers.projects.bbdgrad.com';

    async register(body: {businessName: string}): Promise<{taxId: string}> {
        const options = getOptions(this.REVENUE_BASE_URL, '/api/taxpayer/business/register', 'POST');

        const agent = new https.Agent({
            rejectUnauthorized: options.rejectUnauthorized,
            key: options.key,
            cert: options.cert
        });

        const res = await fetch(`${options.hostname}${options.path}`, {agent: agent, method: options.method, body: JSON.stringify(body)});
        return res.json();
    }

    async calculateTax(params: {amount: number, taxType: string}): Promise<{taxableAmount: number, taxAmount: number}> {
        const options = getOptions(this.REVENUE_BASE_URL, '/api/taxcalculator/calculate', 'GET');

        const agent = new https.Agent({
            rejectUnauthorized: options.rejectUnauthorized,
            key: options.key,
            cert: options.cert
        });

        const res = await fetch(`${options.hostname}${options.path}?amount=${params.amount}&taxType=${params.taxType}}`, {agent: agent, method: options.method});
        return res.json();
    }

    async creatTaxInvoice(body: {taxId: string, amount: number, taxType: string}): Promise<{paymentId: number, amountDue: number, dueTime: { days: number, hours: number, minutes: number, seconds: number}}> {
        const options = getOptions(this.REVENUE_BASE_URL, '/api/taxpayment/createTaxInvoice', 'POST');

        const agent = new https.Agent({
            rejectUnauthorized: options.rejectUnauthorized,
            key: options.key,
            cert: options.cert
        });

        const res = await fetch(`${options.hostname}${options.path}`, {agent: agent, method: options.method, body: JSON.stringify(body)});
        return res.json();
    }

    async submitPaymentNotice(body: {taxId: string, paymentId: number, callbackUrl: string}): Promise<{result: string}> {
        const options = getOptions(this.REVENUE_BASE_URL, '/api/taxpayment/submitNoticeOfPayment', 'POST');

        const agent = new https.Agent({
            rejectUnauthorized: options.rejectUnauthorized,
            key: options.key,
            cert: options.cert
        });

        const res = await fetch(`${options.hostname}${options.path}`, {agent: agent, method: options.method, body: JSON.stringify(body)});
        return res.json();
    }
}
