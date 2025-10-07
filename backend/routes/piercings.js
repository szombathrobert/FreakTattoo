// backend/routes/piercings.js
import express from "express";
import multer from "multer";
import fs from "fs";
import sharp from "sharp";
import { verifyAdmin } from "../middleware/authMiddleware.js";
import path from "path";

const router = express.Router();

// Ellenőrizzük, hogy a mappa létezik-e
const uploadDir = "uploads/piercings";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Multer storage beállítás
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Kép feltöltése és átméretezés
router.post("/upload", verifyAdmin, upload.single("image"), async (req, res) => {
  try {
    const originalPath = req.file.path;
    const webpPath = originalPath.replace(/\.\w+$/, ".webp");

    // Sharp átméretezés és WebP
    await sharp(originalPath)
      .resize({ width: 400, height: 300, fit: "cover" })
      .toFormat("webp")
      .toFile(webpPath);

    // Eredeti fájl törlése
    fs.unlinkSync(originalPath);

    // Frontendnek visszaadott út
    const fileName = path.basename(webpPath);
    res.json({ message: "Piercing kép feltöltve és átméretezve", filePath: `/uploads/piercings/${fileName}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Hiba történt a kép feldolgozása közben" });
  }
});

// Képek listázása
router.get("/", (req, res) => {
  fs.readdir(uploadDir, (err, files) => {
    if (err) return res.status(500).json({ message: "Nem sikerült listázni a képeket" });
    const images = files.map(f => `/uploads/piercings/${f}`);
    res.json(images);
  });
});

export default router;
