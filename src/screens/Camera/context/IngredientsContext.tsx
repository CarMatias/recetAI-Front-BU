import React, {createContext} from 'react';
import {Ingredient} from '../../../schemas/Ingredient';
import useFilters from '../hooks/useFilters';
import useGetIngredients from '../hooks/useGetIngredients';

type Props = {
  children: React.ReactNode;
};

type IngredientsContextType = {
  ingredients: (Ingredient & {locked: boolean})[];
} & ReturnType<typeof useGetIngredients> &
  ReturnType<typeof useFilters>;

const IngredientsContext = createContext({} as IngredientsContextType);

const IngredientsProvider = ({children}: Props) => {
  const ingredientValues = useGetIngredients();
  const filterValues = useFilters();
  return (
    <IngredientsContext.Provider value={{...ingredientValues, ...filterValues}}>
      {children}
    </IngredientsContext.Provider>
  );
};

export default IngredientsProvider;

export const WithIngredientsProvider =
  (Component: React.ElementType) => (props: any) =>
    (
      <IngredientsProvider>
        <Component {...props} />
      </IngredientsProvider>
    );

export const useIngredients = () => {
  const context = React.useContext(IngredientsContext);
  if (context === undefined) {
    throw new Error('useIngredients must be used within a IngredientsProvider');
  }
  return context;
};
