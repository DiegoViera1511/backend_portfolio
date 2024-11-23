import {NewUser} from "../../db/schema/userSchema";
import jwt from "jsonwebtoken";

const SECRET_KEY="SECRET_KEY_FOR_PORTFOLIO_VIERA"

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
            password: parsePassword(object.password),
            token:""
        }
    }catch (e){
        throw new Error('Error user not valid')
    }
}

export function createToken(name : string) {
    return jwt.sign({name: name}, SECRET_KEY, {expiresIn: '24h'});
}

export function isValidToken(token : string) {
    jwt.verify(token, SECRET_KEY, {complete: true});
}