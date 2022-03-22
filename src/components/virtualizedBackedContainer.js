import React, { useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';

export default function VirtualizedView(props) {
    const {
        style,
        contentContainerStyle,
        refresh,
        refreshing = false,
        onRefresh,
    } = props;
    const [refreshState] = useState(refreshing);

    return (
        <FlatList
            data={[]}
            refreshControl={
                refresh && (
                    <RefreshControl
                        refreshing={refreshState}
                        onRefresh={onRefresh}
                    />
                )
            }
            key={`VirtualizedView${Math.random()}`}
            ListEmptyComponent={null}
            horizontal={props.horizontal}
            keyExtractor={() => 'dummy'}
            renderItem={null}
            contentContainerStyle={[{ flexGrow: 1 }, contentContainerStyle]}
            ListHeaderComponent={() => <>{props.children}</>}
            ListHeaderComponentStyle={style}
        />
    );
}
