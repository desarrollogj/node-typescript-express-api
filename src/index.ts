//https://auth0.com/blog/node-js-and-typescript-tutorial-build-a-crud-api/#Get-Starts-with-TypeScript-in-Node-js
//https://nozzlegear.com/blog/implementing-a-jwt-auth-system-with-typescript-and-node

/**
 * Required External Modules
 */
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { itemsRouter } from "./items/items.router";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware"
import { requireJwtHandler } from "./middleware/session.middleware"
import { sessionRouter } from "./user/session.router";

dotenv.config();

/**
 * App Variables
 */
if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);
const app = express();

/**
 *  App Configuration
 */
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api/session", sessionRouter)
app.use("/api/menu/items", requireJwtHandler, itemsRouter);
app.use(errorHandler);
app.use(notFoundHandler);

/**
 * Server Activation
 */
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});