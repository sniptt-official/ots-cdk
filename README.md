## Usage

Initialise a new CDK app if you don't already have one:

```
mkdir dev; cd dev
cdk init app --language typescript
npx cdk bootstrap --profile dev
```

Make sure you're authenticated with the GitHub registry (GitHub PAT with `registry:read` access is enough):

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

    const ots = new Ots(this, 'Ots');
  }
}
```

Deploy:

```
npx cdk deploy Dev --profile dev
```

Grab your API Gateway URL, API key and test:

```
curl ...
```

## Contributing

### Build

```
npm ci
npm run build
```

### Test

#### The Construct package

```
npm test
```

#### The Lambda functions package

```
cd lambda-functions
npm test
```
