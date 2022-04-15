import express, { Express } from "express";
import SwaggerUi from "swagger-ui-express";

import swaggerDocument from "./swagger.json";

// import controller

import { BASE_URL_V1, urlsV1 } from "../../constants/urls";

export default function (serverApp: Express): void {
    const router = express.Router();

    // router.get(urlsV1.url, controllerMethod);

    // register routes v1
    serverApp.use(BASE_URL_V1, router);
    // initialize swagger document
    serverApp.use(BASE_URL_V1, SwaggerUi.serve, SwaggerUi.setup(swaggerDocument));
}
