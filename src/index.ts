/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from "express";
import mongoose from "mongoose";
const app = express();
const cors = require("cors");
const env = require("dotenv");
const countryRouter = require("./controllers/countryRouter");
const authRouter = require("./controllers/authRouter");

app.use(express.json());
env.config();
app.use(cors());
app.use("/countries", countryRouter);
app.use("/auth", authRouter);

const PORT = process.env.PORT;

mongoose.connect(process.env.CONNECT_MONGODB as string)
  .then(() => console.log("DB connection has been established successfully."))
  .catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});