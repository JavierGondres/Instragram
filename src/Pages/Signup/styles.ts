import {StyleSheet} from 'react-native';
import {spacings} from '../../Consts/spacings';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  container: {paddingHorizontal: spacings.s22, flex: 1, gap: spacings.s22},

  logoContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  body: {flex: 6, gap: spacings.s22, paddingHorizontal: spacings.s22},

  midContainer: {marginTop: spacings.s2, gap: spacings.s30},

  logInWithFacebook: {
    flexDirection: 'row',
    gap: spacings.s0,
    alignItems: 'center',
    alignSelf: 'center',
  },
});
