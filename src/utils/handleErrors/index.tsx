import { Alert } from "react-native";

export const handleError = (customMessage?: string) => {
  const errorMessage =
    customMessage ||
    'Hubo un error durante la autenticación. Por favor, inténtalo de nuevo.';
  Alert.alert('Error', errorMessage);
};
