import React from 'react';
import { AddToMyOrders } from 'src/screens/myOrders/dataFormat';
import { List } from './orderList';

export const initialOffset = 0;
export const initialLimit = 9;
export const ListCardHeight = 150;

export const FlatList = ({
    orderList,
    ListItem,
    loadingMore,
    loadMore,
    refresh,
    onRefresh,
}) => {
    return (
        <List
            data={orderList}
            ListItem={ListItem}
            loadingMore={loadingMore}
            loadMore={loadMore}
            refresh={refresh}
            onRefresh={onRefresh}
        />
    );
};

const AcceptOrder = async item => {
    return await AddToMyOrders(item);
};

export async function addToMyOrders({ orderIndex, orderId, orderList }) {
    // console.log('handle', orderIndex, orderId);
    try {
        if (orderList[orderIndex]?.orderId === orderId) {
            return await AcceptOrder(orderList[orderIndex]);
        } else {
            // console.log('else', orderId);
            return await AcceptOrder(
                orderList.filter(orderItem => orderItem.orderId === orderId),
            );
        }
    } catch (e) {
        throw e.message;
        // throw { message: `order of id : ${orderId} can't be found` };
    }
}
