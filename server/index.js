import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.listen(process.env.PORT, () => {
  mongoose
    .connect(process.env.MONGODB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DB connection succesfull");
    })
    .catch((err) => {
      console.log({ message: err });
    });
});
