import { Router } from "express";
import { CreateUserCaseController } from "./useCases/createUser/CreateUserCaseController";
import { AuthenticateUserController } from "./useCases/authenticateUser/AuthenticateUserController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { RefreshTokenUserController } from "./useCases/refreshTokenUser/RefreshTokenUserControllerUseCase";
import { CreateSecretCaseController } from "./useCases/createSecret/CreateSecretCaseController";
import { SelectSecretUseCaseController } from "./useCases/selectSecret/SelectSecretUseCaseController"

const router = Router()

const createUserCaseController = new CreateUserCaseController()
const createSecretCaseController = new CreateSecretCaseController()
const authenticateUserController = new AuthenticateUserController()
const refreshTokenUserController = new RefreshTokenUserController()
const selectSecretUseCaseController = new SelectSecretUseCaseController()

router.post("/users", createUserCaseController.handle)
router.post("/login", authenticateUserController.handle)
router.post("/refresh-token", refreshTokenUserController.handle)
router.post("/secret", createSecretCaseController.handle)
router.get("/secret", selectSecretUseCaseController.handle)

router.get("/courses", ensureAuthenticated, (request, response)=>{
    return response.json([
        {
            _id: 1,
            name: "curso 1"
        },
        {
            _id: 2,
            name: "curso 2"
        },
        {
            _id: 3,
            name: "curso 3"
        },
        {
            _id: 4,
            name: "curso 4"
        }
    ])
})


export { router }