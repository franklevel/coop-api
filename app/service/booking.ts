import { CreateBookingDTO } from "../model/dto/bookingDTO";
import { getTimestampFromString, isCollide } from "../utils/dates";

export interface IBooking {
  id?: string;
  userId: string;
  vehicleId: string;
  dateFrom: string;
  dateTo: string;
}

export interface GetAllFilters {
  dateFrom: string;
  dateTo: string;
}

export class BookingService {
  private bookings: IBooking[] = [];
  constructor(bookings: IBooking[]) {
    this.bookings = bookings;
  }

  /**
   * Create Booking
   * @param payload
   */
  protected async store(payload: CreateBookingDTO): Promise<object> {
    try {
      this.bookings.push(payload);

      return { payload };
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  /**
   * Find booking
   */
  protected async getAll(filters?: GetAllFilters): Promise<object> {
    if (filters) {
      const { dateFrom, dateTo } = filters;
      if (dateFrom && dateTo) {
        return this.bookings.filter((booked) => {
          const bookedDateFromTimestamp = getTimestampFromString(
            booked.dateFrom
          );
          const bookedDateToTimestamp = getTimestampFromString(booked.dateTo);
          const dateFromTimestamp = getTimestampFromString(dateFrom);
          const dateToTimestamp = getTimestampFromString(dateTo);

          const currentRange = {
            from: dateFromTimestamp,
            to: dateToTimestamp,
          };

          const targetRange = {
            from: bookedDateFromTimestamp,
            to: bookedDateToTimestamp,
          };

          return isCollide(currentRange, targetRange)
            ? { vehicleId: booked.vehicleId }
            : undefined;
        });
      }
    }
    return this.bookings;
  }
}
