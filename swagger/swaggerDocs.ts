import swaggerJSDoc from "swagger-jsdoc";
import { swaggerDefinition } from "./swaggerDefinition";


const swaggerOptions = {
    swaggerDefinition: swaggerDefinition,
    apis: []
}

export const swaggerDocs = swaggerJSDoc(swaggerOptions);
