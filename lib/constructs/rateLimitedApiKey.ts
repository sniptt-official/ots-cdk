import { aws_apigateway } from 'aws-cdk-lib';
import type { Construct } from 'constructs';

const defaultProps = {
  // Use reasonable defaults
  throttle: {
    rateLimit: 5,
    burstLimit: 2
  },
  quota: {
    limit: 1_000,
    period: aws_apigateway.Period.DAY
  }
};

type RateLimitedApiKeyProps = {
  api: aws_apigateway.RestApi;
  rateLimitedApiKeyProps?: Partial<aws_apigateway.RateLimitedApiKeyProps>;
};

export class RateLimitedApiKey extends aws_apigateway.RateLimitedApiKey {
  constructor(
    scope: Construct,
    id: string,
    { api, rateLimitedApiKeyProps }: RateLimitedApiKeyProps
  ) {
    super(scope, id, {
      ...defaultProps,
      ...rateLimitedApiKeyProps,
      apiStages: [{ api, stage: api.deploymentStage }]
    });
  }
}
