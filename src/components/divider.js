import React from 'react';
import { StyleSheet } from 'react-native';
import { Divider, useTheme } from 'react-native-paper';
import { pdVss, primaryColor } from 'src/styles';

export function DividerV({ m, l, invertBg }) {
    const { colors } = useTheme();
    const style = styles(colors);

    return (
        <Divider
            style={[
                m ? style.dividerM : l ? style.dividerL : style.divider,
                invertBg && style.invertBg,
            ]}
        />
    );
}

const styles = colors =>
    StyleSheet.create({
        dividerM: {
            alignSelf: 'center',
            // backgroundColor: onBackgroundDark,
            height: 1,
            width: '80%',
        },

        divider: {
            alignSelf: 'center',
            // backgroundColor: onBackgroundDark,
            height: 1,
            width: '100%',
        },

        dividerL: {
            alignSelf: 'center',
            backgroundColor: primaryColor,
            height: pdVss,
            width: '100%',
        },

        invertBg: {
            backgroundColor: colors.background,
        },
    });
