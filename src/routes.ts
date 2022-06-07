import { Router } from "express";
import { CreateUserCaseController } from "./useCases/createUser/CreateUserCaseController";

const router = Router()

const createUserCaseController = new CreateUserCaseController()

router.post("/users", createUserCaseController.handle)

export { router }