import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();


export const sendEmail = async (to, subject, htmlContent) => {
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // or any SMTP service
      auth: {
        user: process.env.EMAIL_USER, // your email
        pass: process.env.EMAIL_PASS, // app password or email password
      },
    });



    // Send mail
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html: htmlContent,
    });

    console.log(`📧 Email sent to ${to}`);
  } catch (error) {
    console.error("❌ Email error:", error);
  }
};
