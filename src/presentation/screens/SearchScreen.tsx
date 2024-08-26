import { StackScreenProps } from '@react-navigation/stack';
import React, { useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';
import { RootStackParams } from '../navigators/StackNavigator';
import { globalTheme } from '../../config/theme/global-theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ActivityIndicator, TextInput, Text } from 'react-native-paper';
import { PokemonCard } from '../components/PokemonCard';
import { useQuery } from '@tanstack/react-query';
import { getPokemonsNamesWithIds } from '../../actions/pokemons/get-pokemons-names-ids';
import { FullScreenLoader } from '../components/FullScreenLoader';
import { getPokemonsByIds } from '../../actions/pokemons/get-pokemons-by-ids';
import { useDebouncedValue } from '../hooks/useDebouncedValue';


interface Props extends StackScreenProps<RootStackParams, 'SearchScreen'>{
}

export const SearchScreen = ({
}: Props) => {
    const { top } = useSafeAreaInsets();
    const [term, setTerm] = useState('');

    const { debouncedValue } = useDebouncedValue({
        value: term,
        timer: 1000
    })

    const { isLoading, data: pokemonList = [] } = useQuery({
        queryKey: ['pokemons', 'all'],
        queryFn: () => getPokemonsNamesWithIds(),
        staleTime: 1000 * 60 * 60
    });

    const pokemonNameIdList = useMemo(() => {
        //Es un número
        if(!isNaN(Number(debouncedValue))){
           const pokemon = pokemonList.find( pokemon => pokemon.id === Number(debouncedValue) );
           return pokemon ? [pokemon] : [];
        }

        if(debouncedValue.length < 3) return [];
        
        return pokemonList.filter( pokemon => {
            return pokemon.name.toLowerCase().includes( debouncedValue.toLowerCase() )
        })
    }, [debouncedValue]);


    const {
        isLoading: isLoadingPokemons,
        data: pokemons = []
    } = useQuery({
        queryKey: ['pokemons', 'by', pokemonNameIdList],
        queryFn: () => getPokemonsByIds( pokemonNameIdList.map( e => e.id ) ),
        staleTime: 1000 * 60 * 5
    });


    if( isLoading )
        return <FullScreenLoader />

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

        {
            isLoadingPokemons && <>
                <ActivityIndicator style={{ paddingTop: 20 }} />
            </>
        }

        <FlatList
            data={ pokemons }
            renderItem={({ item }) => <PokemonCard pokemon={ item } />
            }
            keyExtractor={ ( item ) => `${ item.id }` }
            numColumns={ 2 }
            showsVerticalScrollIndicator={ false }
            onEndReachedThreshold={0.6}
            ListFooterComponent={ <View style={{ height: 80 }} /> }
        />
    </View>
}
