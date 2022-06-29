import React from 'react';
// import i18n from "i18n-js";
import { View, StyleSheet, Image } from 'react-native';
import { useTheme } from 'react-native-paper';
import Toast from 'react-native-root-toast';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { images } from 'assets/images';

import { GapV } from 'src/components/gap';
import VirtualizedView from 'src/components/virtualizedBackedContainer';
import { windowWidth } from 'src/helpers';
import { entering, exiting } from 'src/helpers/animation';
import gloabalStyle from 'src/styles/index';
import Form from './form';

function AttachPaymentMethod() {
    const { colors } = useTheme();
    const gStyle = gloabalStyle();
    const style = styles(colors);

    function showSnack(msg) {
        Toast.show(msg, Toast.durations.SHORT);
    }

    const TopBox = () => {
        return (
            <Image
                source={images.profile.creditCard}
                style={style.topImage}
                resizeMode="contain"
            />
        );
    };

    return (
        <View style={gStyle.container}>
            <VirtualizedView>
                <View style={gStyle.content}>
                    {/* Content */}
                    {TopBox()}
                    <GapV />

                    <Form />
                </View>
            </VirtualizedView>

            {/* Modals and popups */}
        </View>
    );
}

function mapStateToProps() {
    return {};
}

function mapDipatchToProps(dispatch, getState) {
    return bindActionCreators({}, dispatch, getState);
}

export default connect(mapStateToProps, mapDipatchToProps)(AttachPaymentMethod);

const styles = colors =>
    StyleSheet.create({
        topImage: {
            alignSelf: 'center',
            // width: windowWidth,
            height: 200,
        },
    });
