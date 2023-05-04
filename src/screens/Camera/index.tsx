import {SafeAreaView, StyleSheet} from 'react-native';
import React, {useRef, useState} from 'react';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {useIsFocused} from '@react-navigation/native';
import BottomControls from './components/BottomControls';
import PhotoView from './components/PhotoView';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../Navigation/Navigator';
import RNFS from 'react-native-fs';
import FullScreenLoader from '../../components/ui/FullScreenLoader';
import RecognizedIngredientsModal from './components/SearchModal';
import useGetIngredients from './hooks/useGetIngredients';
import useCameraPermission from '../../hooks/useCameraPermission';
import {deleteFile} from '../../utils/functions';
import {launchImageLibrary} from 'react-native-image-picker';
import {
  useIngredients,
  WithIngredientsProvider,
} from './context/IngredientsContext';

type CameraScreenProps = NativeStackScreenProps<RootStackParamList, 'Camera'>;

const CameraScreen = ({navigation}: CameraScreenProps) => {
  const {hasPermission} = useCameraPermission();
  const [photo, setPhoto] = useState<string | null>(null);
  const {
    ingredients,
    addIngredient,
    getIngredients,
    removeIngredient,
    clearIngredients,
    error,
    toggleLockIngredient,
    selectedTags,
    isLoading,
    timeToCook,
  } = useIngredients();

  const {back: device} = useCameraDevices();

  const camera = useRef<Camera>(null);

  const isFocused = useIsFocused();

  const handleShootPress = async () => {
    if (camera.current) {
      const photoRes = await camera.current.takePhoto({
        qualityPrioritization: 'quality',
      });
      setPhoto(photoRes.path);
    }
  };

  const handleGalleryPress = async () => {
    const res = await launchImageLibrary({mediaType: 'photo'});
    if (res.assets && res.assets[0]) {
      setPhoto(res.assets[0].uri!.replace('file://', ''));
    }
  };

  const handlePhotoSubmit = async () => {
    const photoPath = photo;
    await RNFS.readFile(photoPath as string, 'base64').then(res => {
      getIngredients(res);
    });

    setPhoto(null);
    await deleteFile(photoPath as string);
  };

  const handlePhotoCancel = async () => {
    await deleteFile(photo as string);
    setPhoto(null);
  };

  const handleSearchSubmit = ingredients =>
    navigation.navigate('App', {
      screen: 'ResultsNavigator',
      params: {
        screen: 'Results',
        params: {
          ingredients: ingredients.map(ingredient => ingredient.name),
          filters: {
            tags: selectedTags.map(tag => tag.name),
            timeToCook,
          },
        },
      },
    });

  if (device != null && hasPermission) {
    return (
      <SafeAreaView style={styles.container}>
        <Camera
          ref={camera}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={isFocused}
          photo={true}
        />
        <BottomControls
          onShootPress={handleShootPress}
          onGalleryPress={handleGalleryPress}
        />

        <PhotoView
          photo={photo}
          onSubmit={handlePhotoSubmit}
          onCancel={handlePhotoCancel}
        />
        {isLoading && <FullScreenLoader />}
        <RecognizedIngredientsModal
          visible={ingredients.length > 0}
          ingredients={ingredients}
          setVisible={clearIngredients}
          onIngredientAdd={addIngredient}
          onIngredientRemove={removeIngredient}
          onRequestClose={clearIngredients}
          onIngredientLock={toggleLockIngredient}
          onSubmit={handleSearchSubmit}
        />
      </SafeAreaView>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WithIngredientsProvider(CameraScreen);
