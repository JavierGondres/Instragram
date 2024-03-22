import React, {useState} from 'react';
import {Image, Pressable, TouchableOpacity, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {ImageType, ProfilePictureProps} from './types';
import {Avatar, useTheme} from 'react-native-paper';
import {globalStyles} from '../../Consts/globalStyles';

export const ProfilePicture = ({
  onUpload,
  initialState,
}: ProfilePictureProps) => {
  const [selectedImage, setSelectedImage] = useState(initialState || '');
  const options = {
    mediaType: 'photo',
    title: 'Seleccionar imagen',
    maxWidth: 2000,
    maxHeight: 2000,
    quality: 0.8,
  };
  const theme = useTheme();
  const handleSelectPhoto = async () => {
    try {
      const result = (await launchImageLibrary(options as any)) as {
        assets: ImageType[];
      };

      setSelectedImage(result.assets[0].uri);
      console.log(result.assets[0].uri);

      // Llama la función onUpload para pasar la imagen al componente padre
      onUpload(result.assets[0].uri);
    } catch (error) {
      // Manejar errores de carga de imagen
      console.log('Error al cargar la imagen:', error);
    }
  };

  return (
    <TouchableOpacity
      onPress={handleSelectPhoto}
      style={{
        alignSelf: 'center',
        backgroundColor: theme.colors.background,
        borderRadius: 100,
        ...globalStyles.shadow,
        shadowColor: theme.colors.shadow,
      }}>
      <Avatar.Image
        size={100}
        source={
          selectedImage
            ? {uri: selectedImage}
            : require('../../assets/images/profile-picture-placeholder.png')
        }
      />
    </TouchableOpacity>
  );
};
