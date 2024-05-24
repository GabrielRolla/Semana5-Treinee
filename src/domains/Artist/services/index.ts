import ArtistService from "./ArtistService";

async function main() {
    const body = {
        id: 0,
        name: "Galinha Pintadinha",
        foto: null,
        streams: "100000"
   }

   const artist = await ArtistService.create(body)

   console.log(artist);
}

main