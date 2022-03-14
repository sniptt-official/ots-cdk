import middy from '@middy/core';
import httpHeaderNormalizer from '@middy/http-header-normalizer';
import jsonBodyParser from '@middy/http-json-body-parser';
import type * as lambda from 'aws-lambda';

type OverrideEventProps = 'body' | 'pathParameters' | 'queryStringParameters' | 'headers';

type APIGatewayProxyEvent<
  Body,
  PathParams,
  QueryStringParams,
  Headers extends Record<string, unknown> = Record<string, unknown>
> = Omit<lambda.APIGatewayProxyEvent, OverrideEventProps> & {
  rawBody: string;
  body: Body;
  pathParameters: PathParams;
  queryStringParameters: QueryStringParams;
  headers: Headers;
};

type APIGatewayProxyEventHandler<
  Body,
  PathParams,
  QueryStringParams,
  Headers extends Record<string, unknown> = Record<string, unknown>
> = lambda.Handler<
  APIGatewayProxyEvent<Body, PathParams, QueryStringParams, Headers>,
  lambda.APIGatewayProxyResult
>;

export const formatJSONResponse = (
  jsonResponse: Record<string, unknown>,
  statusCode = 200,
  headers = {}
) => ({
  statusCode,
  body: JSON.stringify(jsonResponse),
  headers
});

export const middify = <
  Body = unknown,
  PathParams = unknown,
  QueryStringParams = unknown,
  Headers extends Record<string, unknown> = Record<string, unknown>
>(
  handler: APIGatewayProxyEventHandler<Body, PathParams, QueryStringParams, Headers>
) => middy(handler).use(httpHeaderNormalizer()).use(jsonBodyParser());
