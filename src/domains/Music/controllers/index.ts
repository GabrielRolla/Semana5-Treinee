import { Router, Request, Response, NextFunction } from "express";
import MusicService from "../services/MusicService";

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const musics = await MusicService.getAll();
        res.json(musics);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const music = await MusicService.getById(Number(req.params.id));
        res.json(music);
    } catch (error) {
        next(error);
    }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const music = await MusicService.create(req.body);
        res.json(music);
    } catch (error) {
        next(error);
    }
});

router.put("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const music = await MusicService.update(req.body);
        res.json(music);
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const music = await MusicService.deleteId(Number(req.params.id));
        return music;
    } catch (error) {
        next(error);
    }
});

export default router;