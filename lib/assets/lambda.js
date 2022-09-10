import { DynamoDB } from "aws-sdk";
import { randomUUID } from "crypto";

const region = process.env.REGION;
const tableName = process.env.TABLE_NAME;

const ddbDocClient = new DynamoDB.DocumentClient({ region });

export async function handler(event) {
  console.log("received event", event);

  const { httpMethod: method, body, isBase64Encoded, pathParameters } = event;

  try {
    if (method === "POST") {
      const { encryptedBytes, expiresIn } = parseBody(body, isBase64Encoded);

      if (typeof encryptedBytes !== "string") {
        return {
          statusCode: 400,
          body: "encryptedBytes must be a string",
        };
      }

      if (typeof expiresIn !== "number") {
        return {
          statusCode: 400,
          body: "expiresIn must be a number",
        };
      }

      const secret = await createSecret(encryptedBytes, expiresIn);

      return {
        statusCode: 201,
        // TODO: reply with view url
        // headers: {},
        body: JSON.stringify(secret),
      };
    }

    if (method === "DELETE") {
      const { id } = parsePathParameters(pathParameters);

      const secret = await deleteSecret(id);

      return secret
        ? {
            statusCode: 200,
            body: JSON.stringify(secret),
          }
        : {
            statusCode: 404,
            body: "not found",
          };
    }

    return {
      statusCode: 501,
      body: "not implemented",
    };
  } catch (err) {
    console.error(err);

    return {
      statusCode: 500,
      body: "internal failure",
    };
  }
}

async function createSecret(encryptedBytes, expiresIn) {
  let adjustedExpiresIn = 300; // 5 mins

  if (expiresIn > 300) {
    adjustedExpiresIn = expiresIn;
  }

  if (expiresIn > 604_800) {
    // 7 days
    adjustedExpiresIn = 604_800;
  }

  const createdAt = Math.floor(Date.now() / 1000);
  const expiresAt = createdAt + adjustedExpiresIn;

  const params = {
    TableName: tableName,
    Item: {
      id: randomUUID(),
      createdAt,
      expiresAt,
      encryptedBytes,
    },
  };

  await ddbDocClient.put(params).promise();
  return params.Item;
}

async function deleteSecret(secretId) {
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: { id: secretId },
    ReturnValues: "ALL_OLD",
  };

  const data = await ddbDocClient.delete(params);
  return data.Attributes;
}

function parseBody(body, isBase64Encoded) {
  if (body == null) {
    throw new Error("missing body");
  }

  return JSON.parse(
    isBase64Encoded ? Buffer.from(body, "base64").toString() : body
  );
}

function parsePathParameters(pathParameters) {
  if (pathParameters == null) {
    throw new Error("missing path parameters");
  }

  return { id: pathParameters.id };
}
