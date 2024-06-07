import { Artist } from "@prisma/client";
import  prisma  from "../../../../config/prismaClient";
import { Stream } from "stream";

class ArtistService {
    getAll() {
        throw new Error("Method not implemented.");
    }

    async create(body: Artist) {
        

        const artist = await prisma.artist.create({
            data: {
                name: body.name,
                photo: body.photo,
                streams: body.streams
            }
        });
        return artist;
    }

    async readId(id: number){
        const artist = await prisma.artist.findUnique ({
            where: {
                id: id
            },
        });
        return artist;
    }

    async read(){
        const artist = await prisma.artist.findMany ();
        return artist;
    }

    async update(body: Artist){
        const artist = await prisma.artist.update ({
            where: {
                id: body.id
            },
            data: body
        });
        return artist;
    }

    async deleteId(id:number){
        const artist = await prisma.artist.delete({
            where: {
                id: id
            },
        });
    }
}

export default new ArtistService();


