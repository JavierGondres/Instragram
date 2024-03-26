import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useContext, useEffect, useState} from 'react';
import {RootStackParamList} from '../App/types';
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  useColorScheme,
  useWindowDimensions,
} from 'react-native';

import {useTheme, Text, Button, Divider, Avatar} from 'react-native-paper';
import {spacings} from '../../Consts/spacings';
import InstaLogo from '../../assets/svg/instaLogo.svg';
import InstaLogoLight from '../../assets/svg/InstaLogoLight.svg';
import {dimensions} from '../../Consts/dimensions';
import {fontSizes} from '../../Consts/fontSizes';
import {styles} from './styles';
import AuthContext from '../../Contexts/AuthContext';
import {usersManager} from '../../ServicesDB/Users';
import {UserData} from '../../ServicesDB/Users/types';

interface Props
  extends NativeStackScreenProps<RootStackParamList, 'SwitchAccount'> {}
export const SwitchAccount = ({navigation}: Props) => {
  const theme = useTheme();
  const colorScheme = useColorScheme();
  const {width} = useWindowDimensions();
  const {signInWithId, isLoading, savedAccounts} = useContext(AuthContext);
  const [user, setUser] = useState<UserData | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null)

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await usersManager.get(savedAccounts[0]);
        setUser(user);
        setSelectedId(savedAccounts[0])
      } catch (error) {
        console.error('Error en useEffect switchAccount: ', error);
      }
    };

    if (savedAccounts.length > 0) getUser();
  }, []);

  const onSubmit = async (id: string) => {
    try {
      await signInWithId(id);
    } catch (error) {
      console.log('Error en onSubmitLogin: ', error);
    }
  };

  return (
    <SafeAreaView
      style={{...styles.safeArea, backgroundColor: theme.colors.background}}>
      <View style={styles.container}>
        <View style={{flex: 5, justifyContent: 'center'}}>
          <View style={styles.logoContainer}>
            {colorScheme == 'light' ? (
              <InstaLogo
                width={width <= dimensions.medium.width ? 150 : 200}
                height={100}
              />
            ) : (
              <InstaLogoLight
                width={width <= dimensions.medium.width ? 150 : 200}
                height={100}
              />
            )}
          </View>
          <View style={styles.midContainer}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                gap: spacings.s1,
              }}>
              {user?.profilePicture ? (
                <Avatar.Image source={{uri: user?.profilePicture}} size={80} />
              ) : (
                <Avatar.Icon icon={'loading'} size={80} />
              )}
              {user?.userName && (
                <Text
                  style={{
                    color: theme.colors.onBackground,
                    textAlign: 'center',
                    fontSize:
                      width <= dimensions.medium.width
                        ? fontSizes.vmmsmall
                        : fontSizes.vsmall,
                  }}>
                  {user?.userName}
                </Text>
              )}
            </View>
            <Button
              loading={isLoading}
              disabled={!selectedId}
              onPress={() => selectedId && onSubmit(selectedId)}
              contentStyle={{
                backgroundColor: theme.colors.primary,
              }}
              style={{borderRadius: spacings.s1}}
              labelStyle={{
                color: 'white',
                textAlign: 'center',
                fontSize:
                  width <= dimensions.medium.width
                    ? fontSizes.vmmsmall
                    : fontSizes.small,
              }}>
              Log in
            </Button>
            <TouchableOpacity style={styles.logInWithFacebook}>
              <Text
                style={{
                  color: theme.colors.primary,
                  textAlign: 'center',
                  fontSize:
                    width <= dimensions.medium.width
                      ? fontSizes.vmmsmall
                      : fontSizes.vsmall,
                }}>
                Switch accounts
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flex: 0.6,
          }}>
          <Divider style={{flex: 1, maxHeight: 0.5}} />
          <View style={{flex: 1, justifyContent: 'center'}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Signup')}
              style={styles.containerHAccount}>
              <Text
                style={{
                  color: theme.colors.secondary,
                  textAlign: 'center',
                  fontSize:
                    width <= dimensions.medium.width
                      ? fontSizes.vmmsmall
                      : fontSizes.vsmall,
                }}>
                Don't have an account?
              </Text>
              <Text
                style={{
                  color: theme.colors.onBackground,
                  textAlign: 'center',
                  fontWeight: '900',
                  fontSize:
                    width <= dimensions.medium.width
                      ? fontSizes.vmmsmall
                      : fontSizes.vsmall,
                }}>
                Sign up.
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
