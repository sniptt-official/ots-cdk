# ots-aws

The official CDK construct for self-hosted `ots`.

## Usage

Create a new CDK app if you don't already have one:

```sh
> mkdir dev; cd dev
dev> npx cdk init app --language typescript
dev> npx cdk bootstrap 'aws://123456789012/us-east-1' --profile dev
```

Make sure you're authenticated with the GitHub registry using a PAT:

<https://github.com/settings/tokens/new?scopes=read:packages&description=npmrc>

```sh
> npm config set @sniptt-official:registry https://npm.pkg.github.com
> npm config set -- '//npm.pkg.github.com/:_authToken' $GITHUB_TOKEN
```

Install the `ots-aws` construct:

```sh
dev> npm i @sniptt-official/ots-aws
```

Add to your stack:

```ts
import { Ots } from '@sniptt-official/ots-aws';
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class DevStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // When you run `ots new` the resulting "View URL" will be composed
    // using this value. For example:
    //
    // https://my-ots-web-view.com/burn-secret?id=xxx#xxx
    //
    // Make sure this web view implements client-side decryption of the secret.
    const webViewUrl = 'https://my-ots-web-view.com/burn-secret';
    const ots = new Ots(this, 'Ots', { webViewUrl });
  }
}
```

Deploy:

```sh
> npx cdk deploy DevStack --profile dev
```

Grab the resulting API Gateway URL and API key and configure your ots cli via `~/.ots.yaml`:

```yaml
apiUrl: https://YOUR_API_ID.execute-api.YOUR_REGION.amazonaws.com/prod/secrets
apiKey: YOUR_API_KEY
```

Use `ots` as before:

```sh
> ots new -x 2h
Using config file: /Users/xxx/.ots.yaml
Enter your secret: ***
Your secret is now available on the below URL.

https://my-ots-web-view.com/burn-secret?id=xxx&ref=ots-cli&region=us-east-1&v=debug#xxx

You should only share this URL with the intended recipient.

Please note that once retrieved, the secret will no longer
be available for viewing. If not viewed, the secret will
automatically expire at approximately xx xxx xxxx xx:xx:xx.
```

## Contributing

### Build

```sh
> npm ci
> npm run build
```
