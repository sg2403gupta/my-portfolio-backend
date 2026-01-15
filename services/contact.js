const nodemailer = require("nodemailer");

// Create reusable transporter (Gmail SMTP)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Gmail App Password
  },
});

// 🔍 Verify SMTP connection
transporter.verify((error, success) => {
  if (error) {
    console.error("Gmail SMTP connection failed:", error);
  } else {
    console.log("Gmail SMTP server is ready to send messages");
  }
});

// Send email to you (admin)
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

// Auto-reply to user
// Auto-reply to user (PROFESSIONAL FORMAT WITH CONTACT INFO)
async function sendAutoReply({ name, email }) {
  const mailOptions = {
    from: `"Shubham Gupta" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Thank You for Contacting Me – Message Received",

    text: `
Dear ${name},

Thank you for reaching out through my portfolio website.

I have successfully received your message and appreciate you taking the time to connect with me. Your inquiry is important, and I will review the details carefully.

What happens next:
• Your message will be reviewed personally  
• I may contact you if any additional clarification is required  
• You can expect a response within 24–48 hours  

If you have any additional information that may help me better understand your request, please feel free to reply to this email.

Best regards,  
Shubham Gupta  
Full Stack MERN Developer  

📧 Email: ${process.env.EMAIL_USER}  
🌐 Portfolio: https://my-portfolio-xi-coral-38.vercel.app  
💼 LinkedIn: https://www.linkedin.com/in/shubham-gupta-a2855b236/  
🐙 GitHub: https://github.com/sg2403gupta
    `,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("✉ Auto-reply sent:", info.response);
  return info;
}

module.exports = { sendContact, sendAutoReply };
