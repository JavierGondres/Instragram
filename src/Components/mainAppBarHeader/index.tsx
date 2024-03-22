import React from 'react';
import {Appbar, Button, TextInput, useTheme} from 'react-native-paper';
import {spacings} from '../../Consts/spacings';

export type Props = {
  onBack?: () => void;
};

export const MainAppBarHeader = ({onBack}: Props) => {
  const theme = useTheme();
  return (
    <Appbar.Header
      style={{
        backgroundColor: theme.colors.background,
        paddingTop: spacings.s22,
        height: 20,
        alignItems: 'center',
      }}>
      {onBack && <Appbar.BackAction onPress={onBack} />}
    </Appbar.Header>
  );
};
