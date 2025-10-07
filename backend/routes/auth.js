// backend/routes/auth.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { users } from "../models/userModel.js"; // ez a users tömb

const router = express.Router();

// POST /api/auth/login
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Ellenőrzés, hogy van ilyen felhasználó
  const user = users.find(u => u.username === username);
  if (!user) return res.status(401).json({ message: "Hibás felhasználónév vagy jelszó" });

  // Jelszó ellenőrzés
  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Hibás felhasználónév vagy jelszó" });

  // JWT token generálása
  const token = jwt.sign(
    { username: user.username, isAdmin: user.isAdmin },
    process.env.JWT_SECRET || "titkoskulcs",
    { expiresIn: "1d" }
  );

  res.json({ token });
});

export default router;
