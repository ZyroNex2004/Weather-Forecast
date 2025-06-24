const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,   // your Gmail
        pass: process.env.EMAIL_PASS,   // your Gmail App Password
      },
    });

    // Email to yourself (admin)
    const adminMailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `📨 Contact Form Message from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
      `,
    };

    // Thank-you email to user
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: '🤝 Thank You for Contacting Us!',
      text: `Hi ${name},\n\nThank you for reaching out! We have received your message and will get back to you shortly.\n\nBest regards,\nWeather Forecast Team`,
    };

    // Send both emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    res.status(200).json({ success: true, message: 'Emails sent successfully!' });
  } catch (err) {
    console.error('Error sending email:', err);
    res.status(500).json({ success: false, message: 'Failed to send email.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
