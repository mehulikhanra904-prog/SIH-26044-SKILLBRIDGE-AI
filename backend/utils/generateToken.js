import jwt from "jsonwebtoken";

// Creates a signed JWT containing the user's id and role.
// This token is what the frontend will store and send back on every
// protected request (usually in an "Authorization: Bearer <token>" header).
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export default generateToken;
