import { pokeApi } from "../../config/api/pokeApi";
import { Pokemon } from "../../domain/entities/pokemon";
import { PokeAPIPokemon } from "../../infrastructure/interfaces/pokeapi.interface";
import { PokemonMapper } from "../../infrastructure/mappers/pokemon.mapper";


export const getPokemonById = async (pokemonId: number): Promise<Pokemon> => {
    try {
        const endpoint = `/pokemon/${ pokemonId }`;
        const { data } = await pokeApi.get<PokeAPIPokemon>(endpoint);

        const pokemon = PokemonMapper.pokeApiPokemonToEntity( data );
    
        return pokemon;
    } catch (error) {
        throw new Error(`Error in getPokemonById method: ${ pokemonId }`);
    }
}