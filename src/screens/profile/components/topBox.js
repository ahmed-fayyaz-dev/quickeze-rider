import React from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';

import { CustomTitle } from 'src/components/customText';
import { IonIcons } from 'src/helpers';
import { mgS } from 'src/styles';

const Image = ({ uri, headers, imageStyle }) => (
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

const TopBox = ({ imageUri, name, status }) => {
    return (
        <View style={styles.container}>
            <Image uri={imageUri} />

            <CustomTitle>
                {name + ' '}
                {status
                    ? IonIcons({
                          name: 'checkmark-circle',
                          color: 'green',
                      })
                    : IonIcons({
                          name: 'close-circle',
                          color: 'red',
                      })}
            </CustomTitle>
        </View>
    );
};

export default TopBox;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },

    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        overflow: 'hidden',
        marginBottom: mgS,
    },
});
