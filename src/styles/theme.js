import {
    DefaultTheme as defThemeNav,
    DarkTheme as darkThemeNav,
} from '@react-navigation/native';
import { DarkTheme, DefaultTheme } from 'react-native-paper';

const bRm = 5;

// primary: '#9E001F',
// primaryVariant: '#00D1A8',
// secondary: '#009E7F',

const lightColorSet = {
    primary: '#9E001F',
    primaryVariant: '#7384E7',
    secondary: '#009E7F',
    muted: '#808080',
    error: '#CF6679',
    background: '#F6F6F6',
    surface: 'white',
    onPrimary: 'white',
    onSecondary: 'white',
    onBackground: '#000000',
    onSurface: '#000000',
    onError: '#000000',
    shadow: '#000',
};

const darkColorSet = {
    primary: '#9E001F',
    primaryVariant: '#7384E7',
    secondary: '#009E7F',
    muted: '#808080',
    error: '#CF6679',
    background: '#121212',
    surface: '#272727',
    onPrimary: 'white',
    onSecondary: 'white',
    onBackground: '#FFFFFF',
    onSurface: '#FFFFFF',
    onError: '#FFFFFF',
    shadow: '#000',
};

const colorSet = {
    ...lightColorSet,
    light: lightColorSet,
    dark: darkColorSet,
    'no-preference': lightColorSet,
    null: lightColorSet,
};

export const colorDictionary = {
    colorSet,
};

export const paperLightTheme = {
    ...DefaultTheme,
    dark: false,
    roundness: bRm,
    colors: {
        ...DarkTheme.colors,
        primary: lightColorSet.primary,
        accent: lightColorSet.primaryVariant,
        background: lightColorSet.background,
        surface: lightColorSet.surface,
        error: lightColorSet.error,
        text: lightColorSet.onBackground,
        onSurface: lightColorSet.onSurface,
        disabled: lightColorSet.muted,
        placeholder: lightColorSet.muted,
        // backdrop: lightColorSet.shadow,
        notification: lightColorSet.secondary,
    },
    // fonts: configureFonts(),
    animation: {
        scale: 2.0,
    },
};

export const paperDarkTheme = {
    ...DarkTheme,
    dark: true,
    roundness: bRm,
    mode: 'adaptive',
    colors: {
        ...DarkTheme.colors,
        primary: darkColorSet.primary,
        accent: darkColorSet.primaryVariant,
        background: darkColorSet.background,
        surface: darkColorSet.surface,
        error: darkColorSet.error,
        text: darkColorSet.onBackground,
        onSurface: darkColorSet.onSurface,
        disabled: darkColorSet.muted,
        placeholder: darkColorSet.muted,
        // backdrop: darkColorSet.shadow,
        notification: darkColorSet.secondary,
    },
    // fonts: configureFonts(),
    animation: {
        scale: 2.0,
    },
};

export const navLightTheme = {
    ...defThemeNav,
    dark: false,
    colors: {
        ...defThemeNav.colors,
        primary: lightColorSet.primary,
        background: lightColorSet.background,
        card: lightColorSet.surface,
        text: lightColorSet.onBackground,
        border: lightColorSet.muted,
        notification: lightColorSet.secondary,
    },
};

export const navDarkTheme = {
    ...darkThemeNav,
    dark: true,
    colors: {
        primary: darkColorSet.primary,
        background: darkColorSet.background,
        card: darkColorSet.surface,
        text: darkColorSet.onBackground,
        border: darkColorSet.muted,
        notification: darkColorSet.secondary,
    },
};

export const CombinedLightTheme = {
    ...navLightTheme,
    ...paperLightTheme,
    colors: {
        ...navLightTheme.colors,
        ...paperLightTheme.colors,
    },
};
export const CombinedDarkTheme = {
    ...navDarkTheme,
    ...paperDarkTheme,
    colors: {
        ...navDarkTheme.colors,
        ...paperDarkTheme.colors,
    },
};
