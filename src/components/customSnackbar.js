import React from 'react';
import { StyleSheet } from 'react-native';
import { Snackbar, useTheme } from 'react-native-paper';

import { CustomCaption } from './customText';

export function CustomSnackbar({
    visible,
    onDismiss,
    textStyle,
    onPress,
    msg,
    duration,
}) {
    const { colors } = useTheme();
    const style = styles(colors);

    return (
        <Snackbar
            visible={visible}
            onDismiss={onDismiss}
            duration={duration || 2000}
            style={style}
            action={{
                onPress,
            }}>
            <CustomCaption style={textStyle}>{msg}</CustomCaption>
        </Snackbar>
    );
}

const styles = colors =>
    StyleSheet.create({
        snackBar: {
            bottom: 50,
            backgroundColor: colors.background,
        },

        snackText: {
            color: colors.text,
        },
    });
