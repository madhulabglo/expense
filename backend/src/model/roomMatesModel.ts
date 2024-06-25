import { Document, model,Schema } from "mongoose"



export interface Room extends Document {
    name :string
}

const RoomMateSchema :  Schema = new Schema ({
    name:{type:String,required:true}
})

export const RoomMates = model<Room>("roommates",RoomMateSchema)