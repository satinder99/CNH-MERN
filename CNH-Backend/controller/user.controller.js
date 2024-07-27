import { User } from "../models/user.model.js";

const generateAccessAndRefreshTokens = async (userId)=>{
    const user = await User.findById(userId)
    console.log(userId)
    if(!user){
        return res
            .status(401)
            .json({
                "status":401,
                "message": "No user found",
                "data":"Unauthorized"
            })
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken
    user.save({validateBeforeSave : false})

    return {accessToken,refreshToken}
}

const createUser = async (req,res)=>{
    

    try{
        const newUser = await User.create({
            email : req.body.email,
            fullName : req.body.fullName,
            password : req.body.password,
            responsibility : req.body.responsibility || "normal"
        })

        if(!newUser){
            console.log("error occured while saving user to DB : ",req.body);
            return null;
        }
        console.log("new user created : ",newUser);
        return res
                .status(201)
                .json({
                    "status" : 201,
                    "message": "New user created",
                    "data":newUser

                })
    }
    catch(err){
        console.log("error occured while creating the useer :: ",err)
        return res
                .status(409)
                .json({
                    "status" : 409,
                    "message": "Error while creating new user created",
                    "data":""

                })
    }
}

const loginUser = async(req,res)=>{

    //find user in DB
    //create refresh and access token

    const {email,password} = req.body

    if(!email && !password){
        return res
            .status(401)
            .json({
                "status":401,
                "message": "email and password are required",
                "data":"Unauthorized"
            })
    }

    const user = await User.findOne({email:email});
    if (!user){
        return res
            .status(401)
            .json({
                "status":401,
                "message": "No user found for this email",
                "data":"Unauthorized"
            })
    }
    //console.log(password)
    const isPasswordMatching =await user.isPasswordCorrect(password)
    //console.log(isPasswordMatching)
    if(!isPasswordMatching){
        return res
            .status(401)
            .json({
                "status":401,
                "message": "Password or email is incorrect",
                "data":"Unauthorized"
            })
    }
    
    const {accessToken, refreshToken} = generateAccessAndRefreshTokens(user.id);

    //cookie
    return res
        .status(200)
        .cookie("access-token",accessToken,{httpOnly : true, secure:true})
        .cookie("refresh-token",refreshToken,{httpOnly:true, secure:true})
        .json({
            "status":200,
            "message":"User logged in",
            "data":user
        })
}

export {
    createUser,
    loginUser
}