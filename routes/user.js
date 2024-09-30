import express from "express";
import { mailOptions, transporter } from "../utils/mail-utils.js";
import { User } from "../models/models.js";
import { generateJwt, generateOTP } from "../utils/utils.js";

const router = express.Router();

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new user
router.post("/", async (req, res) => {
  const { fullName, phoneNumber, email } = req.body;

  const newUser = new User({
    fullName,
    phoneNumber,
    email,
  });

  try {
    const user = await User.findOne({ phoneNumber });

    if (user) {
      res.status(409).json({ message: "Users exists already" });
    } else {
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT (update) a user by ID
router.put("/:id", async (req, res) => {
  const { fullName, phoneNumber, email } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      fullName,
      phoneNumber,
      email,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a user by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

router.post("/sign-in", async (req, res) => {
  const { phoneNumber } = req.body;
  try {
    // check if a user exists with the number
    const user = await User.findOne({ phoneNumber });

    if (user) {
      const otp = generateOTP();

      await User.findOneAndUpdate(
        { phoneNumber },
        { otp },
        { new: true, runValidators: true }
      );

      await transporter.sendMail({
        ...mailOptions,
        to: [user.email],
        subject: "OTP For Login",
        text: "Your OTP for Login is " + otp,
      });

      res.status(200).json({ message: "OTP Sent Successfully" });
    } else {
      res.status(404).json({ message: "User Not Found" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: error.message });
  }
});

router.post("/verify-otp", async (req, res) => {
  const { phoneNumber, otp } = req.body;
  try {
    // check if a user exists with the number
    const user = (await User.findOne({ phoneNumber })).toObject();

    if (user) {
      if (otp === user.otp) {
        console.log(typeof user);
        const token = generateJwt(user, "100d");
        await User.findOneAndUpdate(
          { phoneNumber },
          { otp: "" },
          { new: true, runValidators: true }
        );

        res.status(200).json({
          message: "User Logged In Successfully",
          userDetails: { ...user, token },
        });
      } else {
        res.status(401).json({ message: "OTP invalid" });
      }
    } else {
      res.status(404).json({ message: "User Not Found" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
});

export default router;
