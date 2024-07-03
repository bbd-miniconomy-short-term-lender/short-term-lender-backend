import express, { Application, Request, Response } from "express";
import swaggerUI from "swagger-ui-express"
import { swaggerDocs } from "../swagger/swaggerDocs";
import { loanRoutes } from "./api/routes/loan-routes";
import { managementRoutes } from "./api/routes/management-routes";
import { feRouter } from "./api/routes/fe-routes";
import cors from "cors";

const app: Application = express();
const PORT: number = 5000;

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use("/", loanRoutes, managementRoutes, feRouter);

// health check
app.get("/health", (req: Request, res: Response) => {
    res.send({
        message: 'I AM ALIVE BABY!',
        shrek: `
            Donkey: Shrek, what are you doing?
            Shrek: I just..., you know...
            Donkey: Oh, come on, I was just kidding. And that one, that's Throwback. The only Ogre to ever spit over three wheat fields.
            Shrek: Right. Yeah.
            Donkey: Hey, can you tell my future from these stars?
            Shrek: Well, the stars don't tell the future, Donkey. They tell stories.
                c,_.--.,y
                  7 a.a(
                (   ,_Y)
                :  '---;
             ___.'\\\\.  - (
            .'\"\"\"S,._'--'_2..,_
            |    ':::::=:::::  \\
            .     f== ;-,---.' T
            Y.   r,-,_/_      |
            |:\\___.---' '---./
            |'\\\`             )
            \\\\             ,
            ':;,.________.;L
            /  '---------' |
            |              \\\\
            L---'-,--.-'--,-'
            T    /   \\\\   Y
            |   Y    ,   |
            |   \\\\    (   |
            (   )     \\\\,_L
            7-./      )  \`,
            /  _(      '._  \\\\
            '---'           '--'
        `
    })
});

app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}...`);
});