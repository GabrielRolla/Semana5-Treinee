import { checkRole, login, logout, notLoggedIn, verifyJWT } from "../../../middlewares/auth";
import { Router, Request, Response, NextFunction } from "express";
import statusCodes from "../../../../utils/constants/statusCodes";
import UserService from "../services/UserService";


const router = Router();

router.post("/users/create", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await UserService.create(req.body);
        res.status(statusCodes.SUCCESS).json(user);
    } catch (error) {
        next(error);
    }
});

router.post("/login", notLoggedIn, login);

/*
router.post("/login", notLoggedIn, login, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await login(req, res, next);   
        res.status(statusCodes.SUCCESS).json(user);
    } catch (error) {
        next(error);
    }
});
*/

router.post("/logout", verifyJWT, logout);

router.get("/users/account", verifyJWT, UserService.getAccount)

router.put("/users/account/update", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const user = await UserService.update(req.body);
        res.status(statusCodes.SUCCESS).json(user);
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

router.delete("/users/account/delete", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.body;
        const user = await UserService.deleteId(id);
        res.json(user);
    } catch (error) {
        next(error);
    }
});

router.get("/users", verifyJWT, checkRole("admin"), async (req: Request, res: Response, next: NextFunction) => {
	try {
		const users = await UserService.read();
		res.json(users);
	} catch (error) {
		next(error);
	}
});

router.get("/users/:id", verifyJWT, checkRole("admin"), async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await UserService.readId(Number(req.params.id));
		res.json(user);
	} catch (error) {
		next(error);
	}
});

router.post("/users/admin/create", verifyJWT, checkRole("admin"), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await UserService.create(req.body);
        res.status(statusCodes.SUCCESS).json(user);
    } catch (error) {
        next(error);
    }
});

router.post("/users/admin/update", verifyJWT, checkRole("admin"), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await UserService.update(req.body);
        res.status(statusCodes.SUCCESS).json(user);
    } catch (error) {
        next(error);
    }
});

router.put("/users/update/:id", verifyJWT, checkRole("admin"), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const user = await UserService.updateId(Number(id), req.body);
        res.status(statusCodes.SUCCESS).json(user);
    } catch (error) {
        next(error);
    }
});

router.delete("/users/delete/:id", verifyJWT, checkRole("admin"), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await UserService.deleteId(Number(req.params.id));
        res.json(user);
    } catch (error) {
        next(error);
    }
});









export default router;

