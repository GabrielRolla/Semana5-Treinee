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
}


export default new UserService();