import { Duration, aws_lambda, aws_logs } from 'aws-cdk-lib';
import { join } from 'path';

export const functionProps: Omit<aws_lambda.FunctionProps, 'handler'> = {
  // Function handlers need to be pre-built
  code: aws_lambda.Code.fromAsset(join(__dirname, 'functions/build')),
  // See https://docs.aws.amazon.com/lambda/latest/dg/foundation-arch.html#foundation-arch-adv
  architecture: aws_lambda.Architecture.ARM_64,
  memorySize: 1024,
  // Enable active tracing with X-Ray
  tracing: aws_lambda.Tracing.ACTIVE,
  timeout: Duration.seconds(5),
  // The only truly hard limit available
  reservedConcurrentExecutions: 3,
  logRetention: aws_logs.RetentionDays.ONE_WEEK,
  insightsVersion: aws_lambda.LambdaInsightsVersion.VERSION_1_0_119_0,
  runtime: aws_lambda.Runtime.NODEJS_14_X,
};
