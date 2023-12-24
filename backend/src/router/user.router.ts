import Router, { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { UserModel } from "../model/user.model";
import bcrypt from "bcrypt";
import { IUser } from "../shared/interface/user.interface";
import jwt from "jsonwebtoken";
import { userMiddleware } from "../middleware/user.middleware";
import nodemailer from "nodemailer";
import crypto from "crypto";
const router = Router();

/////////////////////////////////////////////////////////////////////////////////////
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vipinm500@gmail.com",
    pass: "ugyh ilhh gsnl xiro",
  },
  tls: {
    rejectUnauthorized: false,
  },
});
router.post(
  "/register",
  asyncHandler(async (req: Request, res: Response) => {
    try {
      const { username, email, phone, password } = req.body;
      const emailExist = await UserModel.findOne({ email: email });
      if (!emailExist) {
        const passwordHash = await bcrypt.hash(password, 10);
        const userSave = new UserModel({
          username,
          email: email.toLowerCase(),
          phone,
          password: passwordHash,
          emailToken: crypto.randomBytes(64).toString("hex"),
        });
        await userSave.save().then((data) => {
          var mailOption = {
            from: ` "verify your email" <vipinm500@gmail.com> `,
            to: data.email,
            subject: "hello please verify your email",
            html: `<h2> ${data.username} thanks for registering </h2>
                        <h4>please verify your email and continue....</h4>
                        <a href="http://${req.headers.host}/api/user/verify-email?token=${data.emailToken}">verify email</a>`,
          };
          transporter.sendMail(mailOption, function (err, info) {
            if (err) {
              console.log(err);
            } else {
              console.log("verification email send to your account");
              res
                .status(200)
                .send({
                  data: null,
                  message: "verification email send to your account",
                });
            }
          });
        });
      } else {
        res.status(400).send({ message: "email already exist" });
      }
    } catch (error) {
      res.status(500).send({ message: "internal server erorr" });
    }
  })
);
/////////////////////////////////////////////////////////////////////////////////////
router.get(
  "/verify-email",
  asyncHandler(async (req: Request, res: Response) => {
    try {
      const userToken = req.query.token;
      const userData = await UserModel.findOne({ emailToken: userToken });
      if (userData) {
        userData.emailToken = "";
        userData.isVerified = true;
        await userData.save().then((data) => {
          res.redirect("http://localhost:4200");
        });
      }
    } catch (error) {
      res.status(500).send({ message: "internal server down" });
    }
  })
);
/////////////////////////////////////////////////////////////////////////////////////

router.post(
  "/login",
  userMiddleware,
  asyncHandler(async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const userData = await UserModel.findOne({ email: email });
      if (userData && (await bcrypt.compare(password, userData.password))) {
        const token = generateToken(userData);
        res
          .status(200)
          .send({ token: token, message: "user login successfully" });
      } else {
        res.status(400).send({ message: "invalid username or password" });
      }
    } catch (error) {
      res.status(500).send({ message: "internal server down" });
    }
  })
);
const generateToken = (userData: IUser): string => {
  const token = jwt.sign(
    { id: userData._id, email: userData.email },
    "thisismysecretkey",
    { expiresIn: "30min" }
  );
  return token;
};
/////////////////////////////////////////////////////////////////////////////////////

router.get(
  "/fetch-user",
  userMiddleware,
  asyncHandler(async (req: Request, res: Response) => {
    try {
      const token = req.header("x-auth-user") as string;
      if (token) {
        const decode = jwt.verify(token, "thisismysecretkey") as IUser;
        const userData = await UserModel.findOne({ _id: decode.id });
        if (userData) {
          res.status(200).send({ data: userData });
        }
      }
    } catch (error) {
      res.status(500).send({ message: "internal server down" });
    }
  })
);
/////////////////////////////////////////////////////////////////////////////////////
export default router;
