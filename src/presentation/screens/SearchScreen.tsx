import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Text, View } from 'react-native';
import { RootStackParams } from '../navigators/StackNavigator';


interface Props extends StackScreenProps<RootStackParams, 'SearchScreen'>{
}

export const SearchScreen = ({
}: Props) => {
    return <View>
        <Text>SearchScreen</Text>
    </View>
}
