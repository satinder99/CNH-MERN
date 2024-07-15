import { UserModel } from "../models/user.model.js";

const createUser = async (req,res)=>{
    //console.log(req.body);
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

export {
    createUser
}