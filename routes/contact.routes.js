const express = require("express");
const router = express.Router();
const { sendContact, sendAutoReply } = require("../services/contact");

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ success: false, error: "All fields required" });
    }

    await sendContact({ name, email, message });
    await sendAutoReply({ name, email });

    res
      .status(200)
      .json({ success: true, message: "Message sent successfully" });
  } catch (err) {
    console.error("❌ Nodemailer Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
