import type { DdbRepoImpl } from '../adapters/ddbRepo';

import { SecretNotFoundError } from './error';
import { Secret } from './secret';

type CreateSecretInput = { encryptedBytes: string; expiresIn: number };
type CreateSecretResult = { id: string };

type BurnSecretInput = { id: string };
type BurnSecretResult = { encryptedBytes: string };

export interface SecretsImpl {
  create: (input: CreateSecretInput) => Promise<CreateSecretResult>;
  burn: (input: BurnSecretInput) => Promise<BurnSecretResult>;
}

export class Secrets implements SecretsImpl {
  readonly ddbRepo: DdbRepoImpl;

  constructor(ddbRepo: DdbRepoImpl) {
    this.ddbRepo = ddbRepo;
  }

  create = async ({
    encryptedBytes,
    expiresIn
  }: CreateSecretInput): Promise<CreateSecretResult> => {
    const secret = Secret.new({
      encryptedBytes,
      expiresIn
    });

    const { id } = await this.ddbRepo.createSecret(secret);
    return { id };
  };

  burn = async ({ id }: BurnSecretInput): Promise<BurnSecretResult> => {
    const item = await this.ddbRepo.deleteSecret(id);

    if (!item) throw new SecretNotFoundError();

    const { encryptedBytes } = Secret.fromDdbItem(item);
    return { encryptedBytes };
  };
}
