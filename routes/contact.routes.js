const express = require("express");
const router = express.Router();
const { sendContact, sendAutoReply } = require("../services/contact");

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "All fields required",
      });
    }

    // Respond immediately
    res.status(200).json({
      success: true,
      message: "Message received successfully",
    });

    // Send emails asynchronously (background)
    sendContact({ name, email, message })
      .then((info) => console.log("📨 Admin mail sent:", info?.messageId))
      .catch((err) => console.error("Admin mail error:", err));

    sendAutoReply({ name, email })
      .then((info) => console.log("✉ Auto-reply sent:", info?.messageId))
      .catch((err) => console.error("Auto-reply error:", err));
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = router;
