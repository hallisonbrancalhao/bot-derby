import { Router } from "express";
import userController from "./Users/user.controller";
import alertController from "./Alerts/alert.controller";
// import healthCheckController from "./controller/healthCheckController";
// import productController from "./controller/productController";
// import userController from "./controller/userController";

const routes = Router();

routes.get("/users/:discordId", userController.find);
routes.post("/users", userController.create);
routes.post("/alert", alertController.send);

export default routes;
