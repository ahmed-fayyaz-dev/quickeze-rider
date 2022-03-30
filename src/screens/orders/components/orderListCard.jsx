import React, { Suspense } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme, TouchableRipple } from 'react-native-paper';

import { Loader } from 'src/components/ActivityIndicators';
import { CustomSquareButton } from 'src/components/buttons';
import { CustomCaption, CustomSubheading } from 'src/components/customText';
import { GapH, GapV } from 'src/components/gap';
import { SingleSidedShadowBottom } from 'src/components/shadowWrappers';
import { currency, converTime } from 'src/helpers';
import globalStyles, { bRs, pdHm, pdVs } from 'src/styles';
import { ListCardHeight } from './helpers';
import { Image } from './orderListImage';

function ListCard({ data, orderIndex, onPress, onCardPress }) {
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

    async function handleAccept() {
        await onPress(orderIndex, orderId);
    }

    function _onCardPress() {
        setTimeout(() => onCardPress(orderIndex, orderId), 800);
    }

    const ImageRef = () => (
        <>
            <Image uri={orderImage} />
            <GapH small />
        </>
    );

    const Products = () => (
        <CustomCaption style={style.productNames} numberOfLines={1}>
            {products.map(
                (pItem, i, arr) =>
                    pItem.productName + (i !== arr.length - 1 ? ', ' : ''),
            )}
        </CustomCaption>
    );

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

    if (orderId)
        return (
            <Suspense fallback={() => <Loader show />}>
                <SingleSidedShadowBottom key={orderId}>
                    <TouchableRipple
                        // rippleColor="rgba(0,0,0,.37)"
                        style={[gStyle.elevationS, style.container]}
                        onPress={_onCardPress}>
                        <>
                            <CardRow />
                            <GapV small />
                            <CardBottom />
                        </>
                    </TouchableRipple>
                </SingleSidedShadowBottom>
            </Suspense>
        );
    else return null;
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
