// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
// import i18n from "i18n-js";
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
// eslint-disable-next-line no-unused-vars
import Animated, { FadeIn, Layout, FadeOut } from 'react-native-reanimated';
import { connect } from 'react-redux';

import { CustomSnackbar } from 'src/components/customSnackbar';
import VirtualizedView from 'src/components/virtualizedBackedContainer';
import { submitGetDashboardDataDetail } from 'src/screens/dashboard/actions/actions';
import gloabalStyle from 'src/styles/index';

function Orders() {
    // const t = (v) => i18n.t(v); // Getting translated text
    const { colors } = useTheme();
    const gStyle = gloabalStyle();
    const style = styles(colors);

    const [visibleSnack, setVisibleSnack] = useState(false);
    const [snackMsg, setSnackMsg] = useState('');

    function onDismissSnackBar() {
        setVisibleSnack(false);
    }

    function showSnack(msg) {
        setSnackMsg(msg);
        setVisibleSnack(true);
    }

    useEffect(() => () => {}, []);

    return (
        <Animated.View layout={Layout.springify()} style={gStyle.container}>
            <VirtualizedView contentContainerStyle={[gStyle.fg]}>
                <View style={gStyle.content}>{/* Content */}</View>
            </VirtualizedView>

            {/* Modals and popups */}
            <CustomSnackbar
                visible={visibleSnack}
                onDismiss={onDismissSnackBar}
                style={gStyle.snackBar}
                textStyle={gStyle.snackText}
                msg={`${snackMsg}`}
            />
        </Animated.View>
    );
}

function mapStateToProps({ detailsBankBalReducer, submitLoginReducer }) {
    return {
        detailsBankBalReducer,
        submitLoginReducer,
    };
}

export default connect(mapStateToProps, { submitGetDashboardDataDetail })(
    Orders,
);

const styles = colors => StyleSheet.create({});
