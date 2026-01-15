const nodemailer = require("nodemailer");

// Create reusable transporter (Gmail SMTP with TLS)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // App Password
  },
});

// Send email to you (notification)
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

  await transporter.sendMail(mailOptions);
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

Here’s what happens next:

• I will review your message carefully  
• If needed, I may follow up for a few clarifications  
• You can expect a response within 24–48 hours  

In the meantime, feel free to share any additional details that may help me better understand your request.

Warm regards,  
Shubham Gupta
    `,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { sendContact, sendAutoReply };
