import { AbstractControl } from "@angular/forms";

export const PasswordMatchValidator = (password:string,cpassword:string)=>{
    const validator = (form:AbstractControl) =>{
        const passwordControl = form.get(password)
        const cpasswordControl = form.get(cpassword)

        if(!passwordControl || !cpasswordControl){
            return
        }
        if(passwordControl.value != cpasswordControl.value){
            cpasswordControl.setErrors({noMatch:true})
        }else{
            const errors = cpasswordControl.errors
            if(!errors) return
            delete errors["noMatch"]
            cpasswordControl.setErrors(errors)
        }
    }
    return validator
}