import React from 'react';
import { StyleSheet } from 'react-native';
import { Snackbar, useTheme } from 'react-native-paper';

import { CustomText } from './customText';

export function CustomSnackbar({ visible, onDismiss, onPress, msg, duration }) {
    const { colors } = useTheme();
    const style = styles(colors);

    return (
        <Snackbar
            visible={visible}
            onDismiss={onDismiss}
            duration={duration || 2000}
            style={[style.snackBar]}
            action={{
                onPress,
            }}>
            <CustomText style={style.snackText}>{msg}</CustomText>
        </Snackbar>
    );
}

const styles = colors =>
    StyleSheet.create({
        snackBar: {
            bottom: 50,
            backgroundColor: colors.text,
        },

        snackText: {
            color: colors.background,
        },
    });
