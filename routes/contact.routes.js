const express = require("express");
const router = express.Router();
const { sendContact, sendAutoReply } = require("../services/contact");

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "All fields required",
      });
    }

    // Respond immediately
    res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });

    // Trigger emails in background
    sendContact({ name, email, message }).catch((err) =>
      console.error("❌ Admin mail error:", err)
    );

    sendAutoReply({ name, email }).catch((err) =>
      console.error("❌ Auto-reply error:", err)
    );
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = router;
