import dayjs from "dayjs";
import { client } from "../prisma/client";

class GenerateRefreshToken {
    async execute(userId: string){
        //gera uma data de 15 s em unicode
        const expiresIn = dayjs().add(15, "second").unix();

        //criamos um refresh token em refresh token associada ao cliente 
        const generateRefreshToken = await client.refreshToken.create({
            data: {
                userId,
                expiresIn,
            }
        })

        return generateRefreshToken;
    }
}

export { GenerateRefreshToken }