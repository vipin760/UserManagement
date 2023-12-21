import { FormGroup } from "@angular/forms";

export const PasswordValidators =(password:string,cpassword:string)=>{
    return (formGroup:FormGroup)=>{
        let passwordMatch = formGroup.controls[password]
        let cpasswordMatch = formGroup.controls[cpassword]
        if(passwordMatch.errors && !passwordMatch.errors['PasswordValidators']) return;
        if(passwordMatch.value != cpasswordMatch.value){
            cpasswordMatch.setErrors({PasswordValidators:true})
        }else{
            cpasswordMatch.setErrors(null)
        }
    }
}


