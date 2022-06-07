import { Request, Response } from "express";
import { CreateUserUseCase } from "./createUserUseCase";

class CreateUserCaseController {
    async handle(request: Request, response: Response){
        const { username, name , password } = request.body

        const createUserUseCase = new CreateUserUseCase()

        const user = await createUserUseCase.execute({
            name, 
            username,
            password
        })
        return response.json(user)
    }
}

export { CreateUserCaseController}