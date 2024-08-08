import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Text, View } from 'react-native';
import { RootStackParams } from '../navigators/StackNavigator';


interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'>{
}

export const PokemonScreen = ({
}: Props) => {
    return <View>
        <Text>PokemonScreen</Text>
    </View>
}
