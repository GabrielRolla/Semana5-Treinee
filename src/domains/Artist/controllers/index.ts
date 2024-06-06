import { Router, Request, Response, NextFunction } from "express";
import ArtistService from "../services/ArtistService";

const router = Router();

router.get("/get/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const artist = await ArtistService.readId(Number(req.params.id));
        res.json(artist);
    } catch (error) {
        next(error);
    }
});


router.delete("/delete/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const artist = await ArtistService.deleteId(Number(req.params.id));
        res.json(artist);
    } catch (error) {
        next(error);
    }
});

export default router;