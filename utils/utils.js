import jwt from "jsonwebtoken";

export const generateOTP = () => {
  // Generate a random 6-digit number
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
};

export const generateJwt = (payload, expiresIn = undefined) => {
  console.log(payload);
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};
