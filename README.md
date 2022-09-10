## new

```
> # npm i aws-cdk -D
> npx cdk bootstrap 'aws://123456789012/us-east-1' --profile ots
```

# ots-cdk

## Usage

Initialise a new CDK app if you don't already have one:

```
mkdir dev; cd dev
cdk init app --language typescript
npx cdk bootstrap --profile dev
```

Make sure you're authenticated with the GitHub registry using a PAT:

<https://github.com/settings/tokens/new?scopes=read:packages&description=npmrc>

```
npm config set @sniptt-official:registry https://npm.pkg.github.com
npm config set -- '//npm.pkg.github.com/:_authToken' $GITHUB_TOKEN
```

Install the `ots-aws` construct:

```
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

```
npx cdk deploy DevStack --profile dev
```

Grab your API Gateway URL, API key and configure `~/.ots.yaml` (or whatever you provide to `--config`):

```yaml
apiUrl: https://YOUR_API_ID.execute-api.YOUR_REGION.amazonaws.com/prod/secrets
apiKey: YOUR_API_KEY
```

Use `ots` as before:

```
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

### Build and test

#### The Construct package

```
npm ci
npm run build
npm test
```

#### The Lambda functions package

```
cd lambda-functions
npm ci
npm run build
npm test
```
