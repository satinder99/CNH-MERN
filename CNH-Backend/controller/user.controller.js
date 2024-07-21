import { UserModel } from "../models/user.model.js";

const createUser = async (req,res)=>{
    //console.log(req.body);
    try{
        const newUser = await UserModel.create({
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

export {
    createUser
}