import mongoose,{Schema} from "mongoose";

const counterSchema = new Schema({
    value:{
        type:Number
    }
})

const counterModel = mongoose.Model("Counter",counterSchema)