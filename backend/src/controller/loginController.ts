import { Request, Response } from "express";
import axios from "axios";
import { generateOTP } from "../otp/otpgenerator";
import { sendSMS } from "../utils/sms";
import jwt from "jsonwebtoken";

// const PostNumber = async (req: Request, res: Response): Promise<void> => {
//   console.log(req.body, "Request Body"); // Add detailed logging
//   const { phone } = req.body;

//   const apiKey = process.env.FAST2SMS_API_KEY || "9vGd4troHb5sVlaf7IwAQBCSKRL61Ogk2c8iMNpeuFzZhTWYX0BOE5Y4fhkQHWwvgU6saR3VMNK0oDCZ";
//   // const senderId = "FSTSMS"; // Ensure this is correct based on Fast2SMS documentation

//   try {
//     const otp = Math.floor(100000 + Math.random() * 900000);
//     const params = {
//       authorization: apiKey,
//       variables_values: `${otp}`,
//       route: "otp",
//       // sender_id: senderId, // Ensure this is correct based on Fast2SMS documentation
//       numbers: phone,
//     };

//     console.log("Request Params:", params); // Log request parameters

//     const response = await axios.get("https://www.fast2sms.com/dev/bulkV2", { params });
//     console.log(response.data, "API Response"); // Log the actual response data
//     res.json({ success: true, message: "OTP sent successfully!" });
//   } catch (error) {
//     console.error("Error sending OTP:", error);
//     if (axios.isAxiosError(error) && error.response) {
//       // Log the response from the API for debugging
//       console.error("API Response Error:", error.response.data);
//       res.status(error.response.status).json({ success: false, message: error.response.data.message || "Failed to send OTP." });
//     } else {
//       res.status(500).json({ success: false, message: "Failed to send OTP." });
//     }
//   }
// };

const getOtp = async (req: Request, res: Response): Promise<void> => {
  const { phone, method } = req.body;
  const otp = generateOTP();
  const payload = { phone, otp };
  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET_CODE! || "jhjherwe945845954jhglsitueoiriuew",
    { expiresIn: "1d" }
  );

  try {
    if (method === "sms") {
      await sendSMS(phone, `Your OTP is ${otp}`);
    } else {
      res.status(400).send({ message: "Invalid method" });
    }

    res.status(201).json({ message: "OTP sent successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Error sending OTP", error });
  }
};

const verifyOtp = async (req: Request, res: Response): Promise<void> => {
  const { token, otp } = req.body;

  try {
    const decoded = (await jwt.verify(
      token,
      process.env.JWT_SECRET! || "jhjherwe945845954jhglsitueoiriuew"
    )) as any;
    if (decoded.otp === otp) {
      res.send({ message: "OTP verified successfully", token: token });
    } else {
      res.status(400).send({ message: "Invalid OTP" });
    }
  } catch (error) {
    res.status(400).send({ message: "Invalid or expired token", error });
  }
};

export { getOtp, verifyOtp };
