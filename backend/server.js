import express from "express";
import dotenv from "dotenv";
import config from "./db/config.js";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js"
import blogRoutes from './routes/blog.routes.js'

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json())

const port = process.env.PORT || 5000;
app.use("/auth", authRoutes) 
app.use("/api/blogs", blogRoutes) 

app.listen(port, () => {
  config();
  console.log(`Server is running on port: ${port}`);
});