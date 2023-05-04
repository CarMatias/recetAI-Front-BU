import React, { useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button, Platform, Text, View } from "react-native";


export const DateTimePickerComponent = () => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode: React.SetStateAction<string>) => {
      setShow(false);
      // for iOS, add a button that closes the picker

  }
  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View>
      <Button onPress={showTimepicker} title="Hora del Aviso" />
      <Text>Hora Seleccionada: {date.toLocaleTimeString()}</Text>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'time'}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </View>
  );
};