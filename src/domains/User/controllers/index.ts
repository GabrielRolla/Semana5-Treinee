import { login, logout, notLoggedIn, verifyJWT } from "../../../middlewares/auth";
import { Router, Request, Response, NextFunction } from "express";
import statusCodes from "../../../../utils/constants/statusCodes";
import UserService from "../services/UserService";


const router = Router();

router.post("/login", notLoggedIn, login);

router.post("/logout", verifyJWT, logout);

router.get("/account", verifyJWT, UserService.getAccount)

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const users = await UserService.read();
		res.json(users);
	} catch (error) {
		next(error);
	}
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await UserService.readId(Number(req.params.id));
		res.json(user);
	} catch (error) {
		next(error);
	}
});

router.post("/create", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await UserService.create(req.body);
        res.status(statusCodes.SUCCESS).json(user);
    } catch (error) {
        next(error);
    }
});

router.post("/login", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await login(req, res, next);   
        res.status(statusCodes.SUCCESS).json(user);
    } catch (error) {
        next(error);
    }
});

router.put("/users/account/update", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const user = await UserService.update(req.body);
        res.json(user);
    } catch (error) {
        next(error);
    }
});

router.put("/users/account/password", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const { id, newPassword } = req.body;
        const user = await UserService.updatePassword(id, newPassword);
        res.json(user);
    } catch (error) {
        next(error);
    }
});

router.delete("/delete/:id", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await UserService.deleteId(Number(req.params.id));
        res.json(user);
    } catch (error) {
        next(error);
    }
});

export default router;

