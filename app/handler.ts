import { Handler, Context } from "aws-lambda";
import dotenv from "dotenv";
import path from "path";
const dotenvPath = path.join(
  __dirname,
  "../",
  `config/.env.${process.env.NODE_ENV}`
);
dotenv.config({
  path: dotenvPath,
});

import { Bookings, Vehicles } from "./model";
import { BookingService } from "./service/booking";
import { BookingController } from "./controller/booking";
import { VehiclesController } from "./controller/vehicles";

const bookingController = new BookingController(Bookings);

const vehiclesController = new VehiclesController(
  Vehicles,
  new BookingService(Bookings)
);

export const booking: Handler = (event: any, context: Context) => {
  console.log(context.functionName);
  switch (event.httpMethod) {
    case "POST":
      return bookingController.create(event, context);
    case "GET":
      return bookingController.list(event, context);
    default:
      break;
  }
};

export const vehicle: Handler = (event: any, context: Context) => {
  return vehiclesController.available(event, context);
};
