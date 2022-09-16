import mongoose from "mongoose";

export type TracesDocument = mongoose.Document & {
  country: string;
  distance: number;
  createdAt: Date;
};

const TracesSchema = new mongoose.Schema({
  country: String,
  distance: Number,
  createdAt: { type: Date, default: Date.now },
});

// Note: OverwriteModelError: Cannot overwrite `Traces` model once compiled. error
export const Traces =
  mongoose.models.Traces ||
  mongoose.model<TracesDocument>(
    "Traces",
    TracesSchema,
    process.env.DB_TRACES_COLLECTION
  );
