import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import tattooRoutes from "./routes/tattoos.js";
import piercingRoutes from "./routes/piercings.js";
import imageRoutes from "./routes/images.js"

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/tattoos", tattooRoutes);
app.use("/api/piercings", piercingRoutes);
app.use("/api/images", imageRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Backend fut a http://localhost:${PORT}`));
