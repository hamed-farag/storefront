import express, { Express } from "express";

import { signInUser, signUpUser } from "../../controllers/user";

import { BASE_URL_V1, urlsV1 } from "../../constants/urls";

export default function (serverApp: Express): void {
    const router = express.Router();

    router.post(urlsV1.user.signIn, signInUser);
    router.post(urlsV1.user.signup, signUpUser);

    // register routes v1
    serverApp.use(BASE_URL_V1, router);
}
