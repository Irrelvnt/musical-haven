import { connect } from "mongoose";

const connectDb = async (req, res, next) => {
  await connect(process.env.MONGODB_URL);
  return await next();
};

export default connectDb;
