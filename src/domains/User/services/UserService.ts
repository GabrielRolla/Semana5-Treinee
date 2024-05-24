import { User } from "@prisma/client";
import  prisma  from "../../../../config/prismaClient";

class UserService {
    async create(body: User){
        const user = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                photo: body.photo,
                password: body.password,
                role: body.role
            }
        });
        return user;
    }

    async readId(id: number){
        const user = await prisma.user.findUnique ({
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

    async update(body: User){
        const user = await prisma.user.update ({
            where: {
                id: body.id
            },
            data: body
        });
        return user;
    }

    async deleteId(id:number){
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