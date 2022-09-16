import { APIGatewayProxyEvent, Context } from "aws-lambda";
import { mock } from "jest-mock-extended";
import { statistics, trace } from "../app/handler";

jest.setTimeout(10000);
jest.mock("aws-sdk");
describe("#traces [POST]", () => {
  it("should create a new trace", async () => {
    const expected = {
      ip: "122.24.237.63",
      name: "Japan",
      code: "JP",
      lat: 35.5953,
      lon: 140.116,
      currencies: [
        {
          iso: expect.any(String),
          symbol: expect.any(String),
          conversion_rate: expect.any(Number),
        },
        {
          iso: expect.any(String),
          symbol: expect.any(String),
          conversion_rate: expect.any(Number),
        },
      ],
      distance_to_usa: expect.any(Number),
    };
    const event = mock<APIGatewayProxyEvent>();
    event.body = JSON.stringify({ ip: "122.24.237.63" });

    const context = {
      functionName: "trace",
    } as Context;
    const result = await trace(event, context, null);

    expect(JSON.parse(result.body)).toMatchObject(expected);
  });

  it("should fail on provide a wrong body", async () => {
    const event = mock<APIGatewayProxyEvent>();
    event.body = JSON.stringify({ wrongIP: "122.24.237.63" });

    const context = {
      functionName: "trace",
    } as Context;
    const result = await trace(event, context, null);

    expect(JSON.parse(result.body)).toMatchObject({
      _code: 400,
      message: "You have to provide a valid IP address.",
    });
  });

  it("should return a succesful response", async () => {
    const expected = {
      longest_distance: {
        country: expect.any(String),
        value: expect.any(Number),
      },
      most_traced: {
        country: expect.any(String),
        value: expect.any(Number),
      },
    };
    const event = mock<APIGatewayProxyEvent>();

    const context = {
      functionName: "statistics",
    } as Context;
    const result = await statistics(event, context, null);

    expect(JSON.parse(result.body)).toMatchObject(expected);
  });
});
