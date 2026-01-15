const express = require("express");
const router = express.Router();
const { sendContact, sendAutoReply } = require("../services/contact");

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ success: false, error: "All fields required" });
    }

    // Respond immediately (do NOT wait for email)
    res.status(200).json({
      success: true,
      message: "Message received successfully",
    });

    // Send emails in background
    sendContact({ name, email, message }).catch((err) =>
      console.error("Admin mail error:", err)
    );

    sendAutoReply({ name, email }).catch((err) =>
      console.error("Auto-reply error:", err)
    );
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ success: false, error: "All fields required" });
    }

    // Respond immediately
    res.status(200).json({
      success: true,
      message: "Message received successfully",
    });

    // Log results
    const adminInfo = await sendContact({ name, email, message });
    console.log("📨 Admin mail sent:", adminInfo.messageId);

    const autoInfo = await sendAutoReply({ name, email });
    console.log("✉ Auto-reply sent:", autoInfo.messageId);
  } catch (err) {
    console.error("Mail Error:", err);
  }
});
