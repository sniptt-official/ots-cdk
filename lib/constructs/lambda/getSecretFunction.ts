import { aws_lambda } from 'aws-cdk-lib';
import type { Construct } from 'constructs';

import type { ApiGateway } from '../apiGateway';
import type { Table } from '../table';
import { functionProps } from './base';

type GetSecretFunctionProps = {
  apiGateway: ApiGateway;
  table: Table;
  webViewUrl: string;
  functionProps?: Partial<aws_lambda.FunctionProps>;
};

export class GetSecretFunction extends aws_lambda.Function {
  constructor(scope: Construct, id: string, props: GetSecretFunctionProps) {
    super(scope, id, {
      ...functionProps,
      ...props.functionProps,
      handler: 'getSecret.handler',
      environment: {
        TABLE_NAME: props.table.tableName,
        WEB_VIEW_URL: props.webViewUrl
      }
    });

    // Grant the required DynamoDB permissions to the function
    props.table.grantWriteData(this);

    // Create the API integration for the function
    props.apiGateway.addLambdaIntegration(this, {
      path: '/secrets/{id}',
      method: 'GET',
      methodOptions: {
        requestParameters: {
          'method.request.path.id': true
        }
      }
    });
  }
}
