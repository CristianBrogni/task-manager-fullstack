import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db";
import taskRoutes from "./routes/taskRoutes";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
