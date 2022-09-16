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

import { Traces } from "./model";
import { LookupService } from "./service/lookup";
import { TracesController } from "./controller/traces";
import { CurrencyService } from "./service/currency";

const tracesController = new TracesController(
  Traces,
  new LookupService(),
  new CurrencyService()
);

export const trace: Handler = (event: any, context: Context) => {
  return tracesController.trace(event, context);
};

export const statistics: Handler = () => tracesController.statistics();
