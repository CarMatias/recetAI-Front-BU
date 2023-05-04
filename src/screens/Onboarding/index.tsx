import {View, FlatList, Dimensions} from 'react-native';
import React, {useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../Navigation/Navigator';
import {
  Onboarding1,
  Onboarding2,
  Onboarding3,
} from '../../components/ui/Backgrounds';
import {RoundedButton} from '../../components/ui/Buttons/RoundedButton';
import {PagingDots} from '../../components/ui/PagingDots';

import {useGlobalContext} from '../../components/ui/Splash/Splash';

const onboardingScreens = [Onboarding1, Onboarding2, Onboarding3] as const;

const height = Dimensions.get('window').height;

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

const OnboardingScreen = (props: Props) => {
  const [currentItem, setCurrentItem] = useState(0);
  const {toggleFirstUse} = useGlobalContext();
  const isFirst = currentItem === 0;
  const isLast = currentItem === onboardingScreens.length - 1;
  const onViewRef = React.useRef(viewableItems => {
    setCurrentItem(viewableItems.changed[0].index);
  });
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
    waitForInteraction: true,
    minimumViewTime: 5,
  });
  const flatListRef = useRef<FlatList>(null);

  const handleNext = async () => {
    if (isLast) {
      toggleFirstUse();
      return;
    }
    flatListRef.current?.scrollToIndex({
      index: currentItem + 1,
      animated: true,
    });
    setCurrentItem(curr => curr + 1);
  };
  const handlePrevious = async () => {
    if (isFirst) {
      toggleFirstUse();
      return;
    }
    flatListRef.current?.scrollToIndex({
      index: currentItem - 1,
      animated: true,
    });
    setCurrentItem(curr => curr - 1);
  };

  console.log(currentItem);

  return (
    <>
      <FlatList
        ref={flatListRef}
        data={onboardingScreens}
        renderItem={({item}) => <View>{item()}</View>}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        viewabilityConfig={viewabilityConfig.current}
        onViewableItemsChanged={onViewRef.current}
      />
      <View
        style={{
          position: 'absolute',
          height: height / 5,
          width: '100%',
          bottom: 20,
          justifyContent: 'space-evenly',
        }}>
        <PagingDots
          currentIndex={currentItem}
          numberOfDots={onboardingScreens.length}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <RoundedButton
            text={currentItem === 0 ? 'Omitir' : 'Atrás'}
            variant="secondary"
            onPress={handlePrevious}
            containerStyle={{width: 150, alignItems: 'center'}}
          />
          <RoundedButton
            text={
              currentItem === onboardingScreens.length - 1
                ? 'Finalizar'
                : 'Siguiente'
            }
            variant="primary"
            onPress={handleNext}
            containerStyle={{
              width: 150,
              alignItems: 'center',
            }}
          />
        </View>
      </View>
    </>
  );
};

export default OnboardingScreen;
