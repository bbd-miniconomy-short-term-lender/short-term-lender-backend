import express, { Application, Request, Response } from "express";
import swaggerUI from "swagger-ui-express"
import { swaggerDocs } from "../swagger/swaggerDocs";
import { loanRoutes } from "./api/routes/loan-routes";
import { managementRoutes } from "./api/routes/management-routes";
import { feRouter } from "./api/routes/fe-routes";
import cors from "cors";
import authMiddleware from "./middleware/authMiddleware";

const app: Application = express();
const PORT: number = 5000;

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use("/", loanRoutes, managementRoutes);

// health check
app.get("/health", (req: Request, res: Response) => {
    res.send({
        message: 'Server status: Up and running!',
        quote: 'Пугать ежа голой жопой. ',
        uptime: process.uptime()
    })
});

app.use("/fe", authMiddleware, feRouter);

app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}...`);
});