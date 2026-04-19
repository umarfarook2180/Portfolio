const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

// POST /api/contact
router.post("/", async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "Name, email, and message are required." });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ success: false, message: "Invalid email address." });
  }
  if (message.length < 10) {
    return res.status(400).json({ success: false, message: "Message must be at least 10 characters." });
  }

  try {
    // Only send email if credentials are configured
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_TO || process.env.EMAIL_USER,
        replyTo: email,
        subject: `[Portfolio] ${subject || "New Contact Message"} — from ${name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px;">
            <h2 style="color: #1a1a2e;">New Message from Portfolio</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px; font-weight: bold;">Name:</td><td>${name}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td>${email}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold;">Subject:</td><td>${subject || "—"}</td></tr>
            </table>
            <h3>Message:</h3>
            <p style="background: #f5f5f5; padding: 16px; border-radius: 8px;">${message.replace(/\n/g, "<br>")}</p>
          </div>
        `,
      });
    } else {
      // Log to console if email not configured (development)
      console.log("📧 Contact form submission:", { name, email, subject, message });
    }

    res.json({ success: true, message: "Message sent successfully! I'll get back to you soon." });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ success: false, message: "Failed to send message. Please try again." });
  }
});

module.exports = router;
