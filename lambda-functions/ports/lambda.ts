import { SecretNotFoundError } from '../secrets/error';
import type { SecretsImpl } from '../secrets/secrets';
import * as apiGateway from './apiGateway';

export class Lambda {
  readonly secrets: SecretsImpl;

  constructor(secrets: SecretsImpl) {
    this.secrets = secrets;
  }

  createSecretHandler = apiGateway.middify<{ encryptedBytes: string; expiresIn: number }>(
    async ({ body }) => {
      try {
        const { id, expiresAt, viewUrl } = await this.secrets.create(body);

        const jsonResponse = { id, expiresAt };
        const headers = { 'X-View-Url': viewUrl.toString() };

        return apiGateway.formatJSONResponse(jsonResponse, 201, headers);
      } catch (error) {
        console.error(error);
        return apiGateway.formatJSONResponse({ message: 'Internal failure' }, 500);
      }
    }
  );

  getSecretHandler = apiGateway.middify<unknown, { id: string }>(async ({ pathParameters }) => {
    try {
      const { encryptedBytes } = await this.secrets.burn(pathParameters);

      const jsonResponse = { encryptedBytes };

      return apiGateway.formatJSONResponse(jsonResponse, 200);
    } catch (error) {
      console.error(error);

      if (error instanceof SecretNotFoundError) {
        return apiGateway.formatJSONResponse({ message: error.message }, 404);
      }

      return apiGateway.formatJSONResponse({ message: 'Internal failure' }, 500);
    }
  });
}
