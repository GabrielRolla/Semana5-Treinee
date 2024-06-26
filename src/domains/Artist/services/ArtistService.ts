import { Artist } from "@prisma/client";
import  prisma  from "../../../../config/prismaClient";
import { Stream } from "stream";
import { QueryError } from "../../../../errors/QueryError";

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
        if (!artist) {
            throw new QueryError("Artista não encontrado no sistema!");
        }
        return artist;
    }

    async read() {
        const artists = await prisma.artist.findMany({
            orderBy: {
                name: "asc"
            }
        });

        return artists;
    }

    async update(body: Artist){
        const checkArtist = await prisma.artist.findUnique({
            where: {
                id: body.id
            },
        });
        if (!checkArtist) {
            throw new QueryError("Artista não existe!");
        }

        const artist = await prisma.artist.update ({
            where: {
                id: body.id
            },
            data: body
        });
        return artist;
    }

    async deleteId(id:number){
        const checkArtist = await prisma.artist.findUnique({
            where: {
                id: id
            },
        });
        if (!checkArtist) {
            throw new QueryError("Artista não cadastrado no sistema!");
        }
        const artist = await prisma.artist.delete({
            where: {
                id: id
            },
        });
    }
}

export default new ArtistService();


