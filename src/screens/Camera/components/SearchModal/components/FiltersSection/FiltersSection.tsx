import {Slider} from '@rneui/base';
import {Icon} from '@rneui/themed';
import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import colors from '../../../../../../assets/colors';
import {useIngredients} from '../../../../context/IngredientsContext';
import {healthTags} from '../../../../hooks/useFilters';

export default function FiltersSection() {
  const [sliderValue, setSliderValue] = useState(40);

  const {selectedTags, handleTagPress} = useIngredients();

  const handleSlideValueChange = (value: number) => {
    setSliderValue(Math.round(value));
  };
  return (
    <View style={{flex: 1}}>
      <Text
        style={{
          fontSize: 20,
          marginBottom: 45,
          color: colors.primary,
          fontWeight: 'bold',
        }}>
        Filtros
      </Text>
      <View style={{flexDirection: 'row'}}>
        <Text style={{alignItems: 'center', fontSize: 18}}>
          Tiempo de cocción:{' '}
          <Text style={{color: colors.primary, fontWeight: '800'}}>
            {sliderValue}{' '}
          </Text>
          minutos
        </Text>

        <Icon name="md-stopwatch-outline" type="ionicon" />
      </View>
      <Slider
        minimumValue={0}
        maximumValue={200}
        value={sliderValue}
        onValueChange={handleSlideValueChange}
        thumbStyle={{
          width: 20,
          height: 20,
          backgroundColor: colors.primary,
        }}
        minimumTrackTintColor={colors.primary + '99'}
      />
      <Text style={{marginBottom: 15, fontSize: 18, marginTop: 45}}>
        Categorias
      </Text>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {healthTags.map(tag => (
          <TouchableOpacity
            key={tag.id}
            onPress={() => handleTagPress(tag)}
            style={{
              backgroundColor: selectedTags.some(t => t.id === tag.id)
                ? colors.primary
                : colors.white,
              borderRadius: 10,
              borderColor: colors.primary,
              borderWidth: 1,
              marginRight: 20,
              paddingVertical: 5,
              paddingHorizontal: 10,
              marginBottom: 15,
            }}>
            <Text
              style={{
                color: selectedTags.some(t => t.id === tag.id)
                  ? colors.white
                  : colors.primary,
                fontSize: 16,
              }}>
              {tag.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
