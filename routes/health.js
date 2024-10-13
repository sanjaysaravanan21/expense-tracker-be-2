import express from "express";

const router = express.Router();

router.get("/health", (req, res) => {
  res.json({ message: "I am Up & Running Fine" });
});

export default router;
