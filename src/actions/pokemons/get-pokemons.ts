import { pokeApi } from "../../config/api/pokeApi";
import { Pokemon } from "../../domain/entities/pokemon";
import { PokeAPIPaginatedResponse, PokeAPIPokemon } from "../../infrastructure/interfaces/pokeapi.interface";
import { PokemonMapper } from "../../infrastructure/mappers/pokemon.mapper";


export const getPokemons = async (page: number, limit: number = 20): Promise<Pokemon[]>  => {
    try {
        const endpoint = `/pokemon?offset=${ page * limit }&limit=${ limit }`;

        const { data } = await pokeApi.get<PokeAPIPaginatedResponse>( endpoint );

        const pokemonPromisesList = data.results.map( (info) => {
            return pokeApi.get<PokeAPIPokemon>(info.url);
        });

        const pokeApiPokemons = await Promise.all( pokemonPromisesList );

        const pokemonsPromises: Promise<Pokemon>[] = pokeApiPokemons.map( 
            pokeApiResponse => PokemonMapper.pokeApiPokemonToEntity( pokeApiResponse.data ) 
        );

        const pokemons: Pokemon[] = await Promise.all(pokemonsPromises);

        return pokemons;
    } catch (error) {
        throw new Error('Error getting pokemons');
    }
}