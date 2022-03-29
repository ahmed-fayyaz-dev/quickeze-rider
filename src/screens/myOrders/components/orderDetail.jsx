import * as React from 'react';
import { StyleSheet } from 'react-native';
import { DataTable, withTheme } from 'react-native-paper';
import { CustomText } from 'src/components/customText';

const OrderDetailTable = props => {
    const { item } = props;
    const { colors } = props.theme;
    const style = styles(colors);

    const DetailsRows = () => (
        <>
            <DataTable.Row style={style.row}>
                <CustomText style={style.subHeading}>
                    {`Order Number`}
                </CustomText>

                <CustomText style={[style.values, style.orderNumber]}>
                    {item?.orderNumber}
                </CustomText>
            </DataTable.Row>

            <DataTable.Row style={style.row}>
                <CustomText style={style.subHeading}>{`Order From`}</CustomText>

                <CustomText style={[style.values, style.orderFrom]}>
                    {item?.orderName}
                </CustomText>
            </DataTable.Row>

            <DataTable.Row style={style.row}>
                <CustomText style={style.subHeading}>
                    {`Delivery address`}
                </CustomText>

                <CustomText style={[style.values, style.bold]}>
                    {item?.destinationAddress}
                </CustomText>
            </DataTable.Row>

            <DataTable.Row style={style.rowWithBorder}>
                <CustomText style={style.subHeading}>{`Total`}</CustomText>

                <CustomText style={[style.values, style.bold]}>
                    {item?.currencyCode + ' ' + item?.totalPrice}
                </CustomText>
            </DataTable.Row>
        </>
    );

    const ProductsRow = ({ p, i }) => (
        <>
            <DataTable.Row
                style={
                    i === item?.products?.length - 1
                        ? style.rowWithBorder
                        : style.row
                }>
                <CustomText style={style.subHeading}>
                    {p?.productUnit + 'x  ' + p?.product}
                </CustomText>

                <CustomText style={[style.values]}>
                    {item?.currencyCode + ' ' + p?.productPrice}
                </CustomText>
            </DataTable.Row>
        </>
    );

    const ProductsRows = () =>
        item?.products.map((p, i) => <ProductsRow key={i} p={p} i={i} />);

    const PriceRows = () => (
        <>
            <DataTable.Row style={style.row}>
                <CustomText style={style.subHeading}>{`SubTotal`}</CustomText>

                <CustomText style={[style.values]}>
                    {item?.currencyCode + ' ' + item?.subTotalPrice}
                </CustomText>
            </DataTable.Row>

            <DataTable.Row style={style.row}>
                <CustomText
                    style={style.subHeading}>{`Delivery Fee`}</CustomText>

                <CustomText style={[style.values]}>
                    {item?.currencyCode + ' ' + item?.deliveryFee}
                </CustomText>
            </DataTable.Row>

            <DataTable.Row style={style.row}>
                <CustomText
                    style={[
                        style.subHeading,
                        style.bold,
                    ]}>{`Total`}</CustomText>

                <CustomText style={[style.values, style.bold]}>
                    {item?.currencyCode + ' ' + item?.totalPrice}
                </CustomText>
            </DataTable.Row>
        </>
    );

    return (
        <DataTable>
            {DetailsRows()}
            {ProductsRows()}
            {PriceRows()}
        </DataTable>
    );
};

export default withTheme(OrderDetailTable);

const styles = colors =>
    StyleSheet.create({
        row: {
            justifyContent: 'space-between',
            alignContent: 'space-between',
            borderBottomWidth: 0,
        },

        rowTopBorder: {
            justifyContent: 'space-between',
            alignContent: 'space-between',
            borderTopWidth: 1,
        },

        rowWithBorder: {
            justifyContent: 'space-between',
            alignContent: 'space-between',
            borderBottomWidth: 1,
        },

        subHeading: {
            textAlign: 'left',
            width: '35%',
        },

        values: {
            width: '65%',
            textAlign: 'right',
        },

        orderNumber: {
            color: colors.primary,
        },

        orderFrom: {
            fontWeight: 'bold',
            color: colors.notification,
        },

        bold: {
            fontWeight: 'bold',
        },
    });
