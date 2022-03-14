import { URL } from 'url';

import type { DdbRepoImpl } from '../adapters/ddbRepo';

import { SecretNotFoundError } from './error';
import { Secret } from './secret';

type CreateSecretInput = { encryptedBytes: string; expiresIn: number };
type CreateSecretResult = { id: string; expiresAt: number; location: URL; viewUrl: URL };

type BurnSecretInput = { id: string };
type BurnSecretResult = { encryptedBytes: string };

type SecretsOptions = { region: string; webViewUrl: URL };

export interface SecretsImpl {
  create: (input: CreateSecretInput) => Promise<CreateSecretResult>;
  burn: (input: BurnSecretInput) => Promise<BurnSecretResult>;
}

export class Secrets implements SecretsImpl {
  readonly ddbRepo: DdbRepoImpl;
  readonly region: string;
  readonly webViewUrl: URL;

  constructor(ddbRepo: DdbRepoImpl, { region, webViewUrl }: SecretsOptions) {
    this.ddbRepo = ddbRepo;
    this.region = region;
    this.webViewUrl = webViewUrl;
  }

  create = async ({
    encryptedBytes,
    expiresIn
  }: CreateSecretInput): Promise<CreateSecretResult> => {
    const secret = Secret.new({
      encryptedBytes,
      expiresIn
    });

    const { id, expiresAt } = await this.ddbRepo.createSecret(secret);

    // TODO: Fix
    const location = new URL('https://test');
    location.pathname = `/secrets/${id}`;

    const viewUrl = new URL(this.webViewUrl.toString());
    viewUrl.searchParams.append('id', id);
    viewUrl.searchParams.append('region', this.region);

    return { id, expiresAt, location, viewUrl };
  };

  burn = async ({ id }: BurnSecretInput): Promise<BurnSecretResult> => {
    const item = await this.ddbRepo.deleteSecret(id);

    if (!item) throw new SecretNotFoundError();

    const { encryptedBytes } = Secret.fromDdbItem(item);
    return { encryptedBytes };
  };
}
