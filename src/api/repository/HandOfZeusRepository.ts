import * as https from 'https';
import { getOptions } from '../../utils';
import { DateResponse, RateResponse } from '../../types/hand-of-zeus-types';

const fetch = require('node-fetch')

export class HandOfZeusRepository {
    private HAND_OF_ZEUS_BASE_URL = 'api.zeus.projects.bbdgrad.com';

    async getLendingRate(): Promise<RateResponse> {
        const options = getOptions(this.HAND_OF_ZEUS_BASE_URL, '/lending-rate', 'GET');

        const agent = new https.Agent({
            rejectUnauthorized: options.rejectUnauthorized,
            key: options.key,
            cert: options.cert
        });

        const res = await fetch(`${options.hostname}${options.path}`, {agent: agent, method: options.method});
        return res.json();
    }

    async getcurrentDate(time: number): Promise<DateResponse> {
        const options = getOptions(this.HAND_OF_ZEUS_BASE_URL, '/date', 'GET');

        const agent = new https.Agent({
            rejectUnauthorized: options.rejectUnauthorized,
            key: options.key,
            cert: options.cert
        });

        const res = await fetch(`${options.hostname}${options.path}?time=${time}}`, {agent: agent, method: options.method});
        return res.json();
    }
}
