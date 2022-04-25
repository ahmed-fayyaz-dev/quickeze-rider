import React, { Suspense } from 'react';
import { View, StyleSheet } from 'react-native';
import { Col } from 'react-native-easy-grid';
import { useTheme, TouchableRipple } from 'react-native-paper';

import { CustomCaption, CustomSubheading } from 'src/components/customText';
import { GapH, GapV } from 'src/components/gap';
import { Loader } from 'src/components/loaders';
import { SingleSidedShadowBottom } from 'src/components/shadowWrappers';
import { currency, converTime, getOrderStatus } from 'src/helpers';
import globalStyles, { bRs, pdHm, pdVs } from 'src/styles';
import DropDown from './changeOrderStatusDropdown';
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
        orderStatus,
    } = data;
    const { colors } = useTheme();
    const style = styles(colors);
    const gStyle = globalStyles(colors);

    async function handle() {
        await onPress(orderIndex, orderId);
    }

    function _onCardPress() {
        onCardPress(orderIndex, orderId);
    }

    function _getOrderStatus() {
        return getOrderStatus(orderStatus);
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

    const OrderStatus = () => <DropDown selectedValue={orderStatus} />;

    const CardBottom = () => {
        return (
            <>
                <View style={style.buttonView}>
                    {/* <Grid> */}
                    <CustomCaption>{converTime(creationTime)}</CustomCaption>

                    <GapH />
                    <Col size={50}>{OrderStatus()}</Col>
                    {/* </Grid> */}
                </View>
            </>
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

        orderStatus: {
            color: colors.notification,
        },
    });
