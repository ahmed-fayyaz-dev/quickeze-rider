import { FadeInLeft, FadeOut, Layout } from 'react-native-reanimated';

export const entering = FadeInLeft;

export const exiting = FadeOut;

export const layoutSpring = Layout.springify();

export const getCloser = (value, checkOne, checkTwo) =>
    Math.abs(value - checkOne) < Math.abs(value - checkTwo)
        ? checkOne
        : checkTwo;
