/* eslint-disable no-unused-vars */
import React, { useRef, useState, useCallback, useEffect } from 'react';
import {
    Animated,
    FlatList,
    StyleSheet,
    View,
    RefreshControl,
} from 'react-native';

import { Loader } from 'src/components/ActivityIndicators';
import { CustomSquareButton } from 'src/components/buttons';
// import { getCloser } from 'src/helpers';
import { mgM, pdHs, pdVm, pdVss, zIndexL } from 'src/styles';
import { ListCardHeight } from './helpers';

// const { diffClamp } = Animated;

// const ListItem = ({ item, index }) => {
//     return <ListCard data={item} orderIndex={index} />;
// };

export const List = ({
    // Header,
    ListItem,
    data,
    loadingMore,
    loadMore,
    refresh,
    onRefresh,
    // headerHeight,
}) => {
    const ref = useRef(null);
    const [refreshState] = useState(false);

    function _loadMore() {
        loadMore();
    }

    // const _ListItem = useCallback(ListItem, [data]);

    // const Footer = () => Loader({ show: loadingMore, large: true });

    const FooterButton = () =>
        CustomSquareButton({
            title: 'Load More',
            onPress: _loadMore,
            // mode: 'outlined',
            loading: loadingMore,
            mode: 'text',
        });

    const keyExtractor = useCallback(
        (item, index) => `list-item-${index}-${item?.orderId}`,
        [],
    );

    const getItemLayout = (data, index) => ({
        length: ListCardHeight + pdVss,
        offset: (ListCardHeight + pdVss) * index,
        index,
    });

    // const onEndReached = ({ distanceFromEnd }) => {
    //     if (distanceFromEnd < 0) return;
    //     loadMore();
    // };

    /*   Animation Handlers   */
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
        // <View style={[styles.container]}>
        /* <Animated.View
                style={[styles.header, { transform: [{ translateY }] }]}>
                <Header headerHeight={headerHeight} />
            </Animated.View> */
        <FlatList
            // scrollEventThrottle={16}
            // onScroll={handleScroll}
            refreshControl={
                refresh && (
                    <RefreshControl
                        refreshing={refreshState}
                        onRefresh={onRefresh}
                    />
                )
            }
            ref={ref}
            // onMomentumScrollEnd={handleSnap}
            data={data}
            extraData={loadingMore}
            renderItem={ListItem}
            // ListFooterComponent={Footer}
            ListFooterComponent={FooterButton}
            keyExtractor={keyExtractor}
            // onEndReached={onEndReached}
            // onEndReachedThreshold={0.7}
            contentContainerStyle={[styles.contentContainerStyle]}
            // PERF Optimization
            initialNumToRender={0}
            maxToRenderPerBatch={6}
            windowSize={12}
            getItemLayout={getItemLayout}
            progressViewOffset={20}
        />
        // </View>
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
        paddingHorizontal: pdHs,
        paddingTop: mgM,
        paddingBottom: pdVm,
    },
});
