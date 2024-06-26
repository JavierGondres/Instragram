import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useContext, useState} from 'react';
import {RootStackParamList} from '../App/types';
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  useColorScheme,
  useWindowDimensions,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/FontAwesome';
import {useTheme, Text, TextInput, Button, Avatar} from 'react-native-paper';
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
import {ProfilePicture} from '../../Components/ProfilePicture';
import AuthContext from '../../Contexts/AuthContext';

export type FormValues = {
  email: string;
  fullName: string;
  userName: string;
  password: string;
};

interface Props extends NativeStackScreenProps<RootStackParamList, 'Signup'> {}
export const Signup = ({navigation}: Props) => {
  const theme = useTheme();
  const colorScheme = useColorScheme();
  const {width} = useWindowDimensions();
  const {signUp, isLoading} = useContext(AuthContext);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      fullName: '',
      userName: '',
      password: '',
    } as FormValues,
  });

  const onSubmit = async ({
    email,
    fullName,
    password,
    userName,
  }: FormValues) => {
    try {
      await signUp({email, fullName, password, profilePicture, userName});
    } catch (error) {
      console.error('Error in onSubmit from signup: ', error);
    }
  };

  return (
    <SafeAreaView
      style={{...styles.safeArea, backgroundColor: theme.colors.background}}>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
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
            <Text
              variant={
                width <= dimensions.medium.width ? 'titleSmall' : 'titleLarge'
              }
              style={{textAlign: 'center'}}>
              Sign up to see photos and videos from your friends
            </Text>
          </View>
          <View style={styles.body}>
            <ProfilePicture
              onUpload={imageUri => setProfilePicture(imageUri)}
            />
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
                    placeholderTextColor={theme.colors.outline}
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
                    width <= dimensions.medium.width
                      ? 'bodySmall'
                      : 'labelLarge'
                  }
                  style={{color: theme.colors.error, marginTop: spacings.s1}}>
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
                    placeholder="FullName"
                    placeholderTextColor={theme.colors.outline}
                    error={errors.fullName ? true : false}
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
                name="fullName"
              />
              {errors.fullName && (
                <Text
                  variant={
                    width <= dimensions.medium.width
                      ? 'bodySmall'
                      : 'labelLarge'
                  }
                  style={{color: theme.colors.error, marginTop: spacings.s1}}>
                  {errors.fullName.message}
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
                    placeholder="userName"
                    placeholderTextColor={theme.colors.outline}
                    error={errors.userName ? true : false}
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
                name="userName"
              />
              {errors.userName && (
                <Text
                  variant={
                    width <= dimensions.medium.width
                      ? 'bodySmall'
                      : 'labelLarge'
                  }
                  style={{color: theme.colors.error, marginTop: spacings.s1}}>
                  {errors.userName.message}
                </Text>
              )}
            </View>
            <View style={{marginBottom: spacings.s20}}>
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    mode="outlined"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Password"
                    placeholderTextColor={theme.colors.outline}
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
                    width <= dimensions.medium.width
                      ? 'bodySmall'
                      : 'labelLarge'
                  }
                  style={{color: theme.colors.error, marginTop: spacings.s1}}>
                  {errors.password.message}
                </Text>
              )}
            </View>

            <Button
              loading={isLoading}
              // disabled={!isValid}
              onPress={handleSubmit(onSubmit)}
              contentStyle={{
                backgroundColor: theme.colors.primary,
                // opacity: !isValid ? 0.5 : 1,
              }}
              style={{borderRadius: spacings.s1, marginBottom: spacings.s2}}
              labelStyle={{
                color: 'white',
                textAlign: 'center',
                fontSize:
                  width <= dimensions.medium.width
                    ? fontSizes.vmmsmall
                    : fontSizes.small,
              }}>
              Sign up
            </Button>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
