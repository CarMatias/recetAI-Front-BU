import {Icon} from '@rneui/themed';
import React, {useMemo, useRef, useState} from 'react';
import {Animated, Modal, TouchableOpacity, View} from 'react-native';
import colors from '../../../../assets/colors';
import {Ingredient} from '../../../../schemas/Ingredient';
import {FiltersSection} from './components/FiltersSection';
import IngredientsSection from './components/IngredientsSection/IngredientsSection';

type Props = {
  ingredients: (Ingredient & {locked: boolean})[];
  visible: boolean;
  onRequestClose: () => void;
  onIngredientAdd: (ingredient: Ingredient) => void;
  onIngredientRemove: (ingredient: Ingredient) => void;
  onSubmit: (ingredients: Ingredient[]) => void;
  onIngredientLock: (ingredient: Ingredient) => void;
  setVisible: (visible: boolean) => void;
};

const RecognizedIngredientsModal = ({
  ingredients,
  onIngredientAdd,
  onIngredientLock,
  onIngredientRemove,
  onSubmit,
  setVisible,
  ...rest
}: Props) => {
  const [input, setInput] = useState('');

  const [sliderValue, setSliderValue] = useState(0);

  const [isInputSelected, setIsInputSelected] = useState(false);

  const [section, setSection] = useState<'ingredients' | 'filters'>(
    'ingredients',
  );

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const heightAnim = useRef(new Animated.Value(80)).current;
  const inputRange = [0, 100];
  const outputRange = ['0%', '100%'];
  const animatedHeight = heightAnim.interpolate({inputRange, outputRange});

  const handleSectionChange = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: false,
    }).start(() => {
      setSection(section === 'ingredients' ? 'filters' : 'ingredients');
      changeHeight();
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        delay: 100,
        useNativeDriver: false,
      }).start();
    });
  };

  const changeHeight = () => {
    Animated.timing(heightAnim, {
      toValue: section ? 80 : 45,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  const filteredIngredients = useMemo(
    () =>
      ingredients.filter(
        ingredient =>
          ingredient.confidence * 100 >= sliderValue || ingredient.locked,
      ),
    [sliderValue, ingredients],
  );

  const handleInputSubmit = () => {
    const ingredient = {
      name: input,
    };
    onIngredientAdd({...ingredient, confidence: 100});
    setInput('');
  };

  const handleSlideValueChange = (value: number) => {
    setSliderValue(value);
  };

  const handleIngredientsSubmit = () => {
    onSubmit(filteredIngredients);
  };

  const handleRequestClose = () => {
    if (section === 'filters') {
      handleSectionChange();
      return;
    }
    setVisible(false);
  };

  return (
    <Modal
      animationType="slide"
      {...rest}
      transparent
      onRequestClose={handleRequestClose}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#0009',
          flexDirection: 'column-reverse',
        }}>
        <Animated.View
          style={{
            bottom: 0,
            backgroundColor: 'white',
            padding: 25,
            height: animatedHeight,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            justifyContent: 'space-between',
          }}>
          <Animated.View style={{flex: 1, opacity: fadeAnim}}>
            {section === 'filters' ? (
              <FiltersSection />
            ) : (
              <IngredientsSection
                onIngredientLock={onIngredientLock}
                input={input}
                isInputSelected={isInputSelected}
                sliderValue={sliderValue}
                filteredIngredients={filteredIngredients}
                handleInputSubmit={handleInputSubmit}
                handleSlideValueChange={handleSlideValueChange}
                onIngredientRemove={onIngredientRemove}
                setInput={setInput}
                setIsInputSelected={setIsInputSelected}
              />
            )}
          </Animated.View>
          <View
            style={{
              flexDirection: 'row-reverse',
              alignItems: 'center',
              height: 75,
              marginBottom: 'auto',
            }}>
            <View
              style={{
                flexBasis: '33%',
                alignItems: 'flex-end',
              }}>
              <TouchableOpacity onPress={handleSectionChange}>
                <Icon
                  type="ionicon"
                  name="ios-filter"
                  size={48}
                  color={
                    section === 'filters' ? colors.primary : colors.lightGray
                  }
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexBasis: '33%',
              }}>
              <TouchableOpacity onPress={handleIngredientsSubmit}>
                <Icon
                  type="antdesign"
                  name="checkcircle"
                  size={48}
                  color={colors.primary}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default RecognizedIngredientsModal;
