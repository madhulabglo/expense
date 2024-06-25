import { Request, Response } from "express";

import crypto from "crypto";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { Otp } from "../model/otpModel";
import { sendOtp } from "../services/smsServices";

dotenv.config();

const JWT_SECRET =
  process.env.JWT_SECRET_CODE || "jhjherwe945845954jhglsitueoiriuew";

export const otpgenerator = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    const newOtp = new Otp({ email, otp });

    await sendOtp(email, otp);
    await newOtp.save();

    res.status(201).json({ message: "OTP sent to your email" });
  } catch (error) {
    console.error("Error in generateOtp:", error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { otp } = req.body;

    if (!otp) {
      return res.status(400).json({ otp: "OTP is required" });
    }

    const otpRecord = await Otp.findOne({ otp });

    if (!otpRecord) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const email = otpRecord.email;
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1d" });

    // Remove the OTP record from the database after verification
    // await Otp.deleteOne({ _id: otpRecord._id });

    res.status(200).json({
      token,
      email: otpRecord.email,
      username: `user` + otpRecord.id.slice(0, 4),
    });
  } catch (error) {
    console.error("Error in verifyOtp:", error);
    res.status(500).json({ message: "Failed to verify OTP" });
  }
};
