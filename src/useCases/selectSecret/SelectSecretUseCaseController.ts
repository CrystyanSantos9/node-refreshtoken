import { Request, Response } from "express";
import { SelectSecretUseCase } from "./SelectSecretUseCase";

class SelectSecretUseCaseController {
    async handle(request: Request, response: Response){
        const {userId, description, app} = request.body

        const selectSecreteUseCase = new SelectSecretUseCase()

        const secret = await selectSecreteUseCase.execute({
            userId,
            description, 
            app,
        })

        return response.json(secret)
    }
}

export {SelectSecretUseCaseController}