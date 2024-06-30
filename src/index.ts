import { AppDataSource } from "./data-source";
import express, { Application, Request, Response } from "express";
import { pingRouter } from "./routes/ping.routes";
import swaggerUI from "swagger-ui-express"
import { swaggerDocs } from "../swagger/swaggerDocs";
import "reflect-metadata";

const app: Application = express();
app.use(express.json());
// app.use(errorHandler);
const PORT = 5000;
app.use("/ping", pingRouter);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
// app.use("/auth", userRouter);
// app.use("/api", movieRouter);

app.get("*", (req: Request, res: Response) => {
    res.status(400).json({ message: "Bad Request" });
});

AppDataSource.initialize()
    .then(async () => {
        app.listen(PORT, () => {
            console.log("Server is running on port:" + PORT);
        });
        console.log("Data Source has been initialized!");
    })
    .catch((error) => console.log(error));