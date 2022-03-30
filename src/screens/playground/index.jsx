/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Button } from 'react-native';
import Animated, { BounceInUp, Layout, FadeOut } from 'react-native-reanimated';

import { CustomDropDownPicker } from 'src/components/dropDownPicker';

export default function Playground() {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [items, setItems] = useState([
        { label: 'first', value: 1 },
        { label: 'second', value: 2 },
    ]);
    const [value, setValue] = useState(null);

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
            <CustomDropDownPicker
                title="Pick"
                items={items}
                setValue={setValue}
                value={value}
            />
        </Animated.View>
    );
}
