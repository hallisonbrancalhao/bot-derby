import { Router } from "express";
import userController from "./Users/user.controller";
// import healthCheckController from "./controller/healthCheckController";
// import productController from "./controller/productController";
// import userController from "./controller/userController";

const routes = Router();

// routes.get("/health-check", healthCheckController.check);
// routes.get("/users", userController.findAll);
// routes.get("/users/:id", userController.find);
routes.post("/users", userController.create);
// routes.delete("/users/:id", userController.delete);
// routes.put("/users/:id", userController.update);
// routes.post("/products", productController.create);
// routes.get("/products", productController.list);
// routes.get("/products-stock", productController.getStock);
// routes.get("/products-stock-value", productController.getStockValue);

export default routes;
