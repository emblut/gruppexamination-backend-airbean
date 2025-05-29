import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import errorHandler from "./middlewares/errorHandler.js";
import authRouter from "./routes/auth.js";

// CONFIG
dotenv.config();
const app = express();
const PORT = process.env.PORT;
mongoose.connect(process.env.CONNECTION_STRING);
const database = mongoose.connection;

// MIDDLEWARES
app.use(express.json());

// ROUTES
app.use("/api/auth", authRouter);

database.on("error", (error) => {
  console.error(error);
});

database.once("connected", () => {
  console.log("DB connected");
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});

// ERROR HANDLER
app.use(errorHandler);
