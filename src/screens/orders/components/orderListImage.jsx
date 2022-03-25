import React from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { windowHeigth } from 'src/helpers';
import { bRss } from 'src/styles';

export const Image = ({ uri, headers, imageStyle }) => (
    <FastImage
        style={[styles.image, imageStyle]}
        source={{
            uri: uri,
            headers: headers,
            priority: FastImage.priority.normal,
        }}
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
        style={[styles.imageBg, imageStyle]}
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

const styles = StyleSheet.create({
    image: {
        width: 80,
        height: 80,
        borderRadius: bRss,
        overflow: 'hidden',
    },

    imageBg: {
        // width: "100%",
        height: 250,
        borderRadius: bRss,
        overflow: 'hidden',
    },
});
