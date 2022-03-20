import FastImage from 'react-native-fast-image';

export const Image = ({ uri, headers, imageStyle }) => (
    <FastImage
        style={[imageStyle]}
        source={{
            uri: uri,
            headers: headers,
            priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
    />
);
