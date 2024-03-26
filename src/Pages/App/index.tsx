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
import {Signup} from '../Signup';
import {goBack, navigationRef} from '../../utils/navigationref/rootNavigation';
import AuthContext, {AuthProvider} from '../../Contexts/AuthContext';
import { useContext } from 'react';
import { SwitchAccount } from '../SwitchAccount';
const Stack = createNativeStackNavigator<RootStackParamList>();

const AppStack = () => {
  const {userData, isLoading} = useContext(AuthContext);
  const theme = useTheme();
  StatusBar.setBackgroundColor(theme.colors.background);
  return (
    <Stack.Navigator initialRouteName="SwitchAccount">
      <Stack.Screen
        name="SwitchAccount"
        component={SwitchAccount}
        options={{
          header: () => <MainAppBarHeader/>,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          header: () => <MainAppBarHeader onBack={() => goBack()} />,
        }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{
          header: () => <MainAppBarHeader onBack={() => goBack()} />,
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
    <NavigationContainer ref={navigationRef}>
      <PaperProvider theme={paperTheme}>
        <GestureHandlerRootView style={{flex: 1}}>
          <AuthProvider>
            <AppStack />
          </AuthProvider>
        </GestureHandlerRootView>
      </PaperProvider>
    </NavigationContainer>
  );
};

export default App;
