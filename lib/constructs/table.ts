import { aws_dynamodb } from 'aws-cdk-lib';
import type { Construct } from 'constructs';

const defaultProps = {
  partitionKey: {
    name: 'id',
    type: aws_dynamodb.AttributeType.STRING
  },
  // To enable TTL
  timeToLiveAttribute: 'expiresAt',
  billingMode: aws_dynamodb.BillingMode.PAY_PER_REQUEST,
  encryption: aws_dynamodb.TableEncryption.AWS_MANAGED
};

type TableProps = {
  tableProps?: Partial<aws_dynamodb.TableProps>;
};

export class Table extends aws_dynamodb.Table {
  constructor(scope: Construct, id: string, props?: TableProps) {
    super(scope, id, {
      ...defaultProps,
      ...props?.tableProps
    });
  }
}
