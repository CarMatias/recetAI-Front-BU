import {Icon, Image} from '@rneui/themed';
import React from 'react';
import {
  Dimensions,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../../../../assets/colors';

type Props = {
  photo: string | null;
  onCancel: () => void;
  onSubmit: () => void;
};

export default function PhotoView({photo, onCancel, onSubmit}: Props) {
  return (
    <Modal
      visible={photo !== null}
      animationType="fade"
      onRequestClose={onCancel}>
      <View style={{position: 'absolute'}}>
        <Image source={{uri: `file://${photo}`}} style={styles.image} />
      </View>
      <View style={{flex: 1, justifyContent: 'flex-end', zIndex: 10}}>
        <View
          style={{
            flexDirection: 'row',
            height: 150,
            backgroundColor: '#0009',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={onCancel}>
            <Icon
              name="closecircleo"
              type="antdesign"
              size={64}
              color={colors.danger}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onSubmit}>
            <Icon
              name="checkcircleo"
              type="antdesign"
              size={64}
              color={colors.success}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
});
