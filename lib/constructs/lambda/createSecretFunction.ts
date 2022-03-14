import { aws_lambda } from 'aws-cdk-lib';
import type { Construct } from 'constructs';
import { URL } from 'url';

import type { ApiGateway } from '../apiGateway';
import type { Table } from '../table';
import { functionProps } from './base';

type CreateSecretFunctionProps = {
  apiGateway: ApiGateway;
  table: Table;
  webViewUrl: URL;
  functionProps?: Partial<aws_lambda.FunctionProps>;
};

export class CreateSecretFunction extends aws_lambda.Function {
  constructor(scope: Construct, id: string, props: CreateSecretFunctionProps) {
    super(scope, id, {
      ...functionProps,
      ...props.functionProps,
      handler: 'createSecret.handler',
      environment: {
        TABLE_NAME: props.table.tableName,
        WEB_VIEW_URL: props.webViewUrl.toString()
      }
    });

    // Grant the required DynamoDB permissions to the function
    props.table.grantWriteData(this);

    // Create the API integration for the function
    props.apiGateway.addLambdaIntegration(this, {
      path: '/secrets',
      method: 'POST',
      schema: {
        type: 'object',
        properties: {
          encryptedBytes: {
            type: 'string',
            maxLength: 100_000,
            description: 'Binary data encoded using base64, must be less than 100kb'
          },
          expiresIn: {
            type: 'number',
            minimum: 300, // 5 minutes
            maximum: 604_800, // 7 days
            pattern: '[0-9]+',
            description:
              'Duration in seconds after which the secret will be deleted, must be between 5 minutes and 7 days'
          }
        },
        required: ['encryptedBytes', 'expiresIn']
      }
    });
  }
}
