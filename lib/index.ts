import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export interface OtsProps {
  // Define construct properties here
}

export class Ots extends Construct {

  constructor(scope: Construct, id: string, props: OtsProps = {}) {
    super(scope, id);

    // Define construct contents here

    // example resource
    // const queue = new sqs.Queue(this, 'OtsQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
