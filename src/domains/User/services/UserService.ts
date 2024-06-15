import { User } from "@prisma/client";
import  prisma  from "../../../../config/prismaClient";
import bcrypt from "bcrypt";
import { InvalidParamError } from "../../../../errors/InvalidParamError";
import { QueryError } from "../../../../errors/QueryError";    
import { NextFunction } from "express";
import { LoginError } from "../../../../errors/LoginError";

class UserService {
    updateid(id: string, body: any) {
        throw new Error("Method not implemented.");
    }
    async encryptPassword(password: string) {
        const saltRounds = 10;
        const encrypted = await bcrypt.hash(password, saltRounds);
        return encrypted;
    }

    async create(body: User) {
        const checkUser = await prisma.user.findUnique({
            where: {
                email: body.email
            }
        });
      
        if (!checkUser) {
            throw new QueryError("Esse email já está cadastrado");
        }

        if (body.email == null) {
            throw new InvalidParamError("Email não informado!");
        }
      
        const encrypted = await this.encryptPassword(body.password);
        const user = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                photo: body.photo,
                password: encrypted,
                role: body.role
            }
        });

        return user;
    }

    async readId(id: number){
        const user = await prisma.user.findUnique({
            where: {
                id: id
            },
        });
        
        if (!user) {
            throw new QueryError("Usuário não cadastrado no sistema!");
        }
        return user;
    }

    async readEmail(email: string){
        const user = await prisma.user.findUnique ({
            where: {
                email: email
            },
        });
        return user;
    }

    async read() {
        const users = await prisma.user.findMany({
            orderBy: {
                name: "asc"
            }
        });

        return users;
    }

    async update(body: User) {
        const checkUser = await prisma.user.findUnique({
            where: {
                id: body.id
            },
        });
        if (!checkUser) {
            throw new QueryError("Usuário não cadastrado no sistema!");
        }

        const user = await prisma.user.update({
            where: {
                id: body.id
            },
            data: body
        });

        return user;
    }

    async updateId(id: number, body: User) {
        const checkUser = await prisma.user.findUnique({
            where: {
                id: id
            },
        });
        if (!checkUser) {
            throw new QueryError("Usuário não cadastrado no sistema!");
        }

        const user = await prisma.user.update({
            where: {
                id: id
            },
            data: body
        });

        return user;
    }

    async updatePassword(id: number, newPassword: string) {
        const checkUser = await prisma.user.findUnique({
            where: {
                id: id,
            },
        });
        if (!checkUser) {
            throw new QueryError("Usuário não cadastrado no sistema!");
        }

        const encrypted = await this.encryptPassword(newPassword);

        const user = await prisma.user.update({
            where: {
                id: id,
            },
            data: {
                password: encrypted,
            }
        });

        return user;
    }
    

    async deleteId(id: number) {
        const checkUser = prisma.user.findUnique({
            where: {
                id: id
            }
        });
        if (!checkUser) {
            throw new QueryError("Usuário não existe.");
        }
        const user = await prisma.user.delete({
            where: {
                id: id
            },
        });
    }

    async deleteEmail(email: string){
        const user = await prisma.user.delete({
            where: {
                email: email
            },
        });
    }
}

    


export default new UserService();