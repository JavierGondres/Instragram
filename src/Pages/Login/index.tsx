import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useContext, useEffect} from 'react';
import {RootStackParamList} from '../App/types';
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  useColorScheme,
  useWindowDimensions,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/FontAwesome';
import {useTheme, Text, TextInput, Button, Divider} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import {spacings} from '../../Consts/spacings';
import InstaLogo from '../../assets/svg/instaLogo.svg';
import InstaLogoLight from '../../assets/svg/InstaLogoLight.svg';
import {loginSchema} from './schema';
import {yupResolver} from '@hookform/resolvers/yup';
import {dimensions} from '../../Consts/dimensions';
import {fontSizes} from '../../Consts/fontSizes';
import {styles} from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AuthContext from '../../Contexts/AuthContext';

interface Props extends NativeStackScreenProps<RootStackParamList, 'Login'> {}
export const Login = ({navigation}: Props) => {
  const theme = useTheme();
  const colorScheme = useColorScheme();
  const {width} = useWindowDimensions();
  const {signIn, isLoading} = useContext(AuthContext);

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (email: string, password: string) => {
    try {
      await signIn(email, password);
    } catch (error) {
      console.log('Error en onSubmitLogin: ', error);
    }
  };

  return (
    <SafeAreaView
      style={{...styles.safeArea, backgroundColor: theme.colors.background}}>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
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
        <View style={styles.body}>
          <View>
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  mode="outlined"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Email"
                  error={errors.email ? true : false}
                  contentStyle={{
                    justifyContent: 'center',
                    fontSize:
                      width <= dimensions.medium.width
                        ? fontSizes.vmmsmall
                        : fontSizes.small,
                  }}
                  style={{
                    backgroundColor:
                      colorScheme === 'light' ? '#FAFAFA' : '#121212',
                    height: width <= dimensions.medium.width ? 35 : 50,
                  }}
                />
              )}
              name="email"
            />
            {errors.email && (
              <Text
                variant={
                  width <= dimensions.medium.width ? 'bodySmall' : 'labelLarge'
                }
                style={{color: theme.colors.error}}>
                {errors.email.message}
              </Text>
            )}
          </View>
          <View>
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  mode="outlined"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Password"
                  error={errors.password ? true : false}
                  contentStyle={{
                    justifyContent: 'center',
                    fontSize:
                      width <= dimensions.medium.width
                        ? fontSizes.vmmsmall
                        : fontSizes.small,
                  }}
                  style={{
                    backgroundColor:
                      colorScheme === 'light' ? '#FAFAFA' : '#121212',
                    height: width <= dimensions.medium.width ? 35 : 50,
                  }}
                />
              )}
              name="password"
            />
            {errors.password && (
              <Text
                variant={
                  width <= dimensions.medium.width ? 'bodySmall' : 'labelLarge'
                }
                style={{color: theme.colors.error}}>
                {errors.password.message}
              </Text>
            )}
          </View>
          <TouchableOpacity style={styles.passwordBtn}>
            <Text
              style={{
                color: theme.colors.primary,
                fontSize:
                  width <= dimensions.medium.width
                    ? fontSizes.vmmsmall
                    : fontSizes.vsmall,
              }}>
              Forgot password?
            </Text>
          </TouchableOpacity>

          <View style={styles.midContainer}>
            <Button
              loading={isLoading}
              onPress={handleSubmit(
                async (data: {email: string; password: string}) =>
                  await onSubmit(data.email, data.password),
              )}
              contentStyle={{
                backgroundColor: theme.colors.primary,
                // opacity: !isValid ? 0.5 : 1,
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
              <View
                style={{
                  ...styles.faceBookIcon,
                  backgroundColor: theme.colors.primary,
                }}>
                <FeatherIcon
                  name="facebook"
                  size={15}
                  color={theme.colors.background}
                />
              </View>
              <Text
                style={{
                  color: theme.colors.primary,
                  textAlign: 'center',
                  fontSize:
                    width <= dimensions.medium.width
                      ? fontSizes.vmmsmall
                      : fontSizes.vsmall,
                }}>
                Log in with Facebook
              </Text>
            </TouchableOpacity>
            <View style={styles.OR}>
              <Divider style={{flex: 0.5}} />
              <Text
                style={{
                  color: theme.colors.primary,
                  textAlign: 'center',
                  fontSize:
                    width <= dimensions.medium.width
                      ? fontSizes.vmmsmall
                      : fontSizes.vsmall,
                }}>
                OR
              </Text>
              <Divider style={{flex: 0.5}} />
            </View>
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
                  color: theme.colors.primary,
                  textAlign: 'center',
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
        <View
          style={{
            flex: 1,
          }}>
          <Divider style={{flex: 1, maxHeight: 0.5}} />
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text
              style={{
                color: theme.colors.secondary,
                textAlign: 'center',
                fontSize:
                  width <= dimensions.medium.width
                    ? fontSizes.vmmsmall
                    : fontSizes.vsmall,
              }}>
              Instagram OT Facebook
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
