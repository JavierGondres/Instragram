import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {RootStackParamList} from '../App/types';
import {SafeAreaView, Text, View} from 'react-native';

interface Props extends NativeStackScreenProps<RootStackParamList, 'Login'> {}

export const Login = ({}: Props) => {
  return (
    <SafeAreaView>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Text>Login</Text>
      </View>
    </SafeAreaView>
  );
};
