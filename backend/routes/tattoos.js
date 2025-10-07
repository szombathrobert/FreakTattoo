import express from "express";
import multer from "multer";
import fs from "fs";
import sharp from "sharp";
import path from "path";
import { verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Upload mappa
const uploadDir = "uploads/tattoos";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Engedélyezett kiterjesztések
const allowedTypes = [".jpg", ".jpeg", ".png", ".webp", ".jfif", ".bmp", ".gif"];

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, Date.now() + ext);
  },
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowedTypes.includes(ext)) {
      return cb(new Error("Nem támogatott fájlformátum"));
    }
    cb(null, true);
  },
});

// Feltöltés
router.post("/upload", verifyAdmin, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "Nincs feltöltött kép" });

    const originalPath = req.file.path;
    const webpPath = originalPath.replace(/\.\w+$/, ".webp");

    await sharp(originalPath)
      .resize({ width: 400, height: 300, fit: "cover" })
      .toFormat("webp")
      .toFile(webpPath);

    fs.unlinkSync(originalPath); // Eredeti fájl törlése

    res.json({
      message: "Tetoválás kép sikeresen feltöltve és átméretezve",
      filePath: `/uploads/tattoos/${path.basename(webpPath)}`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Hiba történt a kép feldolgozása közben" });
  }
});

// Képek listázása
router.get("/", (req, res) => {
  fs.readdir(uploadDir, (err, files) => {
    if (err) return res.status(500).json({ message: "Nem sikerült listázni a képeket" });
    const images = files.map(f => `/uploads/tattoos/${f}`);
    res.json(images);
  });
});

export default router;
