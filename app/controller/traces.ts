import { US_COORDS } from "./../constants";
import { LookupDTO } from "./../model/dto/lookupDTO";
import { APIGatewayProxyResult, Context } from "aws-lambda";
import { Model } from "mongoose";
import { MessageUtil } from "../utils/message";
import { TracesService } from "../service/traces";
import { LookupService } from "../service/lookup";
import { distance } from "../utils/distance";
import { ratesToCurrencies } from "../utils/currency";
import { CurrencyService } from "../service/currency";

export class TracesController extends TracesService {
  protected lookupService: LookupService;
  protected currencyService: CurrencyService;
  constructor(
    tracesModel: Model<any>,
    lookup: LookupService,
    currency: CurrencyService
  ) {
    super(tracesModel);
    this.lookupService = lookup;
    this.currencyService = currency;
  }

  /**
   * Create trace
   * @param {*} event
   */
  async trace(event: any, context?: Context): Promise<APIGatewayProxyResult> {
    console.log("functionName", context.functionName);
    try {
      const { ip } = event.body;
      if (!ip) throw new Error("You have to provide a valid IP address");

      const body: LookupDTO = JSON.parse(event.body);

      const {
        data: { country, countryCode, lat, lon, currency },
      } = await this.lookupService.getInfo(body.ip);

      const {
        data: { rates },
      } = await this.currencyService.getRates(currency);

      const fromUSA = distance({ lat, lon }, US_COORDS);
      if (country && fromUSA) {
        await this.createTrace({
          country: country,
          distance: fromUSA,
        });
      }
      const currencies = ratesToCurrencies(rates);
      return MessageUtil.success({
        ip: body.ip,
        name: country,
        code: countryCode,
        lat,
        lon,
        currencies,
        distance_to_usa: fromUSA && parseFloat(fromUSA.toFixed(2)),
      });
    } catch (err) {
      console.error(err);
      return MessageUtil.error(err.code, err.message);
    }
  }

  /**
   * Get traces statistics
   */
  async statistics() {
    try {
      const result = await this.findTraces();

      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }
}
