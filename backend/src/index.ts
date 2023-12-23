import express, { Request, Response } from "express"
import dotenv from "dotenv"
dotenv.config()
import { dbConnect } from "./config/config"
import cors from "cors"
import user_router from "./router/user.router"
const app = express() 
dbConnect()
app.use(
  cors({
    credentials:true,
    origin:["http://localhost:4200"] 
  })
)
app.use(express.json())

app.use("/api/user",user_router)

app.listen(3000,()=>{
  console.log("connected.....")
})

