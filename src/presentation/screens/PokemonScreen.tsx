import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, View } from 'react-native';
import { RootStackParams } from '../navigators/StackNavigator';
import { useQuery } from '@tanstack/react-query';
import { getPokemonById } from '../../actions/pokemons/get-pokemon-by-id';
import { FullScreenLoader } from '../components/FullScreenLoader';
import { Chip, Text } from 'react-native-paper';
import { Formatter } from '../../config/helpers/formatter';
import { FadeInImage } from '../components/FadeInImage';
import { ThemeContext } from '../context/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'>{
}

export const PokemonScreen = ({
    route
}: Props) => {

    const { isDark } = useContext( ThemeContext );

    const { top } = useSafeAreaInsets();

    const { pokemonId } = route.params;

    const { isLoading, data: pokemon } = useQuery({
        queryKey: ['pokemon', pokemonId],
        queryFn: () => getPokemonById(pokemonId),
        staleTime: 1000 * 60 * 60, // 1hour
    });


    const pokeballImg = isDark
     ? require('../../shared/assets/pokeball-light.png')
     : require('../../shared/assets/pokeball-dark.png')


    if(!pokemon){
        return <FullScreenLoader />
    }

    return <ScrollView
        style={{ flex: 1, backgroundColor: pokemon.color }}
        bounces={false}
        showsVerticalScrollIndicator={false}>
        {/* Header Container */}
        <View style={styles.headerContainer}>
            {/* Nombre del Pokemon */}
            <Text
                style={{
                    ...styles.pokemonName,
                    top: top + 5,
                }}>
                {Formatter.capitalize(pokemon.name) + '\n'}#{pokemon.id}
            </Text>

            {/* Pokeball */}
            <Image source={pokeballImg} style={styles.pokeball} />

            <FadeInImage uri={pokemon.avatar} style={styles.pokemonImage} />
        </View>

        {/* Types */}
        <View
            style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: 10 }}>
            {pokemon.types.map(type => (
                <Chip
                    key={type}
                    mode="outlined"
                    selectedColor="white"
                    style={{ marginLeft: 10, backgroundColor: 'transparent' }}>
                    {type}
                </Chip>
            ))}
        </View>

        {/* Sprites */}
        <FlatList
            data={pokemon.sprites}
            horizontal
            keyExtractor={item => item}
            showsHorizontalScrollIndicator={false}
            centerContent
            style={{
                marginTop: 20,
                height: 100,
            }}
            renderItem={({ item }) => (
                <FadeInImage
                    uri={item}
                    style={{ width: 100, height: 100, marginHorizontal: 5 }}
                />
            )}
        />


        <View style={{ height: 100 }} />
    </ScrollView>
}


const styles = StyleSheet.create({
    headerContainer: {
        height: 370,
        zIndex: 999,
        alignItems: 'center',
        borderBottomRightRadius: 1000,
        borderBottomLeftRadius: 1000,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    pokemonName: {
        color: 'white',
        fontSize: 40,
        alignSelf: 'flex-start',
        left: 20,
    },
    pokeball: {
        width: 250,
        height: 250,
        bottom: -20,
        opacity: 0.7,
    },
    pokemonImage: {
        width: 240,
        height: 240,
        position: 'absolute',
        bottom: -40,
    },
    loadingIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    subTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 20,
        marginTop: 20,
    },
    statsContainer: {
        flexDirection: 'column',
        marginHorizontal: 20,
        alignItems: 'center',
    },

});