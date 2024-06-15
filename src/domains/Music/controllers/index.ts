import { Router, Request, Response, NextFunction } from "express";
import MusicService from "../services/MusicService";
import { checkRole, verifyJWT } from "../../../middlewares/auth";

const router = Router();

router.get("/artist/:id", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const musics = await MusicService.getByArtist(Number(req.params.id));
        res.json(musics);
    } catch (error) {
        next(error);
    }
});

router.get("/", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const musics = await MusicService.getAll();
        res.json(musics);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const music = await MusicService.getById(Number(req.params.id));
        res.json(music);
    } catch (error) {
        next(error);
    }
});

router.post("/create", verifyJWT, checkRole('admin'), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const music = await MusicService.create(req.body);
        res.json(music);
    } catch (error) {
        next(error);
    }
});

router.put("/update/:id", verifyJWT, checkRole('admin'), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const music = await MusicService.update(req.body);
        res.json(music);
    } catch (error) {
        next(error);
    }
});

router.delete("/delete/:id", verifyJWT, checkRole('admin'), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const music = await MusicService.deleteId(Number(req.params.id));
        res.json(music);
    } catch (error) {
        next(error);
    }
});

export default router;