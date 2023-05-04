import React, {useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet} from 'react-native';
import {
  initialize,
  InitialSettings,
  setIsFirstUseToStorage,
} from '../../../configs/initialize';
import {User} from '../../providers/AuthProvider';
import {Backgrounds} from '../Backgrounds';

const GlobalContext = React.createContext(
  {} as InitialSettings & {toggleFirstUse: () => void},
);

export const useGlobalContext = () => {
  const context = React.useContext(GlobalContext);
  if (!context) {
    throw new Error(
      'useGlobalContext must be used within a GlobalContextProvider',
    );
  }
  return context;
};

export function WithSplashScreen({children}: {children: React.ReactNode}) {
  const user = useRef<User | null>(null);

  const [state, setState] = useState({
    isAppReady: false,
    isFirstUse: true,
  });
  useEffect(() => {
    initialize().then(values => {
      user.current = values.user;

      console.log('🚀 ~ file: App.tsx ~ line 27 ~ initialize ~ values', values);
      setState({
        isAppReady: true,
        isFirstUse: values.isFirstUse,
      });
    });
  }, []);

  const toggleFirstUse = () => {
    setIsFirstUseToStorage();
    setState(curr => ({...curr, isFirstUse: false}));
  };
  return (
    <GlobalContext.Provider
      value={{
        user: user.current,
        isFirstUse: state.isFirstUse,
        toggleFirstUse,
      }}>
      {state.isAppReady && children}
      <Splash isAppReady={state.isAppReady} />
    </GlobalContext.Provider>
  );
}

const LOADING_IMAGE = 'Loading image';
const FADE_IN_IMAGE = 'Fade in image';
const WAIT_FOR_APP_TO_BE_READY = 'Wait for app to be ready';
const FADE_OUT = 'Fade out';
const HIDDEN = 'Hidden';

export const Splash = ({isAppReady}: {isAppReady: boolean}) => {
  const containerOpacity = useRef(new Animated.Value(1)).current;
  const imageOpacity = useRef(new Animated.Value(0)).current;

  const [state, setState] = useState<
    | typeof LOADING_IMAGE
    | typeof FADE_IN_IMAGE
    | typeof WAIT_FOR_APP_TO_BE_READY
    | typeof FADE_OUT
    | typeof HIDDEN
  >(WAIT_FOR_APP_TO_BE_READY);

  useEffect(() => {
    if (state === FADE_IN_IMAGE) {
      Animated.timing(imageOpacity, {
        toValue: 1,
        duration: 1000, // Fade in duration
        useNativeDriver: true,
      }).start(() => {
        setState(WAIT_FOR_APP_TO_BE_READY);
      });
    }
  }, [imageOpacity, state]);

  useEffect(() => {
    if (state === WAIT_FOR_APP_TO_BE_READY) {
      if (isAppReady) {
        setState(FADE_OUT);
      }
    }
  }, [isAppReady, state]);

  useEffect(() => {
    if (state === FADE_OUT) {
      Animated.timing(containerOpacity, {
        toValue: 0,
        duration: 1000, // Fade out duration
        delay: 1000, // Minimum time the logo will stay visible
        useNativeDriver: true,
      }).start(() => {
        setState(HIDDEN);
      });
    }
  }, [containerOpacity, state]);

  if (state === HIDDEN) return null;

  return (
    <Animated.View
      collapsable={false}
      style={[style.container, {opacity: containerOpacity}]}>
      <Backgrounds />
    </Animated.View>
  );
};

const style = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#E0B9BB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 250,
    height: 250,
  },
});
