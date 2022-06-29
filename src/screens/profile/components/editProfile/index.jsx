import React from 'react';
// import i18n from "i18n-js";
import { View, StyleSheet } from 'react-native';
// import { useTheme } from "react-native-paper";
import Toast from 'react-native-root-toast';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import VirtualizedView from 'src/components/virtualizedBackedContainer';
import gloabalStyle from 'src/styles/index';
import Form from './editProfileForm';

function EditProfile() {
    // const { colors } = useTheme();
    const gStyle = gloabalStyle();
    // const style = styles(colors);

    function showSnack(msg) {
        Toast.show(msg, Toast.durations.SHORT);
    }

    return (
        <View style={gStyle.container}>
            <VirtualizedView>
                <View style={gStyle.content}>
                    {/* Content */}
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

export default connect(mapStateToProps, mapDipatchToProps)(EditProfile);

const styles = colors => StyleSheet.create({});

// todo
// App Bar with back icon
