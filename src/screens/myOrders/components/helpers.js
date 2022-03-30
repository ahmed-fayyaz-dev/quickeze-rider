import React from 'react';
import { Linking, Alert } from 'react-native';
import { isAndroid } from 'src/helpers';
import { List } from './orderList';

export const initialOffset = 0;
export const initialLimit = 9;
export const ListCardHeight = 170;

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

export const callNumber = phone => {
    let phoneNumber = phone;
    phoneNumber = `tel:${phone}`;

    // if (isAndroid) {
    //     phoneNumber = `tel:${phone}`;
    // } else {
    //     phoneNumber = `telprompt:${phone}`;
    // }

    Linking.canOpenURL(phoneNumber)
        .then(supported => {
            if (!supported) {
                Alert.alert('Phone number is not available');
            } else {
                return Linking.openURL(phoneNumber);
            }
        })
        .catch(err => console.error(err));
};
