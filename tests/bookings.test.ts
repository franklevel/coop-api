import { booking } from "./../app/handler";
import { APIGatewayProxyEvent, Context } from "aws-lambda";
import { mock } from "jest-mock-extended";

jest.setTimeout(10000);
jest.mock("aws-sdk");
describe("#booking", () => {
  it("should create a new booking", async () => {
    const expected = {
      userId: "FAKEUSERID",
      vehicleId: "ff-2000-01",
      dateTo: "2022-11-20",
      dateFrom: "2022-11-30",
    };
    const event = mock<APIGatewayProxyEvent>();
    event.httpMethod = "POST";
    event.body = JSON.stringify({
      vehicleId: "ff-2000-01",
      dateTo: "2022-11-20",
      dateFrom: "2022-11-30",
    });

    const context = {
      functionName: "booking",
    } as Context;
    const result = await booking(event, context, null);

    expect(JSON.parse(result.body)).toMatchObject(expected);
  });

  it("should return a list of booking", async () => {
    const expected = {
      bookings: [
        {
          userId: "FAKEUSERID",
          vehicleId: "ff-2000-01",
          dateTo: "2022-11-20",
          dateFrom: "2022-11-30",
        },
      ],
    };
    const event = mock<APIGatewayProxyEvent>();
    event.httpMethod = "GET";

    const context = {
      functionName: "booking",
    } as Context;
    const result = await booking(event, context, null);

    expect(JSON.parse(result.body)).toMatchObject(expected);
  });

  /*  it("should fail on provide a wrong body", async () => {
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
  }); */
});
