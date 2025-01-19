import express, { response } from "express";
import { configDotenv } from "dotenv";
import authRoute from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import messageRoute from "./routes/message.route.js";
import cors from "cors";
import path from "path";

import { io , app , server } from "./lib/socket.js";
configDotenv();
const PORT = process.env.PORT;
const __dirname = path.resolve();

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
if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*" , (req , res) =>{
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
  })
}
server.listen(PORT, () => {
  console.log("hello world", PORT);
  connectDB();
});
