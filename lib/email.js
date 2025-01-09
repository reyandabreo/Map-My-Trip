import nodemailer from 'nodemailer';

// Configure the transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // e.g., smtp.gmail.com
  port: 587, // Standard SMTP port
  secure: false, // True for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER, // Your SMTP email
    pass: process.env.SMTP_PASS, // Your SMTP password or app password
  },
});

// Function to send email
export async function sendEmail(to, subject, htmlContent) {
  try {
    const info = await transporter.sendMail({
      from: `"YourAppName" <${process.env.SMTP_USER}>`, // Sender address
      to, // Receiver's email
      subject, // Subject line
      html: htmlContent, // HTML content
    });

    console.log('Email sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

export default sendEmail;