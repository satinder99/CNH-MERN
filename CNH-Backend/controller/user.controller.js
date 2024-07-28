import { User } from "../models/user.model.js";

const generateAccessAndRefreshTokens = async (userId)=>{
    const user = await User.findById(userId)
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
    await user.save({validateBeforeSave : false})

    return {accessToken,refreshToken}
}

const createUser = async (req,res)=>{
    
    let {email,fullName,password,responsibility} = req.body
    email = email.trim()
    fullName = fullName.trim(),
    password = password.trim(),
    responsibility = responsibility.trim()

    console.dir( email + fullName+ password+ responsibility);

    if(!email || !fullName || !password){
        return res
            .status(409)
            .json({
                "status":"409",
                "message":"Email, Fullname and passwords are required",
                "data":"Error"
            })
    }

    try{

        const isUserExist = await User.findOne({email})
        if(isUserExist){
            return res
                .status(409)
                .json({
                    "status":"409",
                    "message":"Email already registered",
                    "data":"Error"
                })
        }

        const newUser = await User.create({
            email ,
            fullName,
            password,
            responsibility : responsibility || "normal"
        })

        if(!newUser){
            return res
                .status(409)
                .json({
                    "status":"409",
                    "message":"Error while saving user to DB",
                    "data":"User : "+req.body
                })
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

    let {email,password} = req.body
    email = email.trim()
    password = password.trim()
    if(!email || !password){
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
    const isPasswordMatching =await user.isPasswordCorrect(password)
    if(!isPasswordMatching){
        return res
            .status(401)
            .json({
                "status":401,
                "message": "Password or email is incorrect",
                "data":"Unauthorized"
            })
    }
    
    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user.id);

    console.log(accessToken,refreshToken)

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