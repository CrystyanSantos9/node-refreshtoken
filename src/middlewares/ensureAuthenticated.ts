import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
){
    //pegamos o header authorization 
    const authToken = request.headers.authorization; 

    //verificamos se o header existe
    if(!authToken){
        return response.status(401).json({
            success: false, 
            message: "header authorization is missing"
        })
    }

    //se token existe
    //pegamos o valor de token que em no formato 
    //Bearer sfdafsasdfasdfasdfasd - pegamos somente segunda parte
    const [, token] = authToken.split(" ")

    //verifcamos token
    try{
        //retorna true or false - se false gera exception
        verify(token, "a826664b-2dbc-43fa-a6f6-1d15cfd1568d")

        return next()
    }catch(err){
        return response.status(401).json({
            success: false, 
            message: "Invalid token"
        })
    }
}