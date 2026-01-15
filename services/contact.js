const nodemailer = require("nodemailer");

// Create reusable transporter (Gmail SMTP)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // App Password
  },
});

// 🔍 Verify SMTP connection
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Gmail SMTP connection failed:", error);
  } else {
    console.log("✅ Gmail SMTP server is ready to send messages");
  }
});

// Send email to you (admin notification)
async function sendContact({ name, email, message }) {
  const mailOptions = {
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.CONTACT_RECEIVER,
    subject: `📩 New Contact from ${name}`,
    text: `
Name: ${name}
Email: ${email}

Message:
${message}
    `,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("📨 Admin mail sent:", info.response);
  return info;
}

// Auto-reply to sender
async function sendAutoReply({ name, email }) {
  const mailOptions = {
    from: `"Shubham Gupta" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Thanks for reaching out — I’ve received your message",
    text: `
Hi ${name},

Thank you for getting in touch. I’ve received your message and truly appreciate you taking the time to write.

You can expect a response within 24–48 hours.

Warm regards,  
Shubham Gupta
    `,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("✉ Auto-reply sent:", info.response);
  return info;
}

module.exports = { sendContact, sendAutoReply };
