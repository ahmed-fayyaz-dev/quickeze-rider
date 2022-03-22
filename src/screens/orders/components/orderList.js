/* eslint-disable no-unused-vars */
import React, { useRef, useCallback, lazy } from 'react';
import { Animated, StyleSheet, View, RefreshControl } from 'react-native';

import { Loader } from 'src/components/ActivityIndicators';
// import { CustomSquareButton } from 'src/components/buttons';
// import { getCloser } from 'src/helpers';
import { pdVss, zIndexL } from 'src/styles';
import { ListCardHeight } from './helpers';
// import ListCard from './orderListCard';
const ListCard = lazy(() => import('./orderListCard'));

// const { diffClamp } = Animated;

const ListItem = ({ item, index }) => {
    return <ListCard data={item} orderIndex={index} />;
};

export const List = ({
    // Header,
    // ListItem,
    data,
    loadingMore,
    loadMore,
    // headerHeight,
}) => {
    const ref = useRef(null);

    // const _ListItem = useCallback(ListItem, [data]);

    const Footer = () => Loader({ show: loadingMore, large: true });

    // const FooterButton = () =>
    //     CustomSquareButton({
    //         title: 'Load More',
    //         onPress: () => loadMore(),
    //         mode: 'outlined',
    //     });

    const onEndReached = ({ distanceFromEnd }) => {
        if (distanceFromEnd < 0) return;
        loadMore();
    };
    // const scrollY = useRef(new Animated.Value(0));
    // const scrollYClamped = diffClamp(scrollY.current, 0, headerHeight);

    // const translateY = scrollYClamped.interpolate({
    //     inputRange: [0, headerHeight],
    //     outputRange: [0, -headerHeight],
    // });

    // const translateYNumber = useRef();

    // translateY.addListener(({ value }) => {
    //     translateYNumber.current = value;
    // });

    // const handleScroll = Animated.event(
    //     [
    //         {
    //             nativeEvent: {
    //                 contentOffset: { y: scrollY.current },
    //             },
    //         },
    //     ],
    //     {
    //         useNativeDriver: true,
    //     },
    // );

    // const handleSnap = ({ nativeEvent }) => {
    //     const offsetY = nativeEvent.contentOffset.y;
    //     if (
    //         !(
    //             translateYNumber.current === 0 ||
    //             translateYNumber.current === -headerHeight
    //         )
    //     ) {
    //         if (ref.current) {
    //             ref.current.scrollToOffset({
    //                 offset:
    //                     getCloser(
    //                         translateYNumber.current,
    //                         -headerHeight,
    //                         0,
    //                     ) === -headerHeight
    //                         ? offsetY + headerHeight
    //                         : offsetY - headerHeight,
    //             });
    //         }
    //     }
    // };

    return (
        <View style={[styles.container]}>
            {/* <Animated.View
                style={[styles.header, { transform: [{ translateY }] }]}>
                <Header headerHeight={headerHeight} />
            </Animated.View> */}
            <Animated.FlatList
                // scrollEventThrottle={16}
                contentContainerStyle={[styles.contentContainerStyle]}
                // onScroll={handleScroll}
                ref={ref}
                // onMomentumScrollEnd={handleSnap}
                data={data}
                extraData={loadingMore}
                // renderItem={ListItem}
                renderItem={ListItem}
                ListFooterComponent={<Footer />}
                keyExtractor={item => item?.orderId}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.7}
                // PERF Optimization
                getItemLayout={(data, index) => ({
                    length: ListCardHeight + pdVss,
                    offset: (ListCardHeight + pdVss) * index,
                    index,
                })}
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

    contentContainerStyle: {
        flexGrow: 1,
    },
});
