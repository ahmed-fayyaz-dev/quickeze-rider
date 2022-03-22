import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import { useTheme } from '@react-navigation/native';
import { nativeApplicationVersion } from 'expo-application';
import { useTheme as paperTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { icons } from 'assets/images/index';
import { CustomIconButton } from 'src/components/buttons';
import { IonIcons, removeStorageItem } from 'src/helpers';
import { bRss, mgS, onBackgroundDark, pdHm } from 'src/styles';
import { iconSize } from 'src/styles/navCss';
import { CustomCaption, CustomSubheading, CustomText } from './customText';
import { GapH } from './gap';

const navigateTo = ({ navigation, name }) => {
    navigation.closeDrawer();
    setTimeout(() => navigation.navigate(name), 400);
};

const signOutFunc = ({ logout, navigation }) => {
    removeStorageItem('id');
    removeStorageItem('onboard');
    removeStorageItem('password');
    logout();
    navigation.reset({
        index: 0,
        routes: [{ name: 'authStack' }],
    });
};

const BackIcon = ({ colors, navigation }) => (
    <CustomIconButton
        size={iconSize}
        color={colors.primary}
        name={'chevron-back-outline'}
        onPress={() => navigation.toggleDrawer()}
    />
);

const DrawerAccountInfo = ({ colors, profileUrl, submitLoginReducer }) => {
    const style = styles(colors);
    return (
        <View style={[style.accountInfo]}>
            <Image
                source={{
                    uri: profileUrl,
                }}
                resizeMode="cover"
                style={[style.roundImage]}
            />
            <GapH small={true} />

            <View>
                <CustomText style={style.textLeft}>
                    {submitLoginReducer?.session?.employeename}
                </CustomText>
                <CustomCaption style={style.textLeft}>
                    {submitLoginReducer?.users?.empCode}
                </CustomCaption>
            </View>
        </View>
    );
};

const CustomDrawerList = ({ state, descriptors, navigation }) => {
    return state.routes.map(route => {
        const {
            title,
            drawerIcon,
            drawerItemStyle,
            drawerActiveTintColor,
            drawerActiveBackgroundColor,
        } = descriptors[route.key].options;

        return (
            <DrawerItem
                key={route.key}
                icon={drawerIcon}
                style={drawerItemStyle}
                label={title || route.name}
                activeTintColor={drawerActiveTintColor}
                activeBackgroundColor={drawerActiveBackgroundColor}
                onPress={() => navigateTo({ navigation, name: route.name })}
                focused={
                    state.routes.findIndex(e => e.name === route.name) ===
                    state.index
                }
            />
        );
    });
};

function DrawerContent(props) {
    const { colors } = useTheme();
    const { colors: paperColors } = paperTheme();
    const style = styles(paperColors);
    const { state, descriptors, navigation } = props;
    const { profileUrl, submitLoginReducer, logout, drawerItemStyle } = props;

    return (
        <SafeAreaView style={style.container}>
            <View style={[style.drawerTopView]}>
                {BackIcon({ colors, navigation })}
                {DrawerAccountInfo({ colors, profileUrl, submitLoginReducer })}
            </View>

            <DrawerContentScrollView {...props}>
                <CustomSubheading style={[style.menuText]}>
                    MENU
                </CustomSubheading>
                {/* Drawer Screens List */}
                {CustomDrawerList({ state, descriptors, navigation })}
                {/* Drawer Signout item */}
                <DrawerItem
                    onPress={() => signOutFunc({ logout, navigation })}
                    icon={({ size, color }) =>
                        IonIcons({ size, name: 'exit-outline', color })
                    }
                    label="Sign Out"
                    style={drawerItemStyle}
                />
            </DrawerContentScrollView>

            <View style={[style.drawerBottomView]}>
                <CustomCaption>
                    App version {nativeApplicationVersion}
                </CustomCaption>
                <Image
                    resizeMode="contain"
                    source={icons.app.logoSmallB}
                    style={[style.logoImage]}
                />
            </View>
        </SafeAreaView>
    );
}

export default DrawerContent;

const styles = colors =>
    StyleSheet.create({
        container: { flex: 1 },

        menuText: {
            margin: mgS,
            padding: mgS,
            textAlign: 'left',
            fontWeight: 'bold',
            borderRadius: bRss,
            color: onBackgroundDark,
            backgroundColor: colors.notification,
        },

        textLeft: { textAlign: 'left' },

        drawerBottomView: {
            marginBottom: mgS,
            paddingHorizontal: pdHm,
            flexDirection: 'row-reverse',
            justifyContent: 'space-between',
        },

        drawerTopView: {
            flexDirection: 'row-reverse',
        },

        roundImage: {
            width: 65,
            height: 65,
            overflow: 'hidden',
            borderRadius: 65 / 2,
        },

        accountInfo: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            margin: mgS,
        },

        logoImage: { maxWidth: 80, maxHeight: 80 },
    });
