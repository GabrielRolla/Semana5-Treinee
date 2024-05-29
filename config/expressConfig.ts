import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import MusicRouter from "../src/domains/Music/controllers/index";

dotenv.config();

export const app: Express = express();

const options: CorsOptions = {
	credentials: true,
	origin: process.env.APP_URL
};

app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({
	extended: true
}));

// Add controller routes...
app.use("/api/musics", MusicRouter);


app.listen(process.env.PORT);
export default app;