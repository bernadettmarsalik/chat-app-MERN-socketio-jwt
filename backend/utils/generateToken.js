import jwt from "jsonwebtoken";

// Create token
const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  // Save token as cookie
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, //in milliseconds
    httpOnly: true, //prevent xss (cross-site-scripting) attacks,
    sameSite: "strict", //prevent csrf (cross-site-request-forgery) attacks
    secure: process.env.NODE_ENV !== "development", //only work in https
  });
};

export default generateTokenAndSetCookie;
