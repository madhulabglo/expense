// import mongoose from "mongoose";

// const {Schema,model}= mongoose

// interface getNumber {
//     phone :string
// }

// const LoginSchema = new Schema<getNumber>( {
//     phone :{type:String,required:true}

// })
// const loginModel = model<getNumber>("login",LoginSchema)

// export default loginModel

import { Document, model, Schema } from 'mongoose';

export interface Otp extends Document {
  phone: string;
  otp: string;
  secret: string;
}

const otpSchema: Schema = new Schema({
  phone: { type: String, required: true },
  otp: { type: String, required: true },
  secret: { type: String, required: true },
});

export const OtpModel = model<Otp>('Otp', otpSchema);
