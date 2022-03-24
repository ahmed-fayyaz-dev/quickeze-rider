/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback, lazy } from 'react';
// import i18n from "i18n-js";
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import Animated, { Layout } from 'react-native-reanimated';
import { connect, batch } from 'react-redux';

import { CustomSnackbar } from 'src/components/customSnackbar';
import { success } from 'src/helpers';
import gloabalStyle from 'src/styles/index';

import {
    initialLimit,
    initialOffset,
    FlatList,
    addToMyOrders,
} from './components/helpers';
import { getOrdersFromOffsetId } from './dataFormat';
const ListCard = lazy(() => import('./components/orderListCard'));

function Orders() {
    // const t = (v) => i18n.t(v); // Getting translated text
    const { colors } = useTheme();
    const gStyle = gloabalStyle(colors);
    // const style = styles(colors);

    const [ready, setReady] = useState(false);
    const [visibleSnack, setVisibleSnack] = useState(false);
    const [snackMsg, setSnackMsg] = useState('');
    const [loadingMore, setLoadingMore] = useState(false);
    const [listOffset, setListOffset] = useState(initialOffset);
    const [orderList, setOrderList] = useState(null);

    useEffect(() => {
        getOrderList();
    }, []);

    function onDismissSnackBar() {
        setVisibleSnack(false);
    }

    function showSnack(msg) {
        setVisibleSnack(false);
        setSnackMsg(msg);
        setVisibleSnack(true);
    }

    function handleAccept(orderIndex, orderId) {
        let res = addToMyOrders({ orderIndex, orderId, orderList });

        showSnack(`${res}`);
    }

    function getOrderList() {
        try {
            // Passing initial Limits and off set so that on refresh always load new data
            const res = getOrdersFromOffsetId(initialOffset, initialLimit);
            if (res.status === success) {
                const { orders } = res;
                batch(() => {
                    //Id of the last recieved Item
                    let id = orders[orders.length - 1].orderId;
                    setListOffset(id);
                    setOrderList(orders);
                    setReady(true);
                });
            }
        } catch (e) {
            throw e.message;
        }
    }

    function loadMoreOrderList() {
        try {
            setLoadingMore(true);
            const res = getOrdersFromOffsetId(listOffset, initialLimit);
            if (res.status === success) {
                const { orders } = res;
                //Id of the last recieved Item
                let id = orders[orders.length - 1].orderId;
                batch(() => {
                    setListOffset(id);
                    setOrderList([...orderList, ...orders]);
                    setLoadingMore(false);
                });
            } else {
                showSnack(res?.message);
                setLoadingMore(false);
            }
        } catch (e) {
            setLoadingMore(false);
            throw e.message;
        }
    }

    const _loadMoreOrderList = useCallback(loadMoreOrderList, [
        listOffset,
        orderList,
    ]);

    const _handleAccept = useCallback(handleAccept, [orderList]);

    const ListItem = ({ item, index }) => {
        return (
            <ListCard data={item} orderIndex={index} onPress={_handleAccept} />
        );
    };

    const _ListItem = useCallback(ListItem, [_handleAccept]);

    const _List = useCallback(
        () =>
            FlatList({
                orderList,
                ListItem: _ListItem,
                loadingMore: loadingMore,
                loadMore: _loadMoreOrderList,
                refresh: true,
                onRefresh: getOrderList,
            }),
        [orderList, _ListItem, loadingMore, _loadMoreOrderList],
    );

    return (
        <Animated.View layout={Layout.springify()} style={gStyle.container}>
            {/* Content */}
            {ready && <_List />}

            {/* Modals and popups */}
            <CustomSnackbar
                visible={visibleSnack}
                onDismiss={onDismissSnackBar}
                msg={`${snackMsg}`}
            />
        </Animated.View>
    );
}

function mapStateToProps({ submitLoginReducer }) {
    return {
        submitLoginReducer,
    };
}

export default connect(mapStateToProps, {})(Orders);
