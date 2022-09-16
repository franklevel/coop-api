import mongoose from "mongoose";
console.log(process.env.DB_URL);
export default mongoose.connect(process.env.DB_URL, {
  dbName: process.env.DB_NAME,
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
