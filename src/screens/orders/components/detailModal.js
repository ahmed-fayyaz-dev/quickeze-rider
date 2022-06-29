import React, { useRef, forwardRef, useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Button } from 'react-native';

import { Modalize } from 'react-native-modalize';
import { Portal, useTheme, DataTable } from 'react-native-paper';

import { CutomRoundButtonRNGH } from 'src/components/buttons';
import { CustomTitle } from 'src/components/customText';
import { GapV } from 'src/components/gap';
import { windowHeigth } from 'src/helpers';
import globalStyle, { pdVm, onBackgroundDark, mgL, title } from 'src/styles';
import OrderDetailTable from './orderDetail';
import { BackgroundImage } from './orderListImage';

const DetailModal = (props, ref) => {
    const { item, onPress, index, btn } = props;
    const contentRef = useRef(null);
    const { colors } = useTheme();
    const style = styles(colors);
    const gStyle = globalStyle(colors);

    function handleAccept() {
        // ref.current.close();
        onPress(index, item?.orderId);
    }

    const handleSnap = () => {
        if (contentRef.current) {
            contentRef.current.getScrollResponder().scrollTo({
                y: 300,
                animated: true,
            });
        }
    };

    const ImageView = () => {
        return (
            <BackgroundImage uri={item?.orderImage}>
                <View style={style.imageView}>
                    <CustomTitle style={style.imageText}>
                        {item?.orderName}
                    </CustomTitle>
                </View>
            </BackgroundImage>
        );
    };

    const Details = () => <OrderDetailTable item={item} />;

    const orderDetail = () => {
        return (
            <View style={gStyle.contentBody}>
                <CustomTitle>{`Order Details`}</CustomTitle>

                {Details()}

                <CutomRoundButtonRNGH
                    title={'Accept Order'}
                    onPress={handleAccept}
                />
            </View>
        );
    };

    const RenderContent = () => {
        return (
            <View style={[style.content]}>
                {ImageView()}
                {orderDetail()}
                <GapV small />
            </View>
        );
    };

    return (
        <Portal>
            <Modalize
                ref={ref}
                contentRef={contentRef}
                snapPoint={windowHeigth * 0.6}
                scrollViewProps={{
                    contentContainerStyle: style.container,
                }}>
                {item ? <RenderContent /> : null}
            </Modalize>
        </Portal>
    );
};

export default forwardRef(DetailModal);

const styles = colors =>
    StyleSheet.create({
        container: {
            flexGrow: 1,
        },

        content: { flex: 1 },

        imageView: {
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.4)',
            flexDirection: 'column-reverse',
            paddingBottom: mgL,
        },

        imageText: {
            color: onBackgroundDark,
        },
    });
