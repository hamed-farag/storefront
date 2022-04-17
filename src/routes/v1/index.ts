import { Express } from "express";
import SwaggerUi from "swagger-ui-express";

import swaggerDocument from "./swagger.json";

import userRoutes from "./userRoutes";
import { BASE_URL_V1 } from "../../constants/urls";

export default function (serverApp: Express): void {
    // register User Routes APIs
    userRoutes(serverApp);

    // initialize swagger document
    serverApp.use(BASE_URL_V1, SwaggerUi.serve, SwaggerUi.setup(swaggerDocument));
}
