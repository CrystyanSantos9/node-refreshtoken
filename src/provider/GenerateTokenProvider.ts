import { sign } from "jsonwebtoken";

class GenerateTokenProvider {
    //recebe um userId que será enviado no payload
    async execute(userId: string) {
        //gerando o token 
        const token = sign({}, "a826664b-2dbc-43fa-a6f6-1d15cfd1568d", {
            subject: userId,
            expiresIn: "20s"
        })

        return token;

    }

}

export { GenerateTokenProvider }