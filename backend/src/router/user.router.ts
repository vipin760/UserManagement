import Router, { Request,Response } from "express"
import asyncHandler from "express-async-handler"
import { UserModel } from "../model/user.model"
const router = Router()

router.post("/register",asyncHandler( async(req:Request,res:Response)=>{
    try {
        console.log("user register working")
        const {username,email,phone,password} = req.body
        const emailExist = await UserModel.find()
        if(!emailExist){
            const userSave=new UserModel({username,email:email.toLowerCase(),phone,password})
            await userSave.save().then(data=>{
                console.log("save success",data)
                res.status(200).send({message:"user registered successfully"})
            })

        }else{
            res.status(400).send({message:"email already exist"})
        }
    } catch (error) {
        res.status(500).send({message:"internal server erorr"})
    }
}))

export default router