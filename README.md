# IP Tracing App

This is simple REST API that runs an IP lookup returning distances between the origin IP address and the United States default coordinates.
It also retrieves a information about the currencies of both countries and some statistics.

## Use Cases

- REST API with typescript
- MongoDB Atlas data storage
- Multi-environment management under Serverless
- Jest unit tests and lambda-tester interface test
- AWS Lambda function log view

## Invoke the function locally

```bash
serverless invoke local --function traces
```

Which should result in:

```bash
Serverless: Compiling with Typescript...
Serverless: Using local tsconfig.json
Serverless: Typescript compiled.

{
    "statusCode": 200,
    "body": {
    "ip": "42.18.170.107",
    "name": "South Korea",
    "code": "KR",
    "lat": 37.566,
    "lon": 126.993,
    "currencies": [
        {
            "iso": "ARS",
            "symbol": "$",
            "conversion_rate": 143.168492
        },
        {
            "iso": "USD",
            "symbol": "$",
            "conversion_rate": 1
        }
    ],
    "distance_to_usa": 3981.11
  }
}
```

## Deploy

### To Test It Locally

- Run `npm install` to install all the necessary dependencies.
- Run `npm run local` use serverless offline to test locally.

### To Execute the Unit Tests

- Run `npm test` to execute the unit tests.

### Deploy on AWS, simply run:

```
$ npm run deploy

# or

$ serverless deploy
```

The expected result should be similar to:

```
Serverless: Compiling with Typescript...
Serverless: Using local tsconfig.json
Serverless: Typescript compiled.
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service cu-takehome.zip file to S3 (1.86 MB)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
......................................
Serverless: Stack update finished...
Service Information
service: cu-takehome
stage: dev
region: us-east-1
stack: cu-takehome-dev
resources: 32
api keys:
  None
endpoints:
  POST - https://xxxxxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/traces
  GET - https://xxxxxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/statistics
functions:
  traces: cu-takehome-dev-traces
  statistics: cu-takehome-dev-statistics
layers:
  None
Serverless: Removing old service artifacts from S3...
Serverless: Run the "serverless" command to setup monitoring, troubleshooting and testing.
```

## Usage

send an HTTP request directly to the endpoint using a tool like curl

```
curl https://xxxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/traces
```

## Scaling

By default, AWS Lambda limits the total concurrent executions across all functions within a given region to 100. The default limit is a safety limit that protects you from costs due to potential runaway or recursive functions during initial development and testing. To increase this limit above the default, follow the steps in [To request a limit increase for concurrent executions](http://docs.aws.amazon.com/lambda/latest/dg/concurrent-executions.html#increase-concurrent-executions-limit).
