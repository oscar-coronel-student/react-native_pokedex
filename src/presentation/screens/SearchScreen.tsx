import { StackScreenProps } from '@react-navigation/stack';
import React, { useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';
import { RootStackParams } from '../navigators/StackNavigator';
import { globalTheme } from '../../config/theme/global-theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ActivityIndicator, TextInput, Text } from 'react-native-paper';
import { Pokemon } from '../../domain/entities/pokemon';
import { PokemonCard } from '../components/PokemonCard';
import { useQuery } from '@tanstack/react-query';
import { getPokemonsNamesWithIds } from '../../actions/pokemons/get-pokemons-names-ids';


interface Props extends StackScreenProps<RootStackParams, 'SearchScreen'>{
}

export const SearchScreen = ({
}: Props) => {

    const { top } = useSafeAreaInsets();
    const [term, setTerm] = useState('');

    const { isLoading, data: pokemonList = [] } = useQuery({
        queryKey: ['pokemons', 'all'],
        queryFn: () => getPokemonsNamesWithIds(),
        staleTime: 1000 * 60 * 60
    });

    // TODO: aplicar debouncer
    const pokemonNameIdList = useMemo(() => {
        //Es un número
        if(!isNaN(Number(term))){
           const pokemon = pokemonList.find( pokemon => pokemon.id === Number(term) );
           return pokemon ? [pokemon] : [];
        }

        if(term.length < 3) return [];
        
        return pokemonList.filter( pokemon => {
            return pokemon.name.toLowerCase().includes( term.toLowerCase() )
        })
    }, [term]);

    return <View style={[ globalTheme.globalMargin, { paddingTop: top } ]}>
        <TextInput
            placeholder='Buscar Pokemón'
            mode='flat'
            autoFocus
            autoCorrect={false}
            onChangeText={setTerm}
            value={ term }
            style={{ backgroundColor: 'transparent' }}
        />

        <ActivityIndicator style={{ paddingTop: 20 }} />

        <Text>
            { JSON.stringify( pokemonNameIdList, null, 3 ) }
        </Text>

        <FlatList
            data={ [] as Pokemon[] }
            renderItem={({ item }) => <PokemonCard pokemon={ item } />
            }
            keyExtractor={ ( item ) => `${ item.id }` }
            numColumns={ 2 }
            showsVerticalScrollIndicator={ false }
            onEndReachedThreshold={0.6}
        />
    </View>
}
