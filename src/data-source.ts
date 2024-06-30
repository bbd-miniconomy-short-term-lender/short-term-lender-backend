import "reflect-metadata";
import { DataSource } from "typeorm";

import { Admin } from "./entity/Admin.entity.ts";
// import { CRSPayment } from "./entity/CRSPayment.entity.ts";
// import { Loan } from "./entity/Loan.entity.ts";
// import { Persona } from "./entity/Persona.entity.ts";
// import { Repayment } from "./entity/Repayment.entity.ts";

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } =
    process.env;

export const AppDataSource = new DataSource({
    type: "postgres",
    host: DB_HOST,
    port: parseInt(DB_PORT || "5432"),
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    ssl: {
        rejectUnauthorized: false
    },

    entities: [Admin],//, CRSPayment, Loan, Persona, Repayment],
    subscribers: [],
});