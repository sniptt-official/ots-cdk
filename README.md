## Usage

Initialise a new CDK app if you don't already have one:

```sh
mkdir dev; cd dev
cdk init app --language typescript
npx cdk bootstrap --profile dev
```

Make sure you're authenticated with the GitHub registry (GitHub PAT with `registry:read` access is enough):

```sh
npm config set @sniptt-official:registry https://npm.pkg.github.com
npm config set -- '//npm.pkg.github.com/:_authToken' $GITHUB_TOKEN
```

Install the `ots-aws` construct:

```sh
npm i @sniptt-official/ots-aws
```

Add the `ots-aws` construct to your stack:

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
npx cdk deploy DevStack --profile dev
```

Grab your new API Gateway URL, API key and configure your local `~/.ots.yaml` config:

```yaml
apiUrl: https://YOUR_API_ID.execute-api.YOUR_REGION.amazonaws.com/prod/secrets
apiKey: YOUR_API_KEY
```

## Contributing

### The Construct package

```
npm ci
npm run build
npm test
```

### The Lambda functions package

```
cd lambda-functions
npm ci
npm run build
npm test
```
