import { Router, Request, Response, NextFunction } from "express";
import { checkRole, login, logout, notLoggedIn, verifyJWT } from "../../../middlewares/auth";
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

router.post("/artists/create", verifyJWT, checkRole("admin"), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const artist = await ArtistService.create(req.body);
        res.json(artist);
    } catch (error) {
        next(error);
    }
});

router.put("/artists/update", verifyJWT, checkRole("admin"), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const artist = await ArtistService.update(req.body);
        res.json(artist);
    } catch (error) {
        next(error);
    }
});

router.delete("/artists/delete/:id", verifyJWT, checkRole("admin"), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const artist = await ArtistService.deleteId(Number(req.params.id));
        res.json(artist);
    } catch (error) {
        next(error);
    }
});

export default router;