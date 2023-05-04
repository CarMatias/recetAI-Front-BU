import {View, Text} from 'react-native';
import React from 'react';
import {Input, Slider} from '@rneui/themed';
import IngredientsList from '../../IngredientsList';
import {Ingredient} from '../../../../../../schemas/Ingredient';
import colors from '../../../../../../assets/colors';

type Props = {
  sliderValue: number;
  input: string;
  isInputSelected: boolean;
  filteredIngredients: (Ingredient & {locked: boolean})[];
  handleSlideValueChange: (value: number) => void;
  handleInputSubmit: () => void;
  setInput: (value: string) => void;
  setIsInputSelected: (value: boolean) => void;
  onIngredientRemove: (ingredient: Ingredient) => void;
  onIngredientLock: (ingredient: Ingredient) => void;
};

const IngredientsSection = ({
  sliderValue,
  filteredIngredients,
  input,
  isInputSelected,
  onIngredientLock,
  handleInputSubmit,
  handleSlideValueChange,
  onIngredientRemove,
  setInput,
  setIsInputSelected,
}: Props) => {
  const handleTextChange = (value: string) => {
    if (!value.includes(',')) {
      setInput(value);
      return;
    }
    handleInputSubmit();
    setInput('');
  };
  return (
    <>
      <Text
        style={{
          fontSize: 20,
          marginBottom: 20,
          color: colors.primary,
          fontWeight: 'bold',
        }}>
        Ingredientes reconocidos
      </Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{flex: 1, fontSize: 16}}>Precision:</Text>
        <View style={{flex: 3}}>
          <Slider
            minimumValue={0}
            maximumValue={100}
            value={sliderValue}
            onValueChange={handleSlideValueChange}
            thumbStyle={{
              width: 20,
              height: 20,
              backgroundColor: colors.primary,
            }}
            minimumTrackTintColor={colors.primary + '99'}
          />
        </View>
      </View>
      <Input
        placeholder="Agregar ingrediente"
        onSubmitEditing={handleInputSubmit}
        value={input}
        onChangeText={handleTextChange}
        onFocus={() => setIsInputSelected(true)}
        onBlur={() => setIsInputSelected(false)}
        inputContainerStyle={{
          borderBottomColor: isInputSelected
            ? colors.primary
            : colors.lightGray,
          borderBottomWidth: isInputSelected ? 2 : 1,
        }}
      />
      <IngredientsList
        ingredients={filteredIngredients}
        onIngredientRemove={onIngredientRemove}
        onIngredientLock={onIngredientLock}
      />
    </>
  );
};

export default IngredientsSection;
