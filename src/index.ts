import express, { Express } from "express";
import dotenv from "dotenv";
import router from "./routes";
import bodyParser from 'body-parser';

dotenv.config();

const app: Express = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const port = process.env.PORT;
app.use(router);

app.listen(port, async () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});