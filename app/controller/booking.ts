import { APIGatewayProxyResult, Context } from "aws-lambda";
import { MessageUtil } from "../utils/message";
import { BookingService, IBooking } from "../service/booking";

export class BookingController extends BookingService {
  constructor(bookingsModel: IBooking[]) {
    super(bookingsModel);
  }

  /**
   * Create trace
   * @param {*} event
   */
  async create(event: any, context?: Context): Promise<APIGatewayProxyResult> {
    console.log("functionName", context?.functionName);
    try {
      const body = JSON.parse(event.body);
      const payload = {
        userId: "FAKEUSERID",
        ...body,
      };
      await this.store(payload);
      return MessageUtil.success(payload);
    } catch (err) {
      console.error(err);
      return MessageUtil.error(err.code, err.message);
    }
  }

  /**
   * Get all bookings
   */
  async list(event: any, context?: Context) {
    console.log("functionName", context?.functionName);
    try {
      const { queryStringParameters } = event;
      const result = { bookings: await this.getAll(queryStringParameters) };

      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }
}
