import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sanjaysaravanan00007@gmail.com", // gmail account from which You got app password
    pass: process.env.MAIL_KEY,
  },
});

// sample mail sending details
export const mailOptions = {
  from: "sanjaysaravanan00007@gmail.com",
  to: ["sanjaysaravanan1997@gmail.com"],
  subject: "Email Testing",
  text: "Sending mails for Testing Purpose",
};
