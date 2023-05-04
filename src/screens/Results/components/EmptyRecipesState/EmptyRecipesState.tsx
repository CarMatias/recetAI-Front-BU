import {Image} from '@rneui/themed';
import React from 'react';
import {Dimensions, View} from 'react-native';
import TextButton from '../../../../components/ui/Buttons/TextButton';
import Text from '../../../../components/ui/Text';
export interface EmptyRecipesStateInterface {
  goToCamera: () => void;
}

const height = Dimensions.get('window').height;

const EmptyRecipesState: React.FC<EmptyRecipesStateInterface> = ({
  goToCamera,
}) => {
  return (
    <View
      style={{
        alignItems: 'center',
        marginTop: height * 0.15,
        flex: 1,
      }}>
      <Image
        source={require('../../../../assets/images/notFood.png')}
        style={{
          width: 200,
          height: 200,
        }}
      />
      <View style={{marginTop: 40}}>
        <Text style={{marginBottom: 5}}>
          Los ingredientes no fueron cargados,{' '}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 5,
          }}>
          <TextButton text="Presiona aca" onPress={goToCamera} />
          <Text> para cargarlos</Text>
        </View>
        <Text>o hacelo desde el botón de la barra inferior</Text>
      </View>
    </View>
  );
};

export default EmptyRecipesState;
