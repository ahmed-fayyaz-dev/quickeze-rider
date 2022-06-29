import React from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

export const Image = ({ uri, headers, imageStyle, source }) => (
    <FastImage
        style={[imageStyle]}
        source={
            ({
                uri: uri,
                headers: headers,
                priority: FastImage.priority.normal,
            },
            source)
        }
        resizeMode={FastImage.resizeMode.cover}
    />
);

export const BackgroundImage = ({
    uri,
    headers,
    imageStyle,
    children,
    ...props
}) => (
    <FastImage
        style={[imageStyle]}
        source={{
            uri: uri,
            headers: headers,
            priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.cover}
        // tintColor="rgba(0,0,0,0.1)"
        {...props}>
        {children}
    </FastImage>
);

const styles = StyleSheet.create({});
