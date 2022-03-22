import React, { Suspense, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

import { Loader } from 'src/components/ActivityIndicators';
import { CustomSquareButton } from 'src/components/buttons';
import { CustomCaption, CustomSubheading } from 'src/components/customText';
import { GapH, GapV } from 'src/components/gap';
import { SingleSidedShadowBottom } from 'src/components/shadowWrappers';
import { currency, converTime } from 'src/helpers';
import globalStyles, { bRs, pdHm, pdVs } from 'src/styles';
import { ListCardHeight } from './helpers';
import { Image } from './orderListImage';

function ListCard({ data, orderIndex, onPress }) {
    const {
        orderId,
        orderName,
        orderImage,
        products,
        totalPrice,
        creationTime,
    } = data;
    const { colors } = useTheme();
    const style = styles(colors);
    const gStyle = globalStyles(colors);

    function handleAccept() {
        onPress(orderIndex, orderId);
    }

    const ImageRef = () => (
        <>
            <Image uri={orderImage} />
            <GapH small />
        </>
    );
    // const OrderImage = useCallback(ImageRef, [orderImage]);

    const Products = () => (
        <CustomCaption style={style.productNames}>
            {products.map(
                (pItem, i, arr) =>
                    pItem.productName + (i !== arr.length - 1 ? ', ' : ''),
            )}
        </CustomCaption>
    );
    // const ProductNames = useCallback(Products, [products, style]);

    const OrderDesc = () => (
        <View style={style.textView}>
            <CustomSubheading style={style.title}>{orderName}</CustomSubheading>
            <CustomSubheading style={style.title}>
                {currency + ' ' + totalPrice}
            </CustomSubheading>
            <Products />
        </View>
    );

    const CardBottom = () => {
        return (
            <View style={style.buttonView}>
                <CustomCaption>{converTime(creationTime)}</CustomCaption>
                <CustomSquareButton onPress={handleAccept} title="Accept" />
            </View>
        );
    };

    const CardRow = () => {
        return (
            <View style={style.row}>
                <ImageRef />
                <OrderDesc />
            </View>
        );
    };

    return (
        <Suspense fallback={<Loader show />}>
            <SingleSidedShadowBottom key={orderId}>
                <View style={[style.container, gStyle.elevationS]}>
                    <CardRow />
                    <GapV small />
                    <CardBottom />
                </View>
            </SingleSidedShadowBottom>
        </Suspense>
    );
}

export default ListCard;

const styles = colors =>
    StyleSheet.create({
        container: {
            height: ListCardHeight,
            paddingVertical: pdVs,
            paddingHorizontal: pdHm,
            borderRadius: bRs,
            backgroundColor: colors?.surface,
            overflow: 'hidden',
        },

        title: { fontWeight: 'bold', textAlign: 'left' },

        productNames: { textAlign: 'left' },

        row: {
            flexDirection: 'row',
        },

        textView: { flex: 1 },

        buttonView: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
    });
