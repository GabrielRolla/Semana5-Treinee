import { Music } from "@prisma/client";
import prisma    from "../../../../config/prismaClient";

class MusicService {
    async create(body: Music) {
        const music = await prisma.music.create({
            data: {
                name: body.name,
                album: body.album,
                genre: body.genre,
                artistId: body.artistId
            }
        });
        return music;
    }

    async getById(id: number) {
        const music = await prisma.music.findUnique({
            where: {
                id: id
            },
        });

        return music;
    }

    async getAll() {
        const musics = await prisma.music.findMany({
            orderBy: {
                id: 'desc'
            }
        });

        return musics;
    }

    async update(body: Music) {
        const music = await prisma.music.update({
            where: {
                id: body.id
            },
            data: body
        });
        
        return music;
    }

    async deleteId(id: number) {
        const music = await prisma.music.delete({
            where: {
                id: id
            },
        });

        return music;
    }
}

export default new MusicService();