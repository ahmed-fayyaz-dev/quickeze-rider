import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Button, FAB, IconButton, useTheme } from 'react-native-paper';

import gloablStyle, {
    bRs,
    bRss,
    buttonHeight,
    hitSlopS,
    mgS,
    pdHs,
    pdVs,
    pdVss,
    zIndexL,
} from 'src/styles';
import { CustomSubheading, CustomText } from './customText';

export function CustomRoundButton({
    title,
    onPress,
    loading,
    icon,
    compact,
    mode,
    uppercase,
    children,
    ...props
}) {
    const { colors } = useTheme();
    const style = styles(colors);

    return (
        <Button
            mode={mode || 'contained'}
            onPress={onPress}
            loading={loading}
            disabled={loading}
            uppercase={uppercase}
            compact={compact}
            // color={colors.notification}
            style={[style.roundButton]}
            icon={icon}
            contentStyle={[style.fdrr, style.roundButton]}
            {...props}>
            {title}
            <>{children}</>
        </Button>
    );
}

export function CustomSquareButton({
    color,
    title,
    onPress,
    loading,
    icon,
    mode,
    children,
    ...props
}) {
    const { colors } = useTheme();
    const style = styles(colors);
    const gStyle = gloablStyle(colors);

    return (
        <Button
            mode={mode || 'contained'}
            onPress={onPress}
            loading={loading}
            disabled={loading}
            color={color}
            icon={icon}
            // compact
            style={[style.squareButton]}
            theme={{ roundness: bRss }}
            {...props}>
            {title}
            {children}
        </Button>
    );
}

export function CutomButtonRNGH({
    title,
    onPress,
    children,
    icon,
    mode,
    loading,
}) {
    const { colors } = useTheme();
    const style = styles(colors);

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <Button
                mode={mode || 'contained'}
                onPress={onPress}
                loading={loading}
                disabled={loading}
                icon={icon}
                // compact
                style={[style.squareButton]}
                theme={{ roundness: bRss }}>
                {title}
                {children}
            </Button>
        </TouchableWithoutFeedback>
    );
}

export function CustomIconButton({ onPress, bg, size, color, name }) {
    return (
        <IconButton
            hitSlop={hitSlopS}
            icon={name}
            color={color}
            style={[bg && { backgroundColor: bg }]}
            size={size}
            onPress={onPress}
        />
    );
}

export function CustomFab({ onPress, color, icon, small, visible }) {
    return (
        <FAB
            visible={visible}
            hitSlop={hitSlopS}
            style={[{ margin: mgS }]}
            small={small}
            icon={icon}
            color={color}
            onPress={onPress}
        />
    );
}

export function CustomDateButton({
    title,
    value,
    onPress,
    loading,
    icon,
    mode,
    ...props
}) {
    const { colors } = useTheme();
    const style = styles(colors);
    const gStyle = gloablStyle(colors);

    return (
        <View style={[style.titledButtonView]}>
            <CustomText style={[style.titledButtonTitle]}>{title}</CustomText>
            <Button
                mode={mode || 'text'}
                onPress={onPress}
                loading={loading}
                disabled={loading}
                color={colors.surface}
                icon={icon}
                // compact
                style={[style]}
                contentStyle={[style.titledButton]}
                theme={{ roundness: bRss }}
                {...props}>
                <CustomSubheading>{value}</CustomSubheading>
            </Button>
        </View>
    );
}

const styles = colors =>
    StyleSheet.create({
        roundButton: {
            minHeight: buttonHeight,
            justifyContent: 'center',
            borderColor: colors.primary,
            width: '100%',
            alignSelf: 'center',
        },

        roundButtonS: {
            minHeight: buttonHeight,
            justifyContent: 'center',
            width: '45%',
            alignSelf: 'center',
        },

        squareButton: {
            minWidth: 30,
        },

        compactButton: {
            minHeight: 0,
            flexDirection: 'row',
            justifyContent: 'center',
        },

        titledButtonTitle: {
            textAlign: 'left',
            position: 'absolute',
            zIndex: zIndexL,
            fontWeight: 'bold',
            borderRadius: bRss,
            top: -pdVs,
            left: pdHs,
            paddingHorizontal: pdVss,
            backgroundColor: colors.text,
        },

        titledButtonView: {
            borderWidth: 1,
            borderRadius: bRss,
            backgroundColor: colors.surface,
            // backgroundColor: colorDictionary.colorSet[appearance].background,
        },

        titledButton: {
            minHeight: buttonHeight,
            justifyContent: 'flex-start',
        },

        fdrr: {
            flexDirection: 'row-reverse',
        },
    });
