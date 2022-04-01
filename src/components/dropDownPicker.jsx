import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useTheme, TextInput } from 'react-native-paper';

import { IonIcons } from 'src/helpers';
import globalStyles, {
    bRss,
    buttonText,
    iconSize,
    mgMs,
    onBackgroundDark,
    // mgS,
    zIndexM,
    pdHs,
    zIndexL,
    pdVs,
    pdVss,
    bRm,
} from 'src/styles';
import { CustomText } from './customText';

export function CustomDropDownPicker({
    title,
    items,
    value,
    setValue,
    onSelectItem,
    placeholder,
    modalTitle,
    searchable,
}) {
    const { colors } = useTheme();
    const style = styles(colors);
    const gStyle = globalStyles();

    const [openDropDown, setOpenDropDown] = useState(false);

    return (
        <View style={[style.titledButtonView]}>
            <CustomText style={[style.titledButtonTitle]}>{title}</CustomText>
            <DropDownPicker
                open={openDropDown}
                value={value}
                items={items}
                setOpen={setOpenDropDown}
                setValue={setValue}
                onSelectItem={onSelectItem}
                // setItems={setItems}

                // props
                addCustomItem
                customItemContainerStyle
                placeholder={placeholder}
                searchPlaceholder="Search..."
                modalTitle={modalTitle}
                searchable={searchable}
                stickyHeader
                listMode="MODAL"
                modalProps={{
                    animationType: 'slide',
                }}
                flatListProps={{
                    keyExtractor: (item, index) => String(`modalItem${index}`),
                }}
                labelProps={{
                    numberOfLines: 1,
                }}
                //
                // components
                CloseIconComponent={() => (
                    <IonIcons
                        name="close"
                        color={colors.primary}
                        size={iconSize}
                    />
                )}
                // TickIconComponent={() => (
                //   <IonIcons name={"checkmark"} color={colors.primary} size={iconSize} />
                // )}

                // styles
                zIndex={zIndexM}
                style={style.dropDown}
                labelStyle={style.lable}
                placeholderStyle={style.placeholder}
                selectedItemLabelStyle={style.selectedLabel}
                searchContainerStyle={[style.searchContainer]}
                modalContentContainerStyle={style.modlaContainer}
                listItemContainerStyle={[style.listItem, gStyle.elevationS]}
                searchTextInputStyle={[style.searchbar, gStyle.elevationS]}
                selectedItemContainerStyle={[
                    style.selectedContainer,
                    gStyle.elevationS,
                ]}
            />
        </View>
    );
}

const styles = colors =>
    StyleSheet.create({
        dropDown: {
            // backgroundColor: colors.surface,
            backgroundColor: colors.background,
            borderRadius: bRm,
            zIndex: zIndexM,
            borderWidth: 0,
            paddingHorizontal: pdHs,
        },

        lable: {
            fontSize: buttonText,
            color: colors.text,
        },

        placeholder: {
            // fontSize: buttonText,
        },

        modlaContainer: {
            padding: mgMs,
            // borderWidth: StyleSheet.hairlineWidth,
            backgroundColor: colors.background,
            borderRadius: bRss,
        },

        searchContainer: {
            // backgroundColor: colors.notification,
        },

        searchbar: {
            backgroundColor: colors.surface,
        },

        closeIcon: { color: colors.primary },

        listItem: {
            // borderRadius: bRss,
            // marginTop: mgSs,
            // marginHorizontal: mgSs,
            // borderWidth: StyleSheet.hairlineWidth,
            marginTop: StyleSheet.hairlineWidth,
        },

        selectedLabel: {
            fontWeight: 'bold',
            color: onBackgroundDark,
        },

        selectedContainer: {
            backgroundColor: colors.primary,
            marginTop: StyleSheet.hairlineWidth,
        },

        titledButtonTitle: {
            textAlign: 'left',
            position: 'absolute',
            zIndex: zIndexL,
            borderRadius: bRss,
            top: -pdVs,
            left: pdHs,
            paddingHorizontal: pdVss,
            color: colors.text,
            backgroundColor: colors.background,
        },

        titledButtonView: {
            borderWidth: 1,
            borderRadius: bRm,
            borderColor: colors.placeholder,
            // backgroundColor: colors.surface,
            // backgroundColor: colorDictionary.colorSet[appearance].background,
        },
    });
