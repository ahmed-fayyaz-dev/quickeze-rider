import React, { useRef } from 'react';
import { Animated, StyleSheet, View, RefreshControl } from 'react-native';

import { getCloser } from 'src/helpers';
import { zIndexL } from 'src/styles';

const { diffClamp } = Animated;

export const AnimatedFlatlist = ({
    Header,
    ListItem,
    data,
    refresh,
    onRefresh,
    refreshing,
    headerHeight,
    contentContainerStyle,
}) => {
    const ref = useRef(null);

    const scrollY = useRef(new Animated.Value(0));
    const scrollYClamped = diffClamp(scrollY.current, 0, headerHeight);

    const translateY = scrollYClamped.interpolate({
        inputRange: [0, headerHeight],
        outputRange: [0, -headerHeight],
    });

    const translateYNumber = useRef();

    translateY.addListener(({ value }) => {
        translateYNumber.current = value;
    });

    const handleScroll = Animated.event(
        [
            {
                nativeEvent: {
                    contentOffset: { y: scrollY.current },
                },
            },
        ],
        {
            useNativeDriver: true,
        },
    );

    const handleSnap = ({ nativeEvent }) => {
        const offsetY = nativeEvent.contentOffset.y;
        if (
            !(
                translateYNumber.current === 0 ||
                translateYNumber.current === -headerHeight
            )
        ) {
            if (ref.current) {
                ref.current.scrollToOffset({
                    offset:
                        getCloser(
                            translateYNumber.current,
                            -headerHeight,
                            0,
                        ) === -headerHeight
                            ? offsetY + headerHeight
                            : offsetY - headerHeight,
                });
            }
        }
    };

    return (
        <View style={[styles.container]}>
            <Animated.View
                style={[styles.header, { transform: [{ translateY }] }]}>
                <Header headerHeight={headerHeight} />
            </Animated.View>
            <Animated.FlatList
                scrollEventThrottle={16}
                contentContainerStyle={[
                    { paddingTop: headerHeight },
                    contentContainerStyle,
                ]}
                onScroll={handleScroll}
                ref={ref}
                onMomentumScrollEnd={handleSnap}
                data={data}
                refreshControl={
                    refresh && (
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    )
                }
                renderItem={({ item, index }) => ListItem(item, index)}
                keyExtractor={(item, index) => `list-item-${index}-${item}`}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        left: 0,
        right: 0,
        width: '100%',
        zIndex: zIndexL,
    },

    subHeader: {
        width: '100%',
    },

    container: {
        flex: 1,
    },
});
