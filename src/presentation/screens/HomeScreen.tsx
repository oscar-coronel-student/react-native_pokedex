import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigators/StackNavigator';
import { FlatList, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { getPokemons } from '../../actions/pokemons/get-pokemons';
import { useQuery } from '@tanstack/react-query';
import { PokeballBg } from '../components/PokeballBg';
import { globalTheme } from '../../config/theme/global-theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PokemonCard } from '../components/PokemonCard';


interface Props extends StackScreenProps<RootStackParams, 'HomeScreen'>{
}

export const HomeScreen = ({
}: Props) => {

    const { top } = useSafeAreaInsets();

    const { isLoading, data: pokemons = [] } = useQuery({
        queryKey: ['pokemons'],
        queryFn: () => getPokemons(0),
        staleTime: 1000 * 60 * 60 //60 minutos
    });

    return <View style={[ globalTheme.globalMargin, { marginTop: top } ]}>
        <PokeballBg style={[ styles.imgPosition ]} />

        <FlatList
            data={ pokemons }
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
        />

    </View>
}

const styles = StyleSheet.create({
    imgPosition: {
        position: 'absolute',
        top: -100,
        right: -100
    }
})