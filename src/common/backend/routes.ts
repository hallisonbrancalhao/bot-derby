import { Router } from "express";
import userController from "./Users/user.controller";
import alertController from "./Alerts/alert.controller";

const routes = Router();

routes.get("/user/:usernameGLPI", userController.findByUsername);
routes.get("/users/:discordId", userController.find);
routes.get("/users", userController.findAll);
routes.post("/users", userController.create);
routes.post("/alert", alertController.send);

export default routes;
