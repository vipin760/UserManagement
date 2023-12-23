export interface IUser{
    username:string;
    email:string;
    phone:string;
    password:string
}
export interface IReg_response{
    message:string;
}
export interface IUser_Login{
    email:string;
    password:string;
}
export interface ILogin_Response{
    message?:string;
    token:string
}

export interface IToken{
    token?:string | boolean;   
}

export interface IFetchUser{
    data:IUser
}