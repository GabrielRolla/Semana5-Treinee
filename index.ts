import { app } from "./config/expressConfig";
import dotenv from "dotenv";

dotenv.config();

app.listen(precess.env.PORT, () => {
    console.log ("Servidor hosteado na porta " + process.env.PORT);
});


//import UserService from "./src/domains/User/services/UserService";
//import ArtistService from "./src/domains/Artist/services/ArtistService";
//import MusicService from "./src/domains/Music/services/MusicService";

/*
async function main() {
    const body = ({
        id: 0,
        name: "Laudelio",
        email: "laudelio@gmail.com",
        photo: null,
        password: "senha312",
        role: "admin"
        
    })

    const user = await UserService.create(body)
    
    console.log(user);
    
}
*/


/*
async function main() {
    const body = ({
        id: 0,
        name: "Olivia Rodrigues",
        photo: null,
        streams: "1000000"
    })

    const artist = await ArtistService.create(body)

    console.log(artist);
    
}
*/


async function main() {
    const body = ({
        id: 0,
        name: "Werewolf",
        album: 'Vampiro',
        genre: 'pop',
        artistId: 6,       
    })

    const music = await MusicService.create(body)
    
    console.log(music);
    
}



main()