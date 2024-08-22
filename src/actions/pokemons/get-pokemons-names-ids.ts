import { pokeApi } from "../../config/api/pokeApi";
import { PokeAPIPaginatedResponse } from "../../infrastructure/interfaces/pokeapi.interface";


export const getPokemonsNamesWithIds = async () => {
    const endpoint = `pokemon?limit=1000`;
    const { data } = await pokeApi.get<PokeAPIPaginatedResponse>(endpoint);

    return data.results.map( result => {
        return {
            id: Number(result.url.split('/')[6]),
            name: result.name
        }
    })
}