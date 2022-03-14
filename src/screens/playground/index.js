import React, {useState} from 'react';
import {Button} from 'react-native';
import Animated, {BounceInUp, Layout, FadeOut} from 'react-native-reanimated';

export const Playground = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    console.warn('A date has been picked: ', date);
    hideDatePicker();
  };

  return (
    <Animated.View
      entering={BounceInUp}
      exiting={FadeOut}
      layout={Layout.springify()}>
      <Button title="PRESS ME" onPress={showDatePicker} />
    </Animated.View>
  );
};
