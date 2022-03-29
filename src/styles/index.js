import React, { useCallback } from 'react';
import {
    StyleSheet,
    StatusBar,
    useColorScheme,
    Appearance,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { colorDictionary } from './theme';

export const pdHm = 10;
export const pdHs = 5;

export const pdVm = 20;
export const pdVms = 15;
export const pdVs = 10;
export const pdVss = 5;

export const mgL = 62;
export const mgM = 35;
export const mgMs = 20;
export const mgS = 10;
export const mgSs = 5;

export const searchBarHeight = 53;
export const iconSize = RFValue(13);
export const iconSizeL = 42;
export const buttonHeight = 40;

export const sBh = StatusBar.currentHeight;

export const bRss = 5;
export const bRs = 10;
export const bRms = 18;
export const bRm = 50;

// Fonst Sizes
export const title = RFValue(16);
export const text = RFValue(11);
export const caption = RFValue(9);
export const buttonText = RFValue(13);

export const zIndexS = 4;
export const zIndexM = 9;
export const zIndexL = 12;

export const light = 'light';
export const dark = 'dark';

export const onBackgroundDark = colorDictionary.colorSet.dark.onBackground;
export const onBackgroundLight = colorDictionary.colorSet.light.onBackground;
export const primaryColor = colorDictionary.colorSet.light.primary;

export const hitSlopS = {
    top: 30,
    bottom: 30,
    left: 20,
    right: 20,
};

const Styles = () => {
    let appearance = useColorScheme() || light;
    // eslint-disable-next-line no-unused-vars
    const appearanceInv = (useColorScheme() === light ? dark : light) || dark;

    if (appearance === undefined || appearance === null) {
        appearance = light;
    }

    if (appearanceInv === undefined || appearanceInv === null) {
        appearance = dark;
    }

    return StyleSheet.create({
        divider: {
            // backgroundColor: colorDictionary.colorSet[appearance].onBackground,
            height: 1,
            flex: 1,
            alignSelf: 'center',
        },

        //App
        container: {
            flex: 1,
            backgroundColor: colorDictionary.colorSet[appearance].background,
        },

        content: {
            flex: 1,
            paddingHorizontal: pdHs,
            paddingTop: mgM,
        },

        contentBody: {
            flex: 1,
            paddingHorizontal: pdHm,
            paddingTop: mgS,
        },

        contentCenter: {
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: pdHs,
            paddingTop: pdVm,
        },

        bottomContainer: {
            flexDirection: 'column-reverse',
            flex: 1,
        },

        elevationM: {
            shadowColor: colorDictionary.colorSet[appearance].shadow,
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.32,
            shadowRadius: 5.46,

            zIndex: zIndexM,
            elevation: 9,
        },

        elevationS: {
            shadowColor: colorDictionary.colorSet[appearance].shadow,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,

            zIndex: zIndexL,
            elevation: 4,
        },
    });
};

export default Styles;
