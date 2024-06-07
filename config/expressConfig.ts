import cors, { CorsOptions } from "cors";
import cookieParser          from "cookie-parser";
import dotenv                from "dotenv";
import express, { Express }  from "express";
import MusicRouter           from "../src/domains/Music/controllers/index";
import UserRouter            from "../src/domains/User/controllers/index";
import ArtistRouter          from "../src/domains/Artist/controllers/index";
 

dotenv.config();

export const app: Express = express();

const options: CorsOptions = {
	credentials: true,
	origin: process.env.APP_URL
};

app.use(cors(options));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({
	extended: true
}));

// Add controller routes...
app.use("/api/users", UserRouter);
app.use("/api/musics", MusicRouter);
app.use("/api/artists", ArtistRouter);

export default app;