import React from 'react';
import { useTheme, Divider as PaperDivider } from 'react-native-paper';
import globalStyle from 'src/styles';

export function Divider() {
    const { colors } = useTheme();
    const gStyle = globalStyle(colors);
    return <PaperDivider style={gStyle.divider} />;
}
