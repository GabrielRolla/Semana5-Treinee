import prisma                              from "../../config/prismaClient";
import { User }                            from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { PermissionError }                 from "../../errors/PermissionError";
import statusCodes                         from "../../utils/constants/statusCodes";
import { sign, verify, JwtPayload }        from "jsonwebtoken";
import { TokenError }                      from "../../errors/TokenError";
import { compare }                         from "bcrypt";

function generateJWT(user: User, res: Response) {
    const body = {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name
    }

    const token = sign({user: body}, process.env.SECRET_KEY || "", {expiresIn: process.env.JWT_EXPIRATION});
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development"
    })
}

function cookieExtractor(req: Request) {
    let token = null;
    if (req.cookies) {
        token = req.cookies["jwt"];
    }
    return token;
}

export function verifyJWT(req: Request, res: Response, next: NextFunction) {
    try {
        const token = cookieExtractor(req);

        if (token) {
            const decoded = verify(token, process.env.PROCESS_KEY || "") as JwtPayload;
            req.user = decoded.user;
        }

        if (req.user == null) {
            throw new TokenError("Você precisa estar logado para realizar essa ação!")
        }

        next();
    } catch (error) {
        next(error);
    }
}

export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: req.body.email
            }
        });

        if (!user) {
            throw new PermissionError("Email e/ou senha incorretos");
        }

        const match = compare(req.body.password, user.password);
        if (!match) {
            throw new PermissionError("Email e/ou senha incorretos");
        }

        generateJWT(user, res);

        res.status(statusCodes.SUCCESS).json("Login efetuado com sucesso");
    } catch (error) {
        next(error);
    }
}

export async function logout(req: Request, res: Response, next: NextFunction) {
    try {

    } catch (err) {
        next(err);
    }
}

export async function notLoggedIn(req: Request, res: Response, next: NextFunction) {
    try {

    } catch (err) {
        next(err);
    }
}

export function checkRole() {

}