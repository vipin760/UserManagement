export interface IUser{
    id?:string;
    _id?:object;
    username:string;
    email:string;
    phone:string;
    password:string
    isBlocked:boolean;
    approved:boolean;
    isVerified:boolean;
    emailToken:string;
}
export interface IReg_response{
    message:string;
}