// backend/users.js

import bcrypt from "bcryptjs";

// Helyi admin felhasználók
export const users = [
  {
    username: "Nemeth.Gergely",
    // jelszó: "jelszo123" (bcrypt hashed)
    password: bcrypt.hashSync("antikviar1234", 10),
    isAdmin: true
  },
  {
    username: "teszt",
    password: bcrypt.hashSync("teszt123", 10),
    isAdmin: false
  }
];
