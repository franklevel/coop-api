import { MongoMemoryServer } from "mongodb-memory-server";
import Mongoose from "mongoose";

export const connect = async () => {
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  console.log("URI: ", uri);
  const mongooseOpts = {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  };

  await Mongoose.createConnection(uri, mongooseOpts);
};

export const find = {
  sort: () => {
    return {
      longest_distance: {
        country: "Venezuela",
        value: 12839.1,
      },
      most_traced: {
        country: "Russia",
        value: 4,
      },
    };
  },
};

export const findError = new Error("test find error");

export const trace = {
  ip: "179.60.147.0",
  name: "Russia",
  code: "RU",
  lat: 55.7483,
  lon: 37.6171,
  currencies: [
    {
      iso: "ARS",
      symbol: "$",
      conversion_rate: 143.168492,
    },
    {
      iso: "USD",
      symbol: "$",
      conversion_rate: 1,
    },
  ],
  distance_to_usa: 8714.3,
};

export const createError = new Error(
  "E11000 duplicate key error collection: lookup.traces index: id_1 dup key: { id: 30247892 }"
);
