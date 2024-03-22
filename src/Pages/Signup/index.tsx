import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
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

interface Props extends NativeStackScreenProps<RootStackParamList, 'Signup'> {}
export const Signup = ({navigation}: Props) => {
  const theme = useTheme();
  const colorScheme = useColorScheme();
  const {width} = useWindowDimensions();
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      fullName: '',
      userName: '',
      password: '',
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
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
            <TouchableOpacity style={{alignSelf: 'center'}}>
              <Avatar.Icon size={100} icon="folder" />
            </TouchableOpacity>
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
                <Text variant="labelLarge" style={{color: theme.colors.error}}>
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
                <Text variant="labelLarge" style={{color: theme.colors.error}}>
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
                <Text variant="labelLarge" style={{color: theme.colors.error}}>
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
                <Text variant="labelLarge" style={{color: theme.colors.error}}>
                  {errors.password.message}
                </Text>
              )}
            </View>

            <Button
              disabled={!isValid}
              onPress={handleSubmit(onSubmit)}
              contentStyle={{
                backgroundColor: theme.colors.primary,
                opacity: !isValid ? 0.5 : 1,
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
