import hyperid from 'hyperid';

export interface TSecret {
  id: string;
  createdAt: number;
  expiresAt: number;
  encryptedBytes: string;
}

type NewProps = { encryptedBytes: string; expiresIn: number };
type FromDdbItemProps = Partial<Secret>;

const generateId = hyperid({ urlSafe: true });

export class Secret implements TSecret {
  readonly id: string;
  readonly createdAt: number;
  readonly expiresAt: number;
  readonly encryptedBytes: string;

  constructor(props: TSecret) {
    this.id = props.id;
    this.createdAt = props.createdAt;
    this.expiresAt = props.expiresAt;
    this.encryptedBytes = props.encryptedBytes;
  }

  static new = ({ encryptedBytes, expiresIn }: NewProps): Secret => {
    const createdAt = Math.floor(Date.now() / 1000);
    const expiresAt = createdAt + expiresIn;

    return new Secret({
      id: generateId(),
      createdAt,
      expiresAt,
      encryptedBytes
    });
  };

  static fromDdbItem = (item: FromDdbItemProps): Secret => {
    // if (typeof item.id !== 'string') throw new Error('missing property: id')
    // if (typeof item.createdAt !== 'number') throw new Error('missing property: createdAt')
    // if (typeof item.expiresAt !== 'number') throw new Error('missing property: expiresAt')
    // if (typeof item.encryptedBytes !== 'string') throw new Error('missing property: encryptedBytes')

    return new Secret({
      id: '',
      createdAt: 0,
      expiresAt: 0,
      encryptedBytes: '',
      ...item
    });
  };
}
