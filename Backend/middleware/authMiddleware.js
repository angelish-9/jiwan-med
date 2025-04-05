import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Forbidden" });

    req.user = decoded;
    next();
  });
};

// **Role-based Access**
export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") return res.status(403).json({ error: "Access Denied" });
  next();
};

export const isDoctor = (req, res, next) => {
  if (req.user.role !== "doctor") return res.status(403).json({ error: "Access Denied" });
  next();
};
