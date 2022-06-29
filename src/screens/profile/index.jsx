import React from 'react';
// import i18n from "i18n-js";
import { View, StyleSheet } from 'react-native';
// import { useTheme } from "react-native-paper";
import Animated from 'react-native-reanimated';
import Toast from 'react-native-root-toast';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import VirtualizedView from 'src/components/virtualizedBackedContainer';
import { getRiderActiveStatus } from 'src/helpers';
import { entering, exiting } from 'src/helpers/animation';
import gloabalStyle from 'src/styles/index';

import ButtonList from './components/menuButtonList';
import TopBox from './components/topBox';

function Profile({ submitLoginReducer }) {
    // const { colors } = useTheme();
    const gStyle = gloabalStyle();
    // const style = styles(colors);
    const imageUri = submitLoginReducer.data?.user?.profileUrl;
    const name = submitLoginReducer.data?.user?.name;
    const status = getRiderActiveStatus(submitLoginReducer.data?.user?.status);
    // const status = true;

    function showSnack(msg) {
        Toast.show(msg, Toast.durations.SHORT);
    }

    return (
        <Animated.View
            entering={entering}
            exiting={exiting}
            style={gStyle.container}>
            <VirtualizedView>
                <View style={gStyle.content}>
                    {/* Content */}
                    <TopBox imageUri={imageUri} name={name} status={status} />

                    <ButtonList status={status} />
                </View>
            </VirtualizedView>

            {/* Modals and popups */}
        </Animated.View>
    );
}

function mapStateToProps({ submitLoginReducer }) {
    return {
        submitLoginReducer,
    };
}

function mapDipatchToProps(dispatch, getState) {
    return bindActionCreators({}, dispatch, getState);
}

export default connect(mapStateToProps, mapDipatchToProps)(Profile);

const styles = colors => StyleSheet.create({});

// todo
// remove drawer header add custom header(i.e: app bar)
