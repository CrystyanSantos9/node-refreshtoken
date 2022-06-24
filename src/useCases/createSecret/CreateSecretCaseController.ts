import { Request, Response } from "express";
import { CreateSecretUseCase } from "./CreateSecretUseCase";

class CreateSecretCaseController {
    async handle(request: Request, response: Response){
        const {username, description, app , password } = request.body

        const createUserUseCase = new CreateSecretUseCase()

        const secret = await createUserUseCase.execute({
            username,
            description, 
            app,
            password
        })
        return response.json(secret)
    }
}

export { CreateSecretCaseController}