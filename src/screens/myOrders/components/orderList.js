/* eslint-disable no-unused-vars */
import React, { useRef, useState, useCallback, useEffect } from 'react';
import {
    Animated,
    FlatList,
    StyleSheet,
    View,
    RefreshControl,
} from 'react-native';

import { CustomSquareButton } from 'src/components/buttons';
import { Loader } from 'src/components/loaders';
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
            refreshControl={
                refresh && (
                    <RefreshControl
                        refreshing={refreshState}
                        onRefresh={onRefresh}
                    />
                )
            }
            ref={ref}
            data={data}
            extraData={loadingMore}
            renderItem={ListItem}
            ListFooterComponent={FooterButton}
            keyExtractor={keyExtractor}
            contentContainerStyle={[styles.contentContainerStyle]}
            // PERF Optimization
            initialNumToRender={0}
            maxToRenderPerBatch={6}
            windowSize={12}
            getItemLayout={getItemLayout}
            progressViewOffset={20}
        />
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
