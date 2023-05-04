import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {Icon} from '@rneui/themed';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../assets/colors';
import TabCamera from './components/TabCamera';
import {APP_ROUTES} from './Navigator';

export default function MyTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const splitIndex = Math.ceil(state.routes.length / 2);
  console.log(
    '🚀 ~ file: AppTabNavigator.tsx ~ line 13 ~ splitIndex',
    splitIndex,
  );

  return (
    <View style={styles.tabContainer}>
      <TabCamera />
      {state.routes
        .filter(r => r.name !== APP_ROUTES.CAMERA)
        .map((route, index) => {
          const {options} = descriptors[route.key];
          const label = (
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name
          ) as string;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({name: route.name, merge: true});
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              style={{
                marginRight: index === 1 ? 75 : 0,
                padding: 15,
              }}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              key={label}>
              <>
                <Icon
                  name={mapLabelToIcon(label)}
                  type="antdesign"
                  color={isFocused ? colors.primary : '#222'}
                />
                {console.log(index < splitIndex, index)}
                {/* <Text style={{color: isFocused ? colors.primary : '#222'}}>
                {label}
              </Text> */}
                <View
                  style={{
                    ...styles.dots,
                    backgroundColor: isFocused ? colors.primary : 'transparent',
                  }}
                />
              </>
            </TouchableOpacity>
          );
        })}
    </View>
  );
}

const mapLabelToIcon = (label: typeof APP_ROUTES[keyof typeof APP_ROUTES]) => {
  switch (label) {
    case 'HomeNavigator':
      return 'home';
    case 'Profile':
      return 'user';
    case 'ResultsNavigator':
      return 'bars';
    case 'Saved':
      return 'book';
    default:
      return 'home';
  }
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    elevation: 20,

    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  dots: {
    width: 7.5,
    height: 7.5,
    borderRadius: 1000,
    alignSelf: 'center',
    marginTop: 5,
  },
});
