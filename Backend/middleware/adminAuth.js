import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
  try {
    // Get token from Authorization header (Bearer token)
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    
    if (!token) {
      return res.json({ success: false, message: "Not authorized! Login again" });
    }

    // Verify token
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    // Check if the decoded token matches admin credentials (e.g., email)
    if (tokenDecode.email !== process.env.ADMIN_EMAIL) {
      return res.json({ success: false, message: "Admin not authorized" });
    }

    next();  // Proceed to the next middleware or route handler
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default adminAuth; 