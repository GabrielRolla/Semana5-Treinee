import { Music } from "@prisma/client";
import prisma    from "../../../../config/prismaClient";
import { InvalidParamError } from "../../../../errors/InvalidParamError";
import { QueryError } from "../../../../errors/QueryError";

class MusicService {
    async create(body: Music) {
        if (!body) {
            throw new InvalidParamError("Não é possível adicionar uma música sem nenhuma informação");
        }

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

        if (!music) {
            throw new QueryError("Música não existe no sistema!");
        }

        return music;
    }

    async getAll() {
        const musics = await prisma.music.findMany({
            orderBy: {
                id: 'desc'
            }
        });

        if (!musics) {
            throw new QueryError("Não há músicas cadastradas no sistema!");
        }

        return musics;
    }

    async update(body: Music) {
        if (!body) {
            throw new InvalidParamError("Não há informações para atualizar música!");
        }

        const checkMusic = await prisma.music.findUnique({
            where: {
                id: body.id
            }
        });
        if (!checkMusic) {
            throw new InvalidParamError("Música não existe no sistema");
        }

        const music = await prisma.music.update({
            where: {
                id: body.id
            },
            data: body
        });
        
        return music;
    }

    async deleteId(id: number) {
        const checkMusic = await prisma.music.findUnique({
            where: {
                id: id
            }
        });
        if (!checkMusic) {
            throw new InvalidParamError("Música não existe no sistema");
        }
        
        const music = await prisma.music.delete({
            where: {
                id: id
            },
        });

        return music;
    }
}

export default new MusicService();