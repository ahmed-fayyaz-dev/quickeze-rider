import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

export const Image = ({ uri, headers, imageStyle }) => (
    <FastImage
        style={[styles.image, imageStyle]}
        source={{
            uri: uri,
            headers: headers,
            priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
    />
);

const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 200,
    },
});
