import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";
import { client } from "../../prisma/client";
import { GenerateRefreshToken } from "../../provider/GenerateRefreshToken";
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider";

interface IRequest {
    username: string;
    password: string;
}

class AuthenticateUserUseCase {
    async execute({ username, password }){
        //verifica se usuário existe
        const userAlredyExists = await client.user.findFirst({
            where: {
                username, 
            }
        })

        //se user não existe lança exceção 
        if(!userAlredyExists) throw new Error("User or password incorret")

        //verifica se a senha está correta - compara senha com hash do user buscado
        const passwordMatch = await compare(password, userAlredyExists.password)

        //senha não existe 
        if(!password) throw new Error("User or password incorret")


        //gerando o token 
        const generateTokenProvider = new GenerateTokenProvider()
        const token = await generateTokenProvider.execute(userAlredyExists.id)

        //nas chamadas futuras, deletamos os refresh token, para criamos novos
        await client.refreshToken.deleteMany({
            where: {
                userId: userAlredyExists.id,
            }
        })

        //instanciamos nossa classe de geraçaõ de refreshToken 
        const generateRefreshToken = new GenerateRefreshToken()
        //criamos o token associado a sessão do usuário
        const refreshToken = await generateRefreshToken.execute(
            userAlredyExists.id
        )

        //retornamos os dois valores
        return {token, refreshToken }
    }
}

export { AuthenticateUserUseCase }