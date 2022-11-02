# Coop Booking App

This is simple REST API that enables to book a car.

## Use Cases

- REST API with typescript
- Multi-environment management under Serverless
- Jest unit tests and lambda-tester interface test
- AWS Lambda function log view

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

## Usage

Send an HTTP request directly to the endpoint using a tool like curl

```bash
# booking endpoint
curl --location --request POST http://localhost:3000/dev/booking


# booking endpoint with filters
curl --location --request GET http://localhost:3000/dev/booking?dateFrom=2022-11-20&dateTo=2022-11-24


# vehicles endpoint
curl --location --request GET http://localhost:3000/dev/vehicles


# vehicles endpoint with filters
curl --location --request GET http://localhost:3000/dev/vehicles?excluded=ff-2000-01,cs-2014-01,fb-2018-01

```

## Scaling

By default, AWS Lambda limits the total concurrent executions across all functions within a given region to 100. The default limit is a safety limit that protects you from costs due to potential runaway or recursive functions during initial development and testing. To increase this limit above the default, follow the steps in [To request a limit increase for concurrent executions](http://docs.aws.amazon.com/lambda/latest/dg/concurrent-executions.html#increase-concurrent-executions-limit).
