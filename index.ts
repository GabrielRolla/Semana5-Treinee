import UserService from "./src/domains/User/services/UserService";


async function main() {
    const body = ({
        id: 0,
        name: "Laudelio",
        email: "laudelio@gmail.com",
        photo: null,
        password: "senha312",
        role: "user"
        
    })

    const user = await UserService.create(body)
    
    console.log(await UserService.read());
    
}

main()