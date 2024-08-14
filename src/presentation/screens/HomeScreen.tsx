import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigators/StackNavigator';
import { View } from 'react-native';
import { ActivityIndicator, Button, Text } from 'react-native-paper';
import { getPokemons } from '../../actions/pokemons/get-pokemons';
import { useQuery } from '@tanstack/react-query';


interface Props extends StackScreenProps<RootStackParams, 'HomeScreen'>{
}

export const HomeScreen = ({
}: Props) => {

    const { isLoading, data } = useQuery({
        queryKey: ['pokemons'],
        queryFn: () => getPokemons(),
        staleTime: 1000 * 60 * 60 //60 minutos
    });

    return <View>
        <Text variant='headlineLarge'>HomeScreen</Text>

        {
            isLoading
            ? <>
                <ActivityIndicator />
            </>
            : <>
                <View style={{
                    width: 150,
                    alignSelf: 'center'
                }}>
                    <Button icon='camera' mode='contained-tonal' onPress={() => console.log('pressed')}>
                        Press me { data?.length }
                    </Button>
                </View>
            </>
        }

    </View>
}
