import { client } from "../../prisma/client";

interface ISecretRequest {
    userId: string
    description?: string
    app?: string
}

class SelectSecretUseCase {
   async execute({ userId, description, app }: ISecretRequest ){
       //verifica se usuário existe
       const userSecretsAlredyExists = await client.secret.findFirst({
           where: {
            userId
           }
       })

       if(!userSecretsAlredyExists){
           throw new Error('User not exists!')
       }

      
       //senao
       const secret = await client.secret.findMany({
        where: {
            userId
           }
       })

       return secret
   }
}

export { SelectSecretUseCase }
