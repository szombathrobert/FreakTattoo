// backend/routes/images.js
import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Multer storage beállítás
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const type = req.body.type === "piercing" ? "piercings" : "tattoos";
    const dir = `uploads/${type}`;
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// ====================
// Kép feltöltés (POST)
// ====================
router.post("/upload", verifyAdmin, upload.single("image"), (req, res) => {
  const type = req.body.type === "piercing" ? "piercings" : "tattoos";
  if (!req.file) return res.status(400).json({ message: "Nincs feltöltött kép" });

  const url = `/uploads/${type}/${req.file.filename}`;
  res.json({ message: "Kép feltöltve", url, id: req.file.filename });
});

// ====================
// Képek listázása (GET)
// ====================
router.get("/", (req, res) => {
  const tattoos = fs.existsSync("uploads/tattoos")
    ? fs.readdirSync("uploads/tattoos").map(f => ({
        id: f,
        url: `/uploads/tattoos/${f}`,
        type: "tattoo",
      }))
    : [];

  const piercings = fs.existsSync("uploads/piercings")
    ? fs.readdirSync("uploads/piercings").map(f => ({
        id: f,
        url: `/uploads/piercings/${f}`,
        type: "piercing",
      }))
    : [];

  res.json([...tattoos, ...piercings]);
});

// ====================
// Kép törlése (DELETE)
// ====================
router.delete("/:id", verifyAdmin, (req, res) => {
  const { id } = req.params;
  const { type } = req.query; // tattoo vagy piercing
  if (!type || (type !== "tattoo" && type !== "piercing")) {
    return res.status(400).json({ message: "Hiányzó vagy érvénytelen típus" });
  }

  const folder = type === "tattoo" ? "tattoos" : "piercings";
  const filePath = path.join("uploads", folder, id);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: "A kép nem található" });
  }

  fs.unlinkSync(filePath);
  res.json({ message: "Kép törölve" });
});



export default router;
