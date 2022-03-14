import { DynamoDB } from 'aws-sdk';
import { get } from 'env-var';

import { DdbRepo } from '../adapters/ddbRepo';
import { Secrets } from '../secrets/secrets';
import { Lambda } from '../ports/lambda';

const region = get('AWS_REGION').required().asString();
const tableName = get('TABLE_NAME').required().asString();
const webViewUrl = get('WEB_VIEW_URL').required().asUrlObject();

const ddbDocumentClient = new DynamoDB.DocumentClient({ region });
const ddbRepo = new DdbRepo(ddbDocumentClient, { tableName });
const secrets = new Secrets(ddbRepo, { region, webViewUrl });

export const { createSecretHandler: handler } = new Lambda(secrets);
