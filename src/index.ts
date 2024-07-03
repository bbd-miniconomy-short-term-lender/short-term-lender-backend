import express, { Application, Request, Response } from "express";
import swaggerUI from "swagger-ui-express"
import { swaggerDocs } from "../swagger/swaggerDocs";
import { loanRoutes } from "./api/routes/loan-routes";

const app: Application = express();
const PORT: number = 5000;

app.use(express.json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use("/", loanRoutes)

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to Short Term Lender")
});

app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}...`);
});
