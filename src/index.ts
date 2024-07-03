import express, { Application, Request, Response } from "express";
import swaggerUI from "swagger-ui-express"
import { swaggerDocs } from "../swagger/swaggerDocs";
import { loanRoutes } from "./api/routes/loan-routes";
import { managementRoutes } from "./api/routes/management-routes";

const app: Application = express();
const PORT: number = 5000;

app.use(express.json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use("/", loanRoutes);
app.use("/", managementRoutes);

// health check
app.get("/ping", (req: Request, res: Response) => {
    res.send({message: 'pong'})
});

app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}...`);
});
