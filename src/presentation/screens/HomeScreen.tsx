import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigators/StackNavigator';
import { FlatList, StyleSheet, View } from 'react-native';
import { ActivityIndicator, FAB, Text, useTheme } from 'react-native-paper';
import { getPokemons } from '../../actions/pokemons/get-pokemons';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { PokeballBg } from '../components/PokeballBg';
import { globalTheme } from '../../config/theme/global-theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PokemonCard } from '../components/PokemonCard';
import { useRef } from 'react';


interface Props extends StackScreenProps<RootStackParams, 'HomeScreen'>{
}

export const HomeScreen = ({
    navigation
}: Props) => {

    const theme = useTheme();

    const { top } = useSafeAreaInsets();
    const isLoadingNextPage = useRef(false);

    const queryClient = useQueryClient();


    const { data, isFetching, fetchNextPage } = useInfiniteQuery({
        queryKey: ['pokemons', 'infinite'],
        initialPageParam: 0,
        queryFn: async (params) => {
            const pokemons = await getPokemons(params.pageParam)
            
            pokemons.forEach( pokemon => {
                queryClient.setQueryData(['pokemon', pokemon.id], pokemon);
            });
            
            return pokemons;
        },
        getNextPageParam: (lastPage, allPages) => allPages.length,
        staleTime: 1000 * 60 * 60, //60 minutos

    });

    const onLoadNextPage = () => {
        if(!isLoadingNextPage.current){
            isLoadingNextPage.current = true;
            fetchNextPage().finally(()=>{
                isLoadingNextPage.current = false;
            });
        }
    }

    const handleSearch = () => {
        navigation.navigate('SearchScreen');
    }

    return <View style={[ globalTheme.globalMargin, { marginTop: top } ]}>
        <PokeballBg style={[ styles.imgPosition ]} />

        <FlatList
            data={ data?.pages.flat() ?? [] }
            renderItem={({ item }) => <PokemonCard pokemon={ item } />
            }
            keyExtractor={ ( item ) => `${ item.id }` }
            numColumns={ 2 }
            ListHeaderComponent={() => {
                return <>
                    <Text variant='displayMedium'>
                        Pokédex
                    </Text>
                </>
            }}
            
            showsVerticalScrollIndicator={ false }
            onEndReached={onLoadNextPage}
            onEndReachedThreshold={0.6}
        />

        <FAB
            label='Buscar'
            style={[ globalTheme.fab, { backgroundColor: theme.colors.primary } ]}
            mode='elevated'
            color={ theme.dark ? 'black' : 'white' }
            onPress={handleSearch}
        />

        {
            isFetching && <>
                <View
                    style={[ styles.loadingContainer ]}
                >
                    <ActivityIndicator color='red' size={ 30 } />
                </View>
            </>
        }

    </View>
}

const styles = StyleSheet.create({
    imgPosition: {
        position: 'absolute',
        top: -100,
        right: -100
    },
    loadingContainer: {
        position: 'absolute',
        bottom: 30,
        alignSelf: 'center'
    }
})