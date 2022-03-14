## Usage

Initialise a new CDK app if you don't already have one:

```
mkdir dev; cd dev
cdk init app --language typescript
npx cdk bootstrap --profile dev
```

Install the `ots-aws` construct:

```
echo '@sniptt-official:registry=https://npm.pkg.github.com' >> .npmrc
npm i @sniptt-official/ots-aws
```

Add the `ots-aws` construct to your stack:

```
# ...
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
