import { BookingService } from "./../service/booking";
import { MessageUtil } from "../utils/message";
import { VehicleService, IVehicle } from "../service/vehicles";
import { Context } from "aws-lambda";

export class VehiclesController extends VehicleService {
  protected bookingService: BookingService;
  constructor(vehiclesModel: IVehicle[], bookingService: BookingService) {
    super(vehiclesModel);
    this.bookingService = bookingService;
  }

  /**
   * Get all available vehicles
   */
  async available(event: any, context?: Context) {
    console.log("functionName", context?.functionName);
    try {
      const { queryStringParameters } = event;
      const result = { vehicles: await this.getAll(queryStringParameters) };

      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }
}
