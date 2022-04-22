import { Express } from "express";
import SwaggerUi from "swagger-ui-express";

import swaggerDocument from "./swagger.json";

import userRoutes from "./userRoutes";
import categoryRoutes from "./categoryRoutes";
import productRoutes from "./productRoutes";
import orderRoutes from "./orderRoutes";
import { BASE_URL_V1 } from "../../constants/urls";

export default function (serverApp: Express): void {
    // register User Routes APIs
    userRoutes(serverApp);
    // register Category Routes APIs
    categoryRoutes(serverApp);
    // register Product Routes APIs
    productRoutes(serverApp);
    // register order Routes APIs
    orderRoutes(serverApp);

    // initialize swagger document
    serverApp.use(BASE_URL_V1, SwaggerUi.serve, SwaggerUi.setup(swaggerDocument));
}
