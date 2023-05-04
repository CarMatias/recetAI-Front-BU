import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {BackHandler} from 'react-native';

export default function useWebView() {
  const [webViewOpened, setWebViewOpened] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (webViewOpened) {
          setWebViewOpened(false);
          return true;
        }
        return false;
      },
    );
    return () => backHandler.remove();
  }, [webViewOpened]);

  return {
    webViewOpened,
    setWebViewOpened,
  };
}
