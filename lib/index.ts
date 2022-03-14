import type { aws_apigateway, aws_dynamodb, aws_lambda } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { URL } from 'url';

import { Table } from './constructs/table';
import { ApiGateway } from './constructs/apiGateway';
import { RateLimitedApiKey } from './constructs/rateLimitedApiKey';
import { CreateSecretFunction } from './constructs/lambda/createSecretFunction';
import { GetSecretFunction } from './constructs/lambda/getSecretFunction';

export type OtsProps = {
  tableProps?: Partial<aws_dynamodb.TableProps>;
  restApiProps?: Partial<aws_apigateway.RestApiProps>;
  rateLimitedApiKeyProps?: Partial<aws_apigateway.RateLimitedApiKeyProps>;
  functionProps?: Partial<aws_lambda.FunctionProps>;
  webViewUrl: string;
};

export class Ots extends Construct {
  readonly table: Table;
  readonly apiGateway: ApiGateway;
  readonly rateLimitedApiKey: RateLimitedApiKey;
  readonly createSecretFunction: CreateSecretFunction;
  readonly getSecretFunction: GetSecretFunction;

  constructor(scope: Construct, id: string, props: OtsProps) {
    super(scope, id);

    const { tableProps, restApiProps, rateLimitedApiKeyProps, functionProps, webViewUrl } = props;

    // Create a table for persisting secrets
    this.table = new Table(this, 'Table', { tableProps });

    // Create a REST API
    this.apiGateway = new ApiGateway(this, 'ApiGateway', { restApiProps });

    // Add rate-limiting
    this.rateLimitedApiKey = new RateLimitedApiKey(this, 'RateLimitedApiKey', {
      api: this.apiGateway,
      rateLimitedApiKeyProps
    });

    // Create Lambda functions to handle business logic
    this.createSecretFunction = new CreateSecretFunction(this, 'CreateSecretFunction', {
      apiGateway: this.apiGateway,
      table: this.table,
      webViewUrl: new URL(webViewUrl),
      functionProps
    });

    this.getSecretFunction = new GetSecretFunction(this, 'GetSecretFunction', {
      apiGateway: this.apiGateway,
      table: this.table,
      webViewUrl: new URL(webViewUrl),
      functionProps
    });
  }
}
