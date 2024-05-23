import { User } from "@prisma/client";
import  prisma  from "../../../../config/prismaClient";

class UserService {
    async create(body: User){
        const user = prisma.user.create({
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

    async read(){
        const user = await prisma.user.findMany ();
        return user;
    }



}


export default new UserService();