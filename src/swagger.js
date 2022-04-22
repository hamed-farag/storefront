const swaggerAutogen = require("swagger-autogen")();
const path = require("path");

const doc = {
    info: {
        title: "StoreFront Swagger",
        description: "StoreFront Swagger - Advanced Full-Stack Web Development Nanodegree Program",
        version: "1.0.0",
        termsOfService: "http://swagger.io/terms/",
        contact: { email: "hamed.farag.2009@gmail.com" },
        license: {
            name: "Apache 2.0",
            url: "http://www.apache.org/licenses/LICENSE-2.0.html",
        },
    },
    basePath: "/api/v1/",
    host: "localhost:8080",
    schemes: ["http"],
};

const userRoutesV1EntryPoint = path.join(process.cwd(), "./src/routes/v1/userRoutes.ts");
const categoryRoutesV1EntryPoint = path.join(process.cwd(), "./src/routes/v1/categoryRoutes.ts");
const productRoutesV1EntryPoint = path.join(process.cwd(), "./src/routes/v1/productRoutes.ts");

const outputFile = "./src/routes/v1/swagger.json";
const endpointsFiles = [
    userRoutesV1EntryPoint,
    categoryRoutesV1EntryPoint,
    productRoutesV1EntryPoint,
];

swaggerAutogen(outputFile, endpointsFiles, doc);
