import { Router } from "express";
import userController from "./users/user.controller";
import alertController from "./alerts/alert.controller";

const routes = Router();

routes.get("/users/:discordId", userController.find);
routes.get("/users", userController.findAll);
routes.post("/users", userController.create);
routes.post("/alert", alertController.send);

export default routes;
