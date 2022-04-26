import React from 'react';
// import i18n from "i18n-js";
import { View, StyleSheet } from 'react-native';
// import { useTheme } from "react-native-paper";
import Animated from 'react-native-reanimated';
import Toast from 'react-native-root-toast';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import VirtualizedView from 'src/components/virtualizedBackedContainer';
import { entering, exiting } from 'src/helpers/animation';
import gloabalStyle from 'src/styles/index';

function Temp() {
    // const { colors } = useTheme();
    const gStyle = gloabalStyle();
    // const style = styles(colors);

    function showSnack(msg) {
        Toast.show(msg, Toast.durations.SHORT);
    }

    return (
        <Animated.View
            entering={entering}
            exiting={exiting}
            style={gStyle.container}>
            <VirtualizedView>
                <View style={gStyle.content}>{/* Content */}</View>
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

export default connect(mapStateToProps, mapDipatchToProps)(Temp);

const styles = colors => StyleSheet.create({});
