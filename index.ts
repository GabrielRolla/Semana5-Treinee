import UserService from "./src/domains/User/services/UserService";


async function main() {
    const body = ({
        id: 0,
        name: "Glenio",
        email: "glenio@gmail.com",
        photo: null,
        password: "senha123",
        role: "admin"
        
    })

    const user = await UserService.create(body)

    console.log(user);
    
}

main()