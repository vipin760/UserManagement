import Router, { Request,Response } from "express"
import asyncHandler from "express-async-handler"
import { UserModel } from "../model/user.model"
import bcrypt from "bcrypt"
import { IUser } from "../shared/interface/user.interface"
import jwt from 'jsonwebtoken'
const router = Router()

/////////////////////////////////////////////////////////////////////////////////////
router.post("/register",asyncHandler( async(req:Request,res:Response)=>{
    try {
        console.log("user register working")
        const {username,email,phone,password} = req.body
        const emailExist = await UserModel.findOne({email:email})
        if(!emailExist){
            const passwordHash = await bcrypt.hash(password,10)
            const userSave=new UserModel({username,email:email.toLowerCase(),phone,password:passwordHash})
            await userSave.save().then(data=>{
                res.status(200).send({message:"user registered successfully"})
            })

        }else{
            res.status(400).send({message:"email already exist"})
        }
    } catch (error) {
        res.status(500).send({message:"internal server erorr"})
    }
}))
/////////////////////////////////////////////////////////////////////////////////////
router.post("/login", asyncHandler (async (req:Request,res:Response)=>{
    try {
        const { email, password} = req.body
        const userData = await UserModel.findOne({email:email})
        if(userData&&await bcrypt.compare(password,userData.password) ){
            if(userData.isBlocked){
                if(userData.approved){
                    const token = generateToken(userData)
                    res.status(200).send({token:token,message:"user login successfully"})
                }else{
                    res.status(400).send({message:"please wait admin approvel"})
                }
            }else{
                res.status(400).send({message:"vendor is blocked please contact vendor"})
            }
        }else{
            res.status(400).send({message:"invalid username or password"})
        }
        
    } catch (error) {
        res.status(500).send({message:"internal server down"})
    }
}))
const generateToken = (userData:IUser):string=>{
    const token = jwt.sign({id:userData._id,email:userData.email},"thisismysecretkey",{expiresIn:"30min"})
    return token
}
/////////////////////////////////////////////////////////////////////////////////////

router.get("/fetch-user", asyncHandler ( async(req:Request,res:Response)=>{
try {
    console.log("working")
    const token = req.header("x-auth-user") as string
    console.log(token)
    if(token){
        const decode = jwt.verify(token,"thisismysecretkey") as IUser
        const userData = await UserModel.findOne({_id:decode.id})
        if(userData){
            console.log(userData)
            res.status(200).send({data:userData})
        }
    }
} catch (error) {
    res.status(500).send({message:"internal server down"})
}
}))
/////////////////////////////////////////////////////////////////////////////////////
export default router