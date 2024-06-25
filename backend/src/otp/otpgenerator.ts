// import axios from 'axios';
// import dotenv from "dotenv"

// dotenv.config()

// // Replace with your Infobip credentials
// const API_KEY =process.env.API_KEY || '7691ff6d3895ef7453cb074b3685a682-60fe6e55-da91-4201-9c25-1033c531b4d0';
// const SENDER = process.env.SENDER_NAME||'madhumathi';
// const INFOBIP_URL = process.env.API_BASE_URL || 'https://api.infobip.com/sms/2/text/advanced'; // Adjust the URL if necessary

// // https://9ly82r.api.infobip.com/sms/2/text/advanced?
// interface Message {
//     destinations: { to: string }[];
//     text: string;
//   }
  
//   export async function sendSMS(phoneNumber: string, otp: string): Promise<void> {
//     const messages: Message[] = [
//       {
//         destinations: [{ to: phoneNumber }],
//         text: `Your OTP is: ${otp}`,
//       },
//     ];
  
//     try {
//       const response = await axios.post(
//         INFOBIP_URL,
//         {
//           messages,
//         },
//         {
//           headers: {
//             Authorization: `App ${API_KEY}`,
//             'Content-Type': 'application/json',
//             Accept: 'application/json',
//           },
//         }
//       );
  
//       console.log('SMS sent successfully:', response.data);
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         console.error('Error sending SMS:', error.response?.data || error.message);
//       } else {
//         console.error('Unexpected error:', error);
//       }
//       throw new Error('Failed to send SMS');
//     }
//   }

// import { Vonage } from '@vonage/server-sdk';
// import dotenv from 'dotenv';

// // Load environment variables from .env file
// dotenv.config();

// interface Keys {
//     apiKey: string;
//     apiSecret: string;
// }

// interface VonageProps {
//     keys: Keys;
// }

// const createVonageInstance = (keys: Keys): Vonage => {
//     return new Vonage(keys);
// };

// interface SmsOptions {
//     to: string;
//     from: string;
//     text: string;
// }

// export async function sendSMS(options: SmsOptions): Promise<void> {
//     const keys: Keys = {
//         apiKey: process.env.VONAGE_API_KEY || "",
//         apiSecret: process.env.VONAGE_API_SECRET || ""
//     };

//     const vonage = createVonageInstance(keys);

//     return new Promise((resolve, reject) => {
//         vonage.sms.send(
//             {
//                 to: options.to,
//                 from: options.from,
//                 text: options.text,
//             },
//             (err: any, responseData: any) => {
//                 if (err) {
//                     console.error('Error sending SMS:', err);
//                     reject(err);
//                 } else if (responseData.messages[0].status !== '0') {
//                     console.error(
//                         'Failed to send SMS:',
//                         responseData.messages[0]['error-text']
//                     );
//                     reject(new Error(responseData.messages[0]['error-text']));
//                 } else {
//                     console.log('SMS sent successfully:', responseData);
//                     resolve();
//                 }
//             }
//         );
//     });
// }


// import { Vonage } from '@vonage/server-sdk';

// // Define the type for the Vonage object
// interface VonageClient {
//     sms: {
//         send: (params: { to: string; from: string; text: string }) => Promise<any>;
//     };
// }

// // Create a new Vonage instance
// const vonage: VonageClient = new Vonage({
//     apiKey: "ba63c99a",
//     apiSecret: "kQWaLARp6hMcg7s3"
// });

// const from: string = "Vonage APIs";
// const to: string = "919655372763";
// const text: string = 'A text message sent using the Vonage SMS API';

// // Define the parameters type for the sendSMS function
// interface SmsParams {
//     to: string;
//     from: string;
//     text: string;
// }

// // Define the return type of the sendSMS function
// type SendSMSResponse = void;

// // Modify the sendSMS function to use TypeScript
// async function sendSMS(params: SmsParams): Promise<SendSMSResponse> {
//     try {
//         const resp = await vonage.sms.send(params);
//         console.log('Message sent successfully');
//         console.log(resp);
//     } catch (err) {
//         console.log('There was an error sending the message.');
//         console.error(err);
//     }
// }

// // Call the sendSMS function

import crypto from 'crypto';

export function generateOTP(length: number = 4): string {
  const otp = crypto.randomInt(0, Math.pow(10, length)).toString();
  return otp.padStart(length, '0');
}


