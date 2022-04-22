import React, { useRef, forwardRef, useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { Modalize } from 'react-native-modalize';
import { Portal, useTheme } from 'react-native-paper';

import { CutomButtonRNGH } from 'src/components/buttons';
import { CustomTitle, CustomSubheading } from 'src/components/customText';
import { Divider } from 'src/components/dividers';
import { GapV } from 'src/components/gap';
import {
    windowHeigth,
    OpenMapsWithLangLat,
    getChangeOrderToTitle,
} from 'src/helpers';
import globalStyle, { onBackgroundDark, mgL } from 'src/styles';
import { callNumber } from './helpers';
import OrderDetailTable from './orderDetail';
import { BackgroundImage } from './orderListImage';

const DetailModal = (props, ref) => {
    const { item, onPress, index } = props;
    const contentRef = useRef(null);
    const { colors } = useTheme();
    const style = styles(colors);
    const gStyle = globalStyle(colors);
    const changeOrderText = getChangeOrderToTitle(item?.orderStatus);

    function handleChangeStatus() {
        // ref.current.close();
        // onPress(index, item?.orderId);
    }

    function handleSourceLocation() {
        let loc = item?.source;
        let title = item?.orderName;
        OpenMapsWithLangLat(loc, title);
    }

    function handleDestinationLocation() {
        let loc = item?.destination;
        let title = item?.sourceAddress;
        OpenMapsWithLangLat(loc, title);
    }

    function handlecallSource() {
        callNumber(item?.sourceNumber);
    }

    function handleCallDestination() {
        callNumber(item?.destinationNumber);
    }

    const ImageView = () => {
        return (
            <BackgroundImage uri={item?.orderImage}>
                <BlurView intensity={70} tint="dark" style={style.imageView}>
                    <CustomTitle style={style.imageText}>
                        {item?.orderName}
                    </CustomTitle>
                </BlurView>
            </BackgroundImage>
        );
    };

    const Details = () => <OrderDetailTable item={item} />;

    const SourceButton = () => (
        <>
            <View style={style.row}>
                <CustomSubheading style={style.subHeading}>
                    Shop
                </CustomSubheading>
                <Divider />
            </View>
            <View style={style.btnRow}>
                <CutomButtonRNGH
                    mode="outline"
                    title={'Location'}
                    icon="location-outline"
                    onPress={handleSourceLocation}
                />
                <CutomButtonRNGH
                    mode="outline"
                    title={'Call'}
                    icon="call-outline"
                    onPress={handlecallSource}
                />
            </View>
        </>
    );

    const DestinationButton = () => (
        <>
            <View style={style.row}>
                <CustomSubheading style={style.subHeading}>
                    Customer
                </CustomSubheading>
                <Divider />
            </View>
            <View style={style.btnRow}>
                <CutomButtonRNGH
                    mode="outline"
                    title={'Location'}
                    icon="location-outline"
                    onPress={handleDestinationLocation}
                />
                <CutomButtonRNGH
                    mode="outline"
                    title={'Call'}
                    icon="call-outline"
                    onPress={handleCallDestination}
                />
            </View>
        </>
    );

    const Buttons = () => (
        <>
            {SourceButton()}
            {DestinationButton()}
            <GapV small />
            <CutomButtonRNGH
                title={`Change Status to "${changeOrderText}"`}
                onPress={handleChangeStatus}
            />
        </>
    );

    const orderDetail = () => {
        return (
            <View style={gStyle.contentBody}>
                {Buttons()}
                <CustomTitle>{`Order Details`}</CustomTitle>
                {Details()}
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
            // backgroundColor: 'rgba(0,0,0,0.4)',
            flexDirection: 'column-reverse',
            paddingBottom: mgL,
        },

        imageText: {
            color: onBackgroundDark,
        },

        btnRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },

        subHeading: {
            fontWeight: 'bold',
            textAlign: 'left',
        },

        row: {
            flexDirection: 'row',
        },
    });
