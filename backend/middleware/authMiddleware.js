import jwt from "jsonwebtoken";
import User from "../models/User.js";

// verifyToken: checks that a valid JWT was sent, and attaches the
// logged-in user's info to req.user so later code/middleware can use it.
// Usage on a route: router.get("/something", verifyToken, controllerFn)
const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // We expect the header to look like: "Bearer eyJhbGciOi..."
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided, access denied" });
    }

    const token = authHeader.split(" ")[1];

    // Verify the token's signature and expiry using our secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Make sure the user still exists in the DB
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User no longer exists" });
    }

    // Attach useful info to the request object for downstream handlers
    req.user = { id: user._id, role: user.role };

    next(); // move on to the next middleware/controller
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Generic role-checker factory. studentOnly/collegeOnly/companyOnly below
// are just this function pre-filled with one role.
const requireRole = (role) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res
        .status(403)
        .json({ message: `Access denied: ${role} role required` });
    }
    next();
  };
};

const studentOnly = requireRole("student");
const collegeOnly = requireRole("college");
const companyOnly = requireRole("company");

export { verifyToken, studentOnly, collegeOnly, companyOnly };
