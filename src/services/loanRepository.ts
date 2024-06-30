import { GetSecretValueCommand, SecretsManagerClient } from "@aws-sdk/client-secrets-manager";
import { Client } from 'pg';

interface DbConfig {
    user: string,
    password: string,
    database: string,
    host: string,
    port: number,
    ssl: {
        rejectUnauthorized: boolean
    }
}

const AWS_CONFIG = {
    region: 'eu-west-1',
};

const DB_NAME = 'stloansdb'
const DB_CRED_SECRET_ID = 'short-term-lender-rds-credentials';

async function queryDatabase(dbConfig: DbConfig) {
    const client = new Client(dbConfig);

    try {
        await client.connect();
        const result = await client.query('SELECT * FROM testtbl');
        console.log('Query Result:', result.rows);

    } catch (err) {
        console.error('Error executing query:', err);

    } finally {
        await client.end();
    }
}

const initDbService = async () => {
    try {
        const smClient = new SecretsManagerClient(AWS_CONFIG);
        const { username, password, host, port } = JSON.parse(await getSecretValue(smClient, DB_CRED_SECRET_ID) || '');

        const dbConfig: DbConfig = {
            user: username,
            password: password,
            database: DB_NAME,
            host: host,
            port: port,
            ssl: {
                rejectUnauthorized: false
            }
        };

        await queryDatabase(dbConfig);
    } catch (error) {
        console.error(`Failed to init DB service. ${error}.`);
    }
}

const getSecretValue = async (smClient: SecretsManagerClient, secretId: string) => {
    const input = {
        SecretId: secretId,
    };
    const command = new GetSecretValueCommand(input);
    const response = await smClient.send(command);
    return response.SecretString;
}

initDbService().then();