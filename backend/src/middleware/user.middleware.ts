import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { IUser } from "../shared/interface/user.interface"
import asyncHandler from "express-async-handler"
import { UserModel } from "../model/user.model"



export const userMiddleware = asyncHandler( async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const token = req.header("x-auth-user")
        if(token){
            const decode = jwt.verify(token,"thisismysecretkey") as IUser
            const userData = await UserModel.findOne({_id:decode.id})
            if(!userData?.isBlocked){
                if(userData?.approved){
                   if(userData.isVerified){
                    next()
                   }else{
                    res.status(400).send({message:"please complete your email verification"})
                   }
                }else{
                    res.status(400).send({message:"please wait your approval"})
                }
                
            }else{
                console.log("ithanne")
                res.status(400).send({message:"vendor is blocked please contact"})
            }
            
        }else{
            res.status(401).send({message:"Oops some went wrong....!"})
        }
    } catch (error) {
        res.status(500).send({message:"internal server down"})
    }
    })

