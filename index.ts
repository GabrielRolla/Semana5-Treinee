import UserService from "./src/domains/User/services/UserService";
import ArtistService from "./src/domains/Artist/services/ArtistService";

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

async function main() {
    const body = ({
        id: 0,
        name: "Galinha Pintadinha"
        foto: null,
        streams: "1000000"
    })

    const artist = await ArtistService.create(body)

    console.log(await ArtistService.read());
    
}