import { Router, Request, Response, NextFunction } from "express";
import { login, logout, notLoggedIn, verifyJWT } from "../../../middlewares/auth";
import ArtistService from "../services/ArtistService";

const router = Router();

router.get("/artists", verifyJWT, ArtistService.read)

router.get("/artists/:id", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const artist = await ArtistService.readId(Number(req.params.id));
        res.json(artist);
    } catch (error) {
        next(error);
    }
});

router.put("/put/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const artist = await ArtistService.readId(Number(req.params.id));
        res.json(artist);
    } catch (error) {
        next(error);
    }
});

router.post("/post/:id", async (req: Request, res: Response, next: NextFunction) => {
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