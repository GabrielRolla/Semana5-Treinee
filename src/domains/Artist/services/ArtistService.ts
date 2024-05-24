import { Artist } from "@prisma/client";
import  prisma  from "../../../../config/prismaClient";
import { Stream } from "stream";

class ArtistService {
    async create(body: Artist){
        const artist = await prisma.artist.create({
            data: {
                name: body.name,
                foto: body.foto,
                streams: body.streams
            }
        });
        return artist;
    }
}

export default new ArtistService();


