import mongoose,{Schema} from "mongoose";

const counterSchema = new Schema({
    name:{
        type:String
    },
    value:{
        type:Number
    }
})

export const CounterModel = mongoose.model("Counter",counterSchema)