import {useEffect, useState} from 'react';
import {Camera} from 'react-native-vision-camera';

export default function useCameraPermission() {
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  return {hasPermission};
}
