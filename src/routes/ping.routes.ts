import * as express from "express";
import { PingController } from "../controllers/ping.controller";
const Router = express.Router();

Router.get(
    "/ping",
    PingController.ping
);
export { Router as pingRouter };