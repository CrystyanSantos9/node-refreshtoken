import dayjs from "dayjs";
import { client } from "../../prisma/client";
import { GenerateRefreshToken } from "../../provider/GenerateRefreshToken";
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider";

class RefreshTokenUserUseCase {
    async execute ( refresh_token: string){
        //recurperamos o id do refresh token
        const refreshToken = await client.refreshToken.findFirst({
            where: {
                id: refresh_token
            }
        })

        if(!refreshToken){
            throw new Error("Refresh token invalid")
        }

        //verifica se o nosso refresh token associado ao cliente expirou
        const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expiresIn))


        //instancia a classe de geração do token 
        const generateTokenProvider = new GenerateTokenProvider()
        //cria um token usando o id do refresh token encontrado que está relacionado ao cliente
        //user id vem do refresh token salvo no banco no momento de autenticação
        const token = await generateTokenProvider.execute(refreshToken.userId)

        if(refreshTokenExpired){
            //exclui qualquer refresh_token associado ao cliente
            await client.refreshToken.deleteMany({
                where: {
                    userId: refreshToken.userId
                }
            })

            //instancia um novo gerador de refresh token 
            const generateRefreshTokenProvider = new GenerateRefreshToken()
            //gera um novo refresh token e associa novamente ao usuaŕio
            const newRefreshToken = await generateRefreshTokenProvider.execute(refreshToken.userId)

            //retorna token e novo refresh token 
            return { token, refreshToken: newRefreshToken }
        }

        //se o token não está expirado, retorna apenas um novo token

        return { token }
    }
}

export { RefreshTokenUserUseCase }