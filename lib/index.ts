import {
  Stack,
  aws_apigateway,
  aws_lambda,
  aws_dynamodb,
  aws_logs,
} from "aws-cdk-lib";
import { Construct } from "constructs";
import { resolve } from "path";

export class Ots extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const table = new aws_dynamodb.Table(this, "Table", {
      partitionKey: {
        name: "id",
        type: aws_dynamodb.AttributeType.STRING,
      },
      timeToLiveAttribute: "expiresAt",
      billingMode: aws_dynamodb.BillingMode.PAY_PER_REQUEST,
      encryption: aws_dynamodb.TableEncryption.AWS_MANAGED,
    });

    const handler = new aws_lambda.Function(this, "Handler", {
      runtime: aws_lambda.Runtime.NODEJS_16_X,
      architecture: aws_lambda.Architecture.ARM_64,
      memorySize: 512,
      reservedConcurrentExecutions: 3,
      logRetention: aws_logs.RetentionDays.THREE_DAYS,
      code: aws_lambda.Code.fromAsset(`${resolve(__dirname)}/assets/lambda.js`),
      handler: "index.handler",
      environment: {
        REGION: Stack.of(this).region,
        TABLE_NAME: table.tableName,
      },
    });

    table.grantReadWriteData(handler);

    const api = new aws_apigateway.LambdaRestApi(this, "Api", {
      handler,
      proxy: false,
      deployOptions: {
        methodOptions: {
          "/*/*": {
            throttlingRateLimit: 3,
            throttlingBurstLimit: 3,
          },
        },
      },
    });

    const plan = api.addUsagePlan("UsagePlan", { name: "Public" });

    const key = new aws_apigateway.RateLimitedApiKey(this, "ApiKey", {
      // For now the below seems like a reasonable default.
      quota: {
        limit: 500,
        period: aws_apigateway.Period.DAY,
      },
    });

    plan.addApiKey(key);
    plan.addApiStage({ stage: api.deploymentStage });

    const items = api.root.addResource("secrets");
    items.addMethod("POST", undefined, { apiKeyRequired: true }); // POST /secrets
    const item = items.addResource("{id}");
    item.addMethod("DELETE", undefined, { apiKeyRequired: true }); // DELETE /secrets/{id}
  }
}
