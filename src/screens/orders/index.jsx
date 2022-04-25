import React, { useState, useEffect, useCallback, lazy, useRef } from 'react';
// import i18n from "i18n-js";
import { FlatList as RnFlatList } from 'react-native';
import { useTheme } from 'react-native-paper';
import Animated, { Layout } from 'react-native-reanimated';
import Toast from 'react-native-root-toast';
import { connect, batch } from 'react-redux';

import { success } from 'src/helpers';
import { layoutSpring } from 'src/helpers/animation';
import gloabalStyle from 'src/styles/index';

import DetailModal from './components/detailModal';
import {
    initialLimit,
    initialOffset,
    FlatList,
    addToMyOrders,
} from './components/helpers';
import ListCard from './components/orderListCard';
import { getOrdersFromOffsetId } from './dataFormat';

function Orders() {
    // const t = (v) => i18n.t(v); // Getting translated text
    const { colors } = useTheme();
    const gStyle = gloabalStyle(colors);
    // const style = styles(colors);
    const detailModelRef = useRef(null);

    const [ready, setReady] = useState(false);
    const [orderList, setOrderList] = useState(null);
    const [loadingMore, setLoadingMore] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [listOffset, setListOffset] = useState(initialOffset);

    useEffect(() => {
        async function effect() {
            await getOrderList();
        }

        effect();
    }, []);

    function showSnack(msg) {
        Toast.show(msg, Toast.durations.SHORT);
    }

    async function handleAccept(orderIndex, orderId) {
        let res = await addToMyOrders({ orderIndex, orderId, orderList });

        detailModelRef.current?.close();
        showSnack(`${res}`);
    }

    function showDetailModal(index, orderId) {
        setSelectedIndex(index);
        detailModelRef.current?.open();
    }

    async function getOrderList() {
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

    async function loadMoreOrderList() {
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
                batch(() => {
                    showSnack(res?.message);
                    setLoadingMore(false);
                });
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const _handleAccept = useCallback(handleAccept, [
        orderList,
        selectedIndex,
        detailModelRef,
    ]);

    const _showDetailModal = useCallback(showDetailModal, [detailModelRef]);

    const ListItem = ({ item, index }) => {
        return (
            <ListCard
                data={item}
                orderIndex={index}
                onPress={_handleAccept}
                onCardPress={_showDetailModal}
            />
        );
    };

    const _ListItem = useCallback(ListItem, [_handleAccept, _showDetailModal]);

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

    // const TestList = () => (
    //     <RnFlatList
    //         data={orderList}
    //         renderItem={_ListItem}
    //         keyExtractor={(item, i) => {
    //             return `${item} : ${i}`;
    //         }}
    //         onEndReached={_loadMoreOrderList}
    //     />
    // );

    return (
        <Animated.View layout={layoutSpring} style={gStyle.container}>
            {/* Content */}

            {ready && <_List />}

            {/* {ready && <TestList />} */}

            {/* Modals and popups */}

            <DetailModal
                ref={detailModelRef}
                item={orderList ? orderList[selectedIndex] : null}
                index={selectedIndex}
                onPress={_handleAccept}
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
