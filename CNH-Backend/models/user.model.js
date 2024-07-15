import jwt from "jsonwebtoken";
import mongoose,{Schema} from "mongoose";

const userSchema = new Schema(
    {
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true
        },
        fullName : {
            type:String,
            required : true
        },
        password:{
            type:String,
            required:true
        },
        responsibility:{
            type:String
        },
        refreshToken:{
            type:String,
        }
    },
    {
        timestamps:true
    }
)

userSchema.methods.generateAccessToken = ()=>{
    jwt.sign(
        {
        _id:this._id,
        email:this.email,
        fullName:this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = ()=>{
    jwt.sign(
        {
            _id:this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const UserModel = mongoose.model("User",userSchema);