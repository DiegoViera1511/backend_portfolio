import {NewUser} from "../../db/schema/userSchema";

export const parseUsername = (username : any) : string => {
    if (typeof username === "string"){
        return username as string
    }
    throw new Error('User name must be string')
}

export const parsePassword = (password : any) : string => {
    if (typeof password === "string"){
        return password as string
    }
    throw new Error('Password must be string')
}



export const validateUser = (object : any) : NewUser => {
    try {
        return {
            name: parseUsername(object.name),
            password: parsePassword(object.password)
        }
    }catch (e){
        throw new Error('Error user not valid')
    }
}