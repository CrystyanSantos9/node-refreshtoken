import { hash } from "bcryptjs";
import { client } from "../../prisma/client";

interface ISecretRequest {
    username: string
    description: string
    app: string
    password: string
}

class CreateSecretUseCase {
   async execute({ username, description, app, password }: ISecretRequest ){
       //verifica se usuário existe
       const userAlredyExists = await client.user.findFirst({
           where: {
               username
           }
       })

       if(!userAlredyExists){
           throw new Error('User not exists!')
       }

       const userId: string = userAlredyExists.id

       //senao
       const secret = await client.secret.create({
           data: {
               userId,
               description,
               app,
               password
           }
       })
       return secret
   }
}

export { CreateSecretUseCase }
