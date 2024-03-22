import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login} from '../Login';
import {RootStackParamList} from './types';
import {MainAppBarHeader} from '../../Components/mainAppBarHeader';
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  useTheme,
} from 'react-native-paper';
import {lightcolors, darkColors} from '../../Consts/colors';
import {StatusBar, useColorScheme} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
const Stack = createNativeStackNavigator<RootStackParamList>();

const AppStack = () => {
  const theme = useTheme();
  StatusBar.setBackgroundColor(theme.colors.background);
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          header: () => <MainAppBarHeader onBack={() => console.log(';')} />,
        }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  const colorScheme = useColorScheme();
  const paperTheme =
    colorScheme === 'dark'
      ? {...MD3DarkTheme, colors: darkColors}
      : {...MD3LightTheme, colors: lightcolors};

  return (
    <NavigationContainer>
      <PaperProvider theme={paperTheme}>
        <GestureHandlerRootView style={{flex: 1}}>
          <AppStack />
        </GestureHandlerRootView>
      </PaperProvider>
    </NavigationContainer>
  );
};

export default App;
