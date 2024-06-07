import { User } from "@prisma/client";
import  prisma  from "../../../../config/prismaClient";
import bcrypt from "bcrypt";
import { InvalidParamError } from "../../../../errors/InvalidParamError";
import { QueryError } from "../../../../errors/QueryError";    
import { NextFunction } from "express";
import { LoginError } from "../../../../errors/LoginError";

class UserService {
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

    async read(){
        const user = await prisma.user.findMany ();
        return user;
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

    async getAccount(body: User) {
        const user = await prisma.user.findUnique({
            where: {
                id: body.id
            }
        });

        if (!user) {
            throw new LoginError("Faça login para acessar sua conta.");
        }

        return user;
    }
}

    


export default new UserService();