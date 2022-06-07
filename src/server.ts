import express  from "express";
import { router } from "./routes"

const app = express()

app.use(express.json())

app.use(router)

app.listen(3005, ()=> console.log("server listening on port 3005"))