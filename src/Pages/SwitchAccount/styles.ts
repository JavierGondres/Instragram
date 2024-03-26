import {StyleSheet} from 'react-native';
import {spacings} from '../../Consts/spacings';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  container: {paddingHorizontal: spacings.s22, flex: 1},

  logoContainer: {
    // flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  body: {flex: 6, gap: spacings.s2},

  passwordBtn: {alignSelf: 'flex-end'},

  midContainer: {marginTop: spacings.s2, gap: spacings.s20},

  logInWithFacebook: {
    flexDirection: 'row',
    gap: spacings.s0,
    alignItems: 'center',
    alignSelf: 'center',
  },

  faceBookIcon: {paddingHorizontal: spacings.s0, paddingTop: spacings.s0 - 2},

  OR: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacings.s22,
  },

  containerHAccount: {
    flexDirection: 'row',
    alignSelf: 'center',
    gap: spacings.s0,
  },
});
