import React from 'react';
import { AddToMyOrders } from 'src/screens/myOrders/dataFormat';
import { List } from './orderList';

export const initialOffset = 0;
export const initialLimit = 9;
export const ListCardHeight = 150;

export const FlatList = (orderList, loadingMore, loadMore) => {
    return (
        <List
            data={orderList}
            // ListItem={ListItem}
            loadingMore={loadingMore}
            loadMore={loadMore}
        />
    );
};

export const AcceptOrder = item => {
    AddToMyOrders(item);
};
