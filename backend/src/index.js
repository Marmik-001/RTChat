import express, { response } from "express";
import { configDotenv } from "dotenv";
import authRoute from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import messageRoute from "./routes/message.route.js";
import cors from "cors";
import { io , app , server } from "./lib/socket.js";
configDotenv();
const PORT = process.env.PORT;


app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);

server.listen(PORT, () => {
  console.log("hello world", PORT);
  connectDB();
});
