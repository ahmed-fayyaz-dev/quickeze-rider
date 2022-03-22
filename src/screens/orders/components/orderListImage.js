import React from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
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

const styles = StyleSheet.create({
    image: {
        // width: 200,
        // height: 200,

        width: 80,
        height: 80,
        borderRadius: bRss,
        overflow: 'hidden',
    },
});
