import React, { useRef, useState, useCallback } from 'react';
import { FlatList, StyleSheet, RefreshControl } from 'react-native';

import { CustomSquareButton } from 'src/components/buttons';
import { mgM, pdHs, pdVm, pdVss, zIndexL } from 'src/styles';
import { ListCardHeight } from './helpers';

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

    return (
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
