import { Model } from "mongoose";
import { CreateTraceDTO } from "../model/dto/createTraceDTO";

export class TracesService {
  private traces: Model<any>;
  constructor(traces: Model<any>) {
    this.traces = traces;
  }

  /**
   * Create trace
   * @param params
   */
  protected async createTrace(params: CreateTraceDTO): Promise<object> {
    try {
      const result = await this.traces.create({
        country: params.country,
        distance: params.distance,
      });

      return { result };
    } catch (err) {
      console.error(err);

      throw err;
    }
  }

  /**
   * Find traces
   */
  protected async findTraces() {
    const longestDistance = await this.traces
      .find()
      .sort({ distance: -1 })
      .limit(1);

    const mostTraced = await this.traces.aggregate([
      { $unwind: "$country" },
      {
        $group: {
          _id: "$country",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      {
        $project: {
          _id: 0,
          country: "$_id",
          count: 1,
        },
      },
    ]);
    return {
      longest_distance: {
        country: longestDistance[0].country,
        value: parseFloat(longestDistance[0].distance.toFixed(2)),
      },
      most_traced: {
        country: mostTraced[0].country,
        value: parseInt(mostTraced[0].count),
      },
    };
  }
}
