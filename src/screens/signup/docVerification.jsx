import React from 'react';
// import i18n from "i18n-js";
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
// import { useTheme } from "react-native-paper";
import Animated from 'react-native-reanimated';
import Toast from 'react-native-root-toast';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { CustomSubheading, CustomTitle } from 'src/components/customText';
import { GapV } from 'src/components/gap';
import VirtualizedView from 'src/components/virtualizedBackedContainer';
import { entering, exiting } from 'src/helpers/animation';
import gloabalStyle from 'src/styles/index';
import DocVerificationForm from './components/docVerificationForm';

function DocVerification({ navigation }) {
    const { colors } = useTheme();
    const gStyle = gloabalStyle();
    const style = styles(colors);

    function showSnack(msg) {
        Toast.show(msg, Toast.durations.SHORT);
    }

    function navigateToSignin() {
        navigation.navigate('login');
    }

    const BackToSignin = () => (
        <TouchableOpacity onPress={navigateToSignin}>
            <CustomSubheading>
                {`Back to `}
                <CustomSubheading
                    style={style.highlight}>{`Login?`}</CustomSubheading>
            </CustomSubheading>
        </TouchableOpacity>
    );

    const Content = () => (
        <>
            <CustomTitle
                style={style.title}>{`Document Verification`}</CustomTitle>
            <GapV />

            <DocVerificationForm navigation={navigation} />
            <GapV />

            <BackToSignin />
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

export default connect(mapStateToProps, mapDipatchToProps)(DocVerification);

const styles = colors =>
    StyleSheet.create({
        title: {
            color: colors.notification,
        },

        highlight: {
            fontWeight: 'bold',
            color: colors?.primary,
        },
    });
