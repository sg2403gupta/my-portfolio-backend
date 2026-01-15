const nodemailer = require("nodemailer");

// Basic input sanitization (prevents HTML/header injection)
const escapeHTML = (str = "") =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

// Verify transporter on startup
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email transporter error:", error.message || error);
  } else {
    console.log("✅ Email server is ready to send messages");
  }
});

// Send message to you (admin)
const sendContact = async ({ name, email, message }) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error(
      "Missing EMAIL_USER or EMAIL_PASS in environment variables"
    );
  }

  const safeName = escapeHTML(name);
  const safeEmail = escapeHTML(email);
  const safeMessage = escapeHTML(message);

  const info = await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    replyTo: safeEmail,
    subject: `New Contact Form Message from ${safeName}`,
    html: `
      <h2>New Contact Request</h2>
      <p><strong>Name:</strong> ${safeName}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p><strong>Message:</strong></p>
      <p>${safeMessage.replace(/\n/g, "<br/>")}</p>
    `,
  });

  return info;
};

// Auto-reply to user
const sendAutoReply = async ({ name, email }) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error(
      "Missing EMAIL_USER or EMAIL_PASS in environment variables"
    );
  }

  const safeName = escapeHTML(name);
  const safeEmail = escapeHTML(email);

  const info = await transporter.sendMail({
    from: `"Shubham Gupta" <${process.env.EMAIL_USER}>`,
    to: safeEmail,
    subject: "Thank you for contacting me!",
    html: `
      <p>Hi ${safeName},</p>
      <p>Thank you for reaching out! I've received your message and will get back to you within 24–48 hours.</p>
      <p>Meanwhile, feel free to explore my portfolio.</p>
      <p>Best regards,<br/><strong>Shubham Gupta</strong></p>
    `,
  });

  return info;
};

module.exports = { sendContact, sendAutoReply };
