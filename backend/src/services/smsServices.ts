import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config()

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user:process.env.EMAIL_ADDRESS , // replace with your email
    pass: process.env.GOOGLE_APP_PASSWORD  // replace with your email password
  }
});

export const sendOtp = async (email: string, otp: string) => {
  const mailOptions = {
    from: 'madhumathi.labglo@gmail.com',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`
  };


  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }

};
