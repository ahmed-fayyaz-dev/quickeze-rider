import React, { useState, useEffect, useCallback, lazy, useRef } from 'react';
// import i18n from "i18n-js";
import { FlatList as RnFlatList } from 'react-native';
import { useTheme } from 'react-native-paper';
import Animated, { Layout } from 'react-native-reanimated';
import { connect, batch } from 'react-redux';

import { CustomSnackbar } from 'src/components/customSnackbar';
import { success } from 'src/helpers';
import gloabalStyle from 'src/styles/index';

import DetailModal from './components/detailModal';
import { FlatList } from './components/helpers';
import ListCard from './components/orderListCard';
import { getMyOrders, getMoreMyOrders } from './dataFormat';

function MyOrders() {
    // const t = (v) => i18n.t(v); // Getting translated text
    const { colors } = useTheme();
    const gStyle = gloabalStyle(colors);
    // const style = styles(colors);
    const detailModelRef = useRef(null);

    const [ready, setReady] = useState(false);
    const [snackMsg, setSnackMsg] = useState('');
    const [orderList, setOrderList] = useState(null);
    const [loadingMore, setLoadingMore] = useState(false);
    const [visibleSnack, setVisibleSnack] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);

    useEffect(() => {
        async function effect() {
            await getOrderList();
        }

        effect();
    }, []);

    function onDismissSnackBar() {
        setVisibleSnack(false);
    }

    function showSnack(msg) {
        batch(() => {
            setVisibleSnack(false);
            setSnackMsg(msg);
            setVisibleSnack(true);
        });
    }

    async function handleAccept(orderIndex, orderId) {
        detailModelRef.current?.close();
        showSnack(`shackalaca`);
    }

    function showDetailModal(index, orderId) {
        setSelectedIndex(index);
        detailModelRef.current?.open();
    }

    async function getOrderList() {
        try {
            // Passing initial Limits and off set so that on refresh always load new data
            const res = getMyOrders();
            if (res.status === success) {
                const { myOrders } = res;
                batch(() => {
                    //Id of the last recieved Item
                    setOrderList(myOrders);
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
            const res = getMoreMyOrders();
            if (res.status === success) {
                const { myOrders } = res;
                batch(() => {
                    setOrderList([...orderList, ...myOrders]);
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

    const _loadMoreOrderList = useCallback(loadMoreOrderList, [orderList]);

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

    const Snack = () => (
        <CustomSnackbar
            visible={visibleSnack}
            onDismiss={onDismissSnackBar}
            msg={`${snackMsg}`}
        />
    );

    return (
        <Animated.View layout={Layout.springify()} style={gStyle.container}>
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

            <Snack />
        </Animated.View>
    );
}

function mapStateToProps({ submitLoginReducer }) {
    return {
        submitLoginReducer,
    };
}

export default connect(mapStateToProps, {})(MyOrders);
