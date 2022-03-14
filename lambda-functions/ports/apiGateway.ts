import middy from '@middy/core';
import httpHeaderNormalizer from '@middy/http-header-normalizer';
import jsonBodyParser from '@middy/http-json-body-parser';
import type * as lambda from 'aws-lambda';

type OverrideEventProps = 'body' | 'pathParameters' | 'queryStringParameters' | 'headers';

type APIGatewayProxyEvent<
  Body extends unknown,
  PathParams extends unknown,
  QueryStringParams extends unknown,
  Headers extends Record<string, unknown> = Record<string, unknown>
> = Omit<lambda.APIGatewayProxyEvent, OverrideEventProps> & {
  rawBody: string;
  body: Body;
  pathParameters: PathParams;
  queryStringParameters: QueryStringParams;
  headers: Headers;
};

type APIGatewayProxyEventHandler<
  Body extends unknown,
  PathParams extends unknown,
  QueryStringParams extends unknown,
  Headers extends Record<string, unknown> = Record<string, unknown>
> = lambda.Handler<
  APIGatewayProxyEvent<Body, PathParams, QueryStringParams, Headers>,
  lambda.APIGatewayProxyResult
>;

export const formatJSONResponse = (
  response: Record<string, unknown>,
  statusCode = 200,
  headers = {}
) => ({
  statusCode,
  body: JSON.stringify(response),
  headers
});

export const middify = <
  Body extends unknown = unknown,
  PathParams extends unknown = unknown,
  QueryStringParams extends unknown = unknown,
  Headers extends Record<string, unknown> = Record<string, unknown>
>(
  handler: APIGatewayProxyEventHandler<Body, PathParams, QueryStringParams, Headers>
) => middy(handler).use(httpHeaderNormalizer()).use(jsonBodyParser());
