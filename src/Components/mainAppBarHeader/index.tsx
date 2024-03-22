import React from 'react';
import {Appbar, Button, TextInput, useTheme} from 'react-native-paper';

export type Props = {
  onBack?: () => void;
};

export const MainAppBarHeader = ({onBack}: Props) => {
  const theme = useTheme();
  return (
    <Appbar.Header style={{backgroundColor: theme.colors.background}}>
      {onBack && <Appbar.BackAction onPress={onBack} />}
    </Appbar.Header>
  );
};
