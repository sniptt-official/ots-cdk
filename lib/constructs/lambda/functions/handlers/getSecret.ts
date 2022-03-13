import { DynamoDB } from 'aws-sdk'
import { get } from 'env-var';

import { DdbRepo } from '../adapters/ddbRepo';
import { Secrets } from '../secrets/secrets';
import { Lambda } from '../ports/lambda';

const region = get('AWS_REGION').required().asString();
const tableName = get('TABLE_NAME').required().asString();

const ddbDocumentClient = new DynamoDB.DocumentClient({ region })
const ddbRepo = new DdbRepo(ddbDocumentClient, { tableName });
const secrets = new Secrets(ddbRepo);

export const { getSecretHandler: handler } = new Lambda(secrets);
