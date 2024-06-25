import { Schema, model,Document } from "mongoose"


export interface Otp extends Document {
    email:string,
    otp:string,
    createdAt:Date
}

const OtpSchema : Schema = new Schema({
    email: {type:String,required:true},
    otp:{type:String,required:true},
    createdAt:{type:Date,default:Date.now , index:{expires:"5m"}}
})
export const Otp = model<Otp>("Otp",OtpSchema)