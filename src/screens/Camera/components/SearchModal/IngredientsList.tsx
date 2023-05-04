import {View, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import {Ingredient} from '../../../../schemas/Ingredient';
import colors from '../../../../assets/colors';
import {Icon} from '@rneui/themed';
import Text from '../../../../components/ui/Text';

type Props = {
  ingredients: (Ingredient & {locked: boolean})[];
  onIngredientRemove: (ingredient: Ingredient) => void;
  onIngredientLock: (ingredient: Ingredient) => void;
};

const IngredientsList = ({
  ingredients,
  onIngredientRemove,
  onIngredientLock,
}: Props) => {
  console.log('rendering ingredients list');
  return (
    <FlatList
      data={ingredients}
      keyExtractor={item => item.name}
      showsVerticalScrollIndicator={false}
      renderItem={({item}) => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomColor: colors.lightGray,
            borderBottomWidth: 1,
            paddingVertical: 10,
          }}>
          <Icon name="fast-food" type="ionicon" color={colors.primary} />
          <Text style={{marginLeft: 15}}>{item.name}</Text>
          <TouchableOpacity onPress={() => onIngredientLock(item)}>
            <Icon
              name={item.locked ? 'lock-closed' : 'lock-open-outline'}
              type="ionicon"
              color={colors.primary}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginLeft: 'auto'}}
            onPress={() => onIngredientRemove(item)}>
            <Icon type="antdesign" name="closecircle" color={colors.danger} />
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

export default React.memo(IngredientsList);
