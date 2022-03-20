import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Surface, useTheme } from 'react-native-paper';
import Animated, { RollOutRight, RollInLeft } from 'react-native-reanimated';

import globalStyles, { bRms, mgHs, mgVs } from 'src/styles';
import { CustomCaption, CustomTitle } from './customText';
import { GapH } from './gap';

const absoluteTop = 20;

export function StickyHeader({
    title,
    subtitle,
    profileUrl,
    subtitle2,
    setMarginToAvoid,
}) {
    const { colors } = useTheme();
    const style = styles(colors);
    const gStyle = globalStyles(colors);

    const onLayout = (event) => {
        const { height } = event.nativeEvent.layout;
        setMarginToAvoid(height - absoluteTop);
    };

    return (
        <Animated.View
            style={style.container}
            entering={RollInLeft}
            exiting={RollOutRight}
            // layout={Layout.springify()}
            onLayout={onLayout}
        >
            <Surface style={[style.accountInfoCard, gStyle.elevationM]}>
                <Image
                    resizeMode="cover"
                    source={{
                        uri: profileUrl,
                    }}
                    style={[style.roundImage]}
                />

                <GapH small />
                <View style={style.textView}>
                    <CustomTitle>{title}</CustomTitle>
                    <CustomCaption numberOfLines={2}>{subtitle}</CustomCaption>
                    <CustomCaption numberOfLines={2}>{subtitle2}</CustomCaption>
                </View>
            </Surface>
        </Animated.View>
    );
}

const styles = (colors) => StyleSheet.create({
    container: {
        width: '100%',
        top: absoluteTop,
        alignSelf: 'center',
        position: 'absolute',
    },

    accountInfoCard: {
        flexDirection: 'row',
        paddingVertical: mgVs,
        paddingHorizontal: mgHs,
        borderRadius: bRms,
        minHeight: 90,
        alignItems: 'center',
        backgroundColor: colors.surface,
        justifyContent: 'space-between',
    },

    roundImage: {
        width: 65,
        height: 65,
        borderRadius: 65 / 2,
        overflow: 'hidden',
    },

    textView: {
        flex: 1,
    },

    // subtitle: { overflow: "hidden", maxHeight: 40 },
});
