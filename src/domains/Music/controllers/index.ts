import { Router, Request, Response, NextFunction } from "express";
import MusicService from "../services/MusicService";

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const musics = await MusicService.readAll();
        res.json(musics);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const music = await MusicService.readId(Number(req.params.id));
        res.json(music);
    } catch (error) {
        next(error);
    }
});

export default router;