import express, {Express} from "express";
import dotenv from "dotenv";
import router from "./routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(router);

app.listen(port, async () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});