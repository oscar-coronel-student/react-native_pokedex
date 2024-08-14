import { pokeApi } from "../../config/api/pokeApi";
import { Pokemon } from "../../domain/entities/pokemon";


export const getPokemons = async (): Promise<Pokemon[]>  => {
    try {
        const endpoint = '/pokemon';

        const { data } = await pokeApi.get( endpoint );

        console.log(data);

        return [];
    } catch (error) {
        throw new Error('Error getting pokemons');
    }
}