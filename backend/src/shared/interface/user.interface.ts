export interface IUser{
    id?:string;
    _id?:object;
    username:string;
    email:string;
    phone:string;
    password:string
    isBlocked:boolean;
    approved:boolean;
}
export interface IReg_response{
    message:string;
}