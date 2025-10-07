import jwt from 'jsonwebtoken';

export const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Nincs token megadva' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'titkos_kulcs');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Érvénytelen token' });
  }
};
