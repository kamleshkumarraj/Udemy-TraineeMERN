import { Router } from "express";
import { getAllProducts } from "../controllers/products.controller.js";

export const productsRouter = Router();

productsRouter.route('/').get(getAllProducts)