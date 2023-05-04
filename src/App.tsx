import React from 'react';
import AuthProvider from './components/providers/AuthProvider';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Navigator from './Navigation/Navigator';
import {WithSplashScreen} from './components/ui/Splash/Splash';
import PushNotification from 'react-native-push-notification';
import {Platform, PushNotificationIOS} from 'react-native';

PushNotification.configure({
  requestPermissions: Platform.OS === 'ios',

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);
    // (required) Called when a remote is received or opened, or local notification is opened
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },
});

PushNotification.createChannel(
  {
    channelId: 'DemoAppID', // (required)
    channelName: 'DemoApp', // (required)
  },
  created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
);

const App = () => {
  return (
    <WithSplashScreen>
      <GestureHandlerRootView style={{flex: 1}}>
        <AuthProvider>
          <Navigator />
        </AuthProvider>
      </GestureHandlerRootView>
    </WithSplashScreen>
  );
};

export default App;
