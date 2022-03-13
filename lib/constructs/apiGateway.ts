import { aws_apigateway, type aws_lambda } from 'aws-cdk-lib';
import type { Construct } from 'constructs';

const defaultProps = {
  // Enable tracing and metrics
  deployOptions: {
    metricsEnabled: true,
    tracingEnabled: true
  },
  // All methods will require api key authentication
  defaultMethodOptions: {
    apiKeyRequired: true
  }
};

type AddLambdaIntegrationOptions = {
  path: string;
  method: string;
  schema?: any;
  methodOptions?: Partial<aws_apigateway.MethodOptions>;
};

type ApiGatewayProps = {
  restApiProps?: Partial<aws_apigateway.RestApiProps>;
};

export class ApiGateway extends aws_apigateway.RestApi {
  readonly requestValidator: aws_apigateway.RequestValidator;

  constructor(scope: Construct, id: string, props?: ApiGatewayProps) {
    super(scope, id, {
      ...defaultProps,
      ...props?.restApiProps
    });

    // Add a request validator
    this.requestValidator = this.addRequestValidator('RequestValidator', {
      validateRequestBody: true,
      validateRequestParameters: true
    });
  }

  addLambdaIntegration = (
    lambda: aws_lambda.Function,
    { path, method, schema, methodOptions }: AddLambdaIntegrationOptions
  ): aws_apigateway.Method => {
    // Create the Lambda <> API GW integration
    const lambdaIntegration = new aws_apigateway.LambdaIntegration(lambda);

    // Configure default options
    const defaultMethodOptions: aws_apigateway.MethodOptions = {
      requestValidator: this.requestValidator
    };

    // Add request model configuration to method options if schema is provided
    if (schema) {
      const model = new aws_apigateway.Model(this, 'RequestModel' + lambda.node.id, {
        restApi: this,
        contentType: 'application/json',
        schema
      });

      Object.assign(defaultMethodOptions, {
        requestModels: {
          'application/json': model
        }
      });
    }

    // Get or create the resource up to the path
    const resource = this.root.resourceForPath(path);

    // Link the method with the lambda integration and the merged method options
    return resource.addMethod(method, lambdaIntegration, {
      ...defaultMethodOptions,
      ...methodOptions
    });
  };
}
