import React from 'react';
import { View, StyleSheet, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { pdVss } from 'src/styles';

export const SingleSidedShadowBottom = ({ children, style }) => (
    <View style={[styles.container, style]}>{children}</View>
);

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        paddingBottom: pdVss,
        paddingHorizontal: pdVss / 2,
    },
});

SingleSidedShadowBottom.propTypes = {
    children: PropTypes.element,
    style: ViewPropTypes.style,
};
