const sendAutoReply = async ({ name, email }) => {
  const safeName = escapeHTML(name);
  const safeEmail = escapeHTML(email);

  const info = await transporter.sendMail({
    from: `"Shubham Gupta" <${process.env.EMAIL_USER}>`,
    to: safeEmail,
    replyTo: process.env.EMAIL_USER,
    subject: "Thanks for reaching out — I’ve received your message",

    // Plain text fallback (important)
    text: `Hi ${safeName},

Thank you for reaching out. I’ve received your message and truly appreciate you taking the time to connect.

Here’s what happens next:
- I will review your message carefully
- I may follow up if any clarification is needed
- You can expect a response within 24–48 hours

Warm regards,
Shubham Gupta
`,

    // HTML version
    html: `
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:20px;font-family:Arial,Helvetica,sans-serif;">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;">

        <!-- Header -->
        <tr>
          <td style="background:#0f172a;padding:24px;text-align:center;color:#ffffff;">
            <h1 style="margin:0;font-size:24px;">Shubham Gupta</h1>
            <p style="margin:6px 0 0;font-size:14px;color:#c7d2fe;">Full Stack MERN Developer</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:28px;color:#111827;font-size:15px;line-height:1.6;">
            <p>Hi <strong>${safeName}</strong>,</p>

            <p>Thank you for reaching out. I’ve received your message and truly appreciate you taking the time to connect.</p>

            <p><strong>Here’s what happens next:</strong></p>
            <ul>
              <li>I will review your message carefully</li>
              <li>If needed, I may follow up for clarification</li>
              <li>You can expect a response within <strong>24–48 hours</strong></li>
            </ul>

            <p>In the meantime, feel free to explore my work:</p>

            <p>
              🌐 <a href="https://my-portfolio-xi-coral-38.vercel.app/" style="color:#2563eb;text-decoration:none;">Portfolio</a><br/>
              💼 <a href="https://www.linkedin.com/in/shubham-gupta-a2855b236/" style="color:#2563eb;text-decoration:none;">LinkedIn</a><br/>
              🐙 <a href="https://github.com/sg2403gupta" style="color:#2563eb;text-decoration:none;">GitHub</a>
            </p>

            <p>Warm regards,<br/><strong>Shubham Gupta</strong></p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f9fafb;padding:14px;text-align:center;color:#6b7280;font-size:12px;">
            This is an automated confirmation email. Your message has been successfully received.
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
    `,
  });

  return info;
};
