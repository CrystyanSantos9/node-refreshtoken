import { Request,Response } from "express";
import { RefreshTokenUserUseCase } from "./RefreshTokenUserUseCase";

class RefreshTokenUserController{
    async handle(request: Request, response: Response){
        //pegamos o valor de refresh token enviado no body do request
        const { refresh_token } = request.body

        //instancia nosso refresh token generator
        const refreshTokenUserUseCase = new RefreshTokenUserUseCase()

        //gera refresh token válido para usuário
        const token = await refreshTokenUserUseCase.execute(refresh_token)

        return response.json(token)
    }
}

export { RefreshTokenUserController }