import {useState} from 'react';

type Tag = {name: string; id: number; label: string};

export const healthTags: {name: string; id: number; label: string}[] = [
  {name: 'egg-free', id: 1, label: 'Sin huevos'},
  {name: 'fish-free', id: 2, label: 'Sin pescado'},
  {name: 'low-sugar', id: 3, label: 'Bajo en azucar'},
  {name: 'red-meat-free', id: 4, label: 'Sin carne roja'},
  {name: 'vegetarian', id: 5, label: 'Vegetariano'},
  {name: 'vegan', id: 6, label: 'Vegano'},
  {name: 'wheat-free', id: 7, label: 'Sin trigo'},
];

const dietTags: {name: string; id: number; label: string}[] = [
  {name: 'balanced', id: 1, label: 'Categoria 1'},
  {name: 'high-fiber', id: 1, label: 'Categoria 1'},
  {name: 'high-protein', id: 1, label: 'Categoria 1'},
  {name: 'low-carb', id: 1, label: 'Categoria 1'},
  {name: 'low-fat', id: 1, label: 'Categoria 1'},
  {name: 'low-sodium', id: 1, label: 'Categoria 1'},
];

export default function useFilters() {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const [timeToCook, setTimeToCook] = useState<null | number>(null);

  const handleTagPress = (tag: Tag) => {
    if (selectedTags.find(t => t.id === tag.id)) {
      setSelectedTags(prev => prev.filter(t => t.id !== tag.id));
    } else {
      setSelectedTags(prev => [...prev, tag]);
    }
  };

  const handleTimeToCookChange = (value: number) => {
    setTimeToCook(Math.round(value));
  };

  return {
    selectedTags,
    timeToCook,
    handleTagPress,
    handleTimeToCookChange,
  };
}
