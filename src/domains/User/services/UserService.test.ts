import { before } from "node:test";
import prisma from "../../../../config/prismaClient";
import { prismaMock } from "../../../../config/singleton";
import { QueryError } from "../../../../errors/QueryError";
import { User } from "@prisma/client";
import create from "./UserService";

describe('create', () => {
    const User = require('../models/User');
    const UserService = require('./UserService');

    beforeEach(() => {
    
    });

    test("deve criar um usuário", async () => {
        const body = {
            id: 1,
            name: "Nome",
            email: "email@gmail.com",
            photo: "photo",
            password: "123456",
            role: "admin"
        };

        prismaMock.user.create.mockResolvedValue(body);

        await expect(create(body)).resolves.toEqual({
            id: 1,
            name: "Nome",
            email: "email@gmail.com",
            photo: "photo",
            password: "123456",
            role: "admin"
        })

    });

});

describe('update', () => {
    const User = require('../models/User');
    const UserService = require('./UserService');

    beforeEach(() => { 
    
    });

    test("deve atualizar um nome de usuário", async () => {
        const body = {
            id: 1,
            name: "Nome",
            email: "email@gmail.com",
            photo: "photo",
            password: "123456",
            role: "admin"
        };

        prismaMock.user.update.mockResolvedValue(body);

        await expect(update(body)).resolves.toEqual({
            id: 1,
            name: "Nome",
            email: "email@gmail.com",
            photo: "photo",
            password: "123456",
            role: "admin",
        });

    });

    test('deve falhar ao atualizar um usuário inexistente', async () => {
        const body = {
            id: "",
            name: "Nome",
            email: "email@gmail.com",
            photo: "photo",
            password: "123456",
            role: "admin"
        };

        prismaMock.user.update.mockImplementation()

        await expect(update(body)).resolves.toEqual(
            new QueryError("Usuário não cadastrado no sistema!")
        
        )

    });
});

describe('delete', () => {
    const User = require('../models/User');
    const UserService = require('./UserService');

    beforeEach(() => {
    
    });

    test('tenta deletar um usuàrio inexistente ==> gera erro', async () => {
        prismaMock.user.findFirst.mockResolvedValue(null);

        await expect(UserService.deleteId(id)).rejects.toThrow(
            new QueryError("Usuário não cadastrado no sistema!")
        );
        
        expect(prismaMock.user.findFirst).toHaveBeenCalledWith({where: {id: id}});
        expect(prismaMock.user.delete).not.toHaveBeenCalled();

    });
});