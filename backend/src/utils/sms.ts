import Twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();



const client = Twilio(process.env.TWILIO_ACCOUNT_SID , process.env.TWILIO_AUTH_TOKEN);

export function sendSMS(to: string, body: string) {
  return client.messages.create({
    body,
    from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio number
    to,
  });
}


