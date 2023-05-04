import {View, Modal} from 'react-native';
import React from 'react';
import Lottie from 'lottie-react-native';

interface Props {
  color?: string;
}

const FullScreenLoader = ({
  text = 'Reconociendo ingredientes...',
  color = 'rgba(0,0,0,0.1)',
}: Props) => {
  return (
    <Modal animationType="fade" transparent>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: color,
        }}>
        <View style={{flex: 2, justifyContent: 'center'}}>
          <Lottie
            style={{width: 200, height: 200}}
            source={require('../../../assets/animations/book-loader.json')}
            autoPlay
            speed={1.75}
            loop
          />
        </View>
      </View>
    </Modal>
  );
};

export default FullScreenLoader;
