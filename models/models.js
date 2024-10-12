import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: [
        "EB",
        "grocery",
        "health",
        "internet",
        "transport",
        "children",
        "gas",
        "food",
        "entertain",
        "others",
        "decor",
        "clothing",
        "home",
      ],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ["expense", "income"],
      required: true,
    },
    date: {
      type: String,
      required: true,
      match: /^\d{4}-\d{2}-\d{2}$/, // Matches 'YYYY-MM-DD' format
    },
    time: {
      type: String,
      required: true,
      match: /^(?:[01]\d|2[0-3]):?[0-5]\d$/, // Matches 'HH:mm' 24-hour format
    },
    paidTo: {
      type: String,
      required: false,
    },
    weekDay: {
      type: String,
      required: false,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

export const Item = mongoose.model("Item", itemSchema);

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      match: /^\d{10}$/, // Assumes a 10-digit
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /.+\@.+\..+/, // Simple regex for email validation
    },
    otp: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

export const User = mongoose.model("User", userSchema);
