import React, { useEffect, useState } from 'react';
// import i18n from "i18n-js";
import { View, StyleSheet } from 'react-native';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { useTheme } from 'react-native-paper';
import Animated from 'react-native-reanimated';
import Toast from 'react-native-root-toast';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { CustomTitle, CustomText } from 'src/components/customText';
import { GapV } from 'src/components/gap';
import { Loader } from 'src/components/loaders';
import VirtualizedView from 'src/components/virtualizedBackedContainer';
import { entering, exiting } from 'src/helpers/animation';
import gloabalStyle from 'src/styles/index';
import OtpFieldView from './components/otpCodeField';

function OTP({ navigation, route }) {
    const phoneNumber = route?.params?.signupValues?.phoneNumber;
    const { colors } = useTheme();
    const gStyle = gloabalStyle();
    const style = styles(colors);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function effect() {
            setTimeout(sendOtp, 2000);
        }

        effect();
    }, []);

    function sendOtp() {
        setLoading(false);
    }

    function showSnack(msg) {
        Toast.show(msg, Toast.durations.SHORT);
    }

    const Content = () => (
        <>
            <CustomTitle style={style.title}>{`Verify OTP`}</CustomTitle>
            <GapV large />

            <CustomTitle>{`Verify the OTP code`}</CustomTitle>
            <GapV small />

            <CustomText>{`Sent to ${phoneNumber}`}</CustomText>
            <GapV />

            {loading ? <Loader /> : <OtpFieldView navigation={navigation} />}
        </>
    );

    return (
        <Animated.View
            entering={entering}
            exiting={exiting}
            style={gStyle.container}>
            <VirtualizedView>
                <View style={gStyle.content}>
                    {/* Content */}
                    {Content()}
                </View>
            </VirtualizedView>

            {/* Modals and popups */}
        </Animated.View>
    );
}

function mapStateToProps() {
    return {};
}

function mapDipatchToProps(dispatch, getState) {
    return bindActionCreators({}, dispatch, getState);
}

export default connect(mapStateToProps, mapDipatchToProps)(OTP);

const styles = colors =>
    StyleSheet.create({
        title: {
            color: colors.notification,
        },
    });
