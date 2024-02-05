import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import router from "./routes";
import {createBookmarks} from "./services/typesense.service";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(router);

app.listen(port, async () => {
    await createBookmarks();
    console.log(`[server]: Server is running at http://localhost:${port}`);
});