import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigators/StackNavigator';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';


interface Props extends StackScreenProps<RootStackParams, 'HomeScreen'>{
}

export const HomeScreen = ({
}: Props) => {
    return <View>
        <Text>HomeScreen</Text>

        <View style={{
            width: 150,
            alignSelf: 'center'
        }}>
            <Button icon='camera' mode='contained-tonal' onPress={() => console.log('pressed')}>
                Press me
            </Button>
        </View>
    </View>
}
