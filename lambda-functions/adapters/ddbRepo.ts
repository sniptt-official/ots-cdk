import { DynamoDB } from 'aws-sdk';

import type { TSecret } from '../secrets/secret';

type DdbRepoOptions = { tableName: string };

export interface DdbRepoImpl {
  createSecret: (secret: TSecret) => Promise<TSecret>;
  deleteSecret: (secretId: string) => Promise<Record<string, unknown> | undefined>;
}

export class DdbRepo implements DdbRepoImpl {
  readonly ddbDocumentClient: DynamoDB.DocumentClient;
  readonly tableName: string;

  constructor(ddbDocumentClient: DynamoDB.DocumentClient, { tableName }: DdbRepoOptions) {
    this.ddbDocumentClient = ddbDocumentClient;
    this.tableName = tableName;
  }

  createSecret = async (secret: TSecret) => {
    await this.ddbDocumentClient
      .put({
        TableName: this.tableName,
        Item: secret,
        ConditionExpression: 'attribute_not_exists(id)'
      })
      .promise();

    return secret;
  };

  deleteSecret = async (secretId: string) => {
    const { Attributes: item } = await this.ddbDocumentClient
      .delete({
        TableName: this.tableName,
        Key: { id: secretId },
        ReturnValues: 'ALL_OLD'
      })
      .promise();

    return item;
  };
}
