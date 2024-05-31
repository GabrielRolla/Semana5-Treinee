import { Router, Request, Response, NextFunction } from "express";
import ArtistService from "../services/ArtistService";

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await ArtistService.read();
        res.json(artist);
    } catch (error) {
        next(error);
    }
});