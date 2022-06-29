/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Button } from 'react-native';
import Animated, { BounceInUp, Layout, FadeOut } from 'react-native-reanimated';
import Banner from 'src/components/banner';
import { CustomDropDownPicker } from 'src/components/dropDownPicker';

export default function Playground() {
    const [visible, setVisible] = React.useState(false);
    const [items, setItems] = useState([
        { label: 'first', value: 1 },
        { label: 'second', value: 2 },
    ]);
    const [value, setValue] = useState(null);

    const showBanner = () => {
        setVisible(true);
    };

    return (
        <Animated.View
            entering={BounceInUp}
            exiting={FadeOut}
            layout={Layout.springify()}>
            <Banner
                visible={visible}
                action1={setVisible}
                action2={setVisible}
            />
            <Button title="SHOW BANNER" onPress={showBanner} />
            <CustomDropDownPicker
                title="Pick"
                items={items}
                setValue={setValue}
                value={value}
            />
        </Animated.View>
    );
}
