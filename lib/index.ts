import {
  Stack,
  type StackProps,
  type aws_apigateway,
  type aws_dynamodb,
  type aws_lambda_nodejs
} from 'aws-cdk-lib';
import type { Construct } from 'constructs';

import { Table } from './constructs/table';
import { ApiGateway } from './constructs/apiGateway';
import { RateLimitedApiKey } from './constructs/rateLimitedApiKey';
import { CreateSecretFunction } from './constructs/lambda/createSecretFunction';
import { GetSecretFunction } from './constructs/lambda/getSecretFunction';

export type OtsProps = StackProps & {
  tableProps?: Partial<aws_dynamodb.TableProps>;
  restApiProps?: Partial<aws_apigateway.RestApiProps>;
  rateLimitedApiKeyProps?: Partial<aws_apigateway.RateLimitedApiKeyProps>;
  nodejsFunctionProps?: Partial<aws_lambda_nodejs.NodejsFunctionProps>;
};

export class Ots extends Stack {
  constructor(
    scope: Construct,
    id: string,
    { tableProps, restApiProps, rateLimitedApiKeyProps, nodejsFunctionProps, ...props }: OtsProps
  ) {
    super(scope, id, props);

    // Create a table for persisting secrets
    const table = new Table(this, 'Table', { tableProps });

    // Create a rate-limited API
    const apiGateway = new ApiGateway(this, 'ApiGateway', { restApiProps });
    new RateLimitedApiKey(this, 'RateLimitedApiKey', { api: apiGateway, rateLimitedApiKeyProps });

    // Create Lambda functions to handle business logic
    const functionProps = {
      apiGateway,
      table,
      nodejsFunctionProps
    };

    new CreateSecretFunction(this, 'CreateSecretFunction', functionProps);
    new GetSecretFunction(this, 'GetSecretFunction', functionProps);
  }
}
