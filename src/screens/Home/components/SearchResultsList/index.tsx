import {View, Text} from 'react-native';
import React from 'react';
import {ListItem} from '@rneui/base';

type Props = {
  data: {
    id: string;
    title: string;
  }[];
};

const SearchResultsList = ({data}: Props) => {
  return (
    <View>
      {data.map(d => (
        <ListItem key={d.id} bottomDivider>
          <ListItem.Content>
            <ListItem.Title>{d.title}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      ))}
    </View>
  );
};

export default SearchResultsList;
