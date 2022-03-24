import React from 'react';
import { ActivityIndicator } from 'react-native-paper';

export const Loader = ({ show, small, large }) => (
    <ActivityIndicator animating={show} size={large ? 'large' : 'small'} />
);
