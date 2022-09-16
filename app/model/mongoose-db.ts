import mongoose from "mongoose";
const DB_URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOSTNAME}/?retryWrites=true&w=majority`;
console.log(`Connecting to MongoDB URI: ${DB_URL}`);
export default mongoose.connect(DB_URL, {
  dbName: process.env.DB_NAME,
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
