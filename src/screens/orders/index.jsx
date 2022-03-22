import React, { useState, useEffect, useCallback, lazy } from 'react';
// import i18n from "i18n-js";
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import Animated, { Layout } from 'react-native-reanimated';
import { connect, batch } from 'react-redux';

import { CustomSnackbar } from 'src/components/customSnackbar';
import VirtualizedView from 'src/components/virtualizedBackedContainer';
import { success } from 'src/helpers';
import gloabalStyle from 'src/styles/index';

import {
    initialLimit,
    initialOffset,
    FlatList,
    AcceptOrder,
} from './components/helpers';
import { getOrdersFromOffsetId } from './dataFormat';

function Orders() {
    // const t = (v) => i18n.t(v); // Getting translated text
    const { colors } = useTheme();
    const gStyle = gloabalStyle();
    // const style = styles(colors);

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

    // eslint-disable-next-line no-unused-vars
    function showSnack(msg) {
        setSnackMsg(msg);
        setVisibleSnack(true);
    }

    function handleAccept(orderIndex, orderId) {
        // console.log('handle', orderIndex, orderId);
        try {
            if (orderList[orderIndex]?.orderId === orderId) {
                AcceptOrder(orderList[orderIndex]);
            } else {
                console.log('else', orderId);
                AcceptOrder(
                    orderList.filter(
                        orderItem => orderItem.orderId === orderId,
                    ),
                );
            }
        } catch (e) {
            throw e.message;
            // throw { message: `order of id : ${orderId} can't be found` };
        }
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
                setListOffset(id);
                batch(() => {
                    setOrderList([...orderList, ...orders]);
                    // orderList.push(...orders);
                    setLoadingMore(false);
                });
            }
        } catch (e) {
            throw e.message;
        }
    }
    const _loadMoreOrderList = useCallback(loadMoreOrderList, [
        listOffset,
        orderList,
    ]);

    const _List = useCallback(
        () => FlatList(orderList, loadingMore, _loadMoreOrderList),
        [orderList, loadingMore, _loadMoreOrderList],
    );

    return (
        <Animated.View layout={Layout.springify()} style={gStyle.container}>
            <VirtualizedView
                refresh
                onRefresh={getOrderList}
                contentContainerStyle={[gStyle.fg]}>
                <View style={gStyle.content}>
                    {/* Content */}
                    <_List />
                    {/* {_List()} */}
                </View>
            </VirtualizedView>

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

const styles = colors => StyleSheet.create({});
