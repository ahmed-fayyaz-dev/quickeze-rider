import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { format } from 'date-fns';
import { useTheme } from 'react-native-paper';
import { connect } from 'react-redux';

import { icons } from 'assets/images';
import { CustomCaption } from 'src/components/customText';
import DrawerContent from 'src/components/drawer';
import { IonIcons } from 'src/helpers';
import { logout } from 'src/redux/common/actions/actions';
import { mgMs } from 'src/styles';
import { drawerActiveTint, drawerIcon } from 'src/styles/navCss';

import Dashboard from 'src/screens/dashboard';
import Playground from 'src/screens/playground';
import Dashboard2Stack from './navSlices/dashboard2Stack';
import MyOrdersStack from './navSlices/myOrderStack';
import OrdersStack from './navSlices/ordersStack';
import ProfileStack from './navSlices/profileStack';

const DrawerIcons = ({ size, focused, icon }) => (
    <Image
        source={icon}
        style={[focused ? null : null, { height: size, width: size }]}
    />
);

const headerRight = ({ style }) => (
    <>
        <CustomCaption style={style.time}>
            {format(new Date(), 'EEEE, MMMM')}
        </CustomCaption>
        <CustomCaption style={style.time}>
            {format(new Date(), 'd, yyy')}
        </CustomCaption>
    </>
);

const Drawer = createDrawerNavigator();

function DrawerNav({ logout, submitLoginReducer }) {
    const { colors } = useTheme();
    const style = styles(colors);

    const dashboardHeaderRight = () => headerRight({ style: style });

    return (
        <Drawer.Navigator
            useLegacyImplementation
            screenOptions={{
                // swipeEnabled: false,
                drawerActiveBackgroundColor: colors.primary,
                drawerActiveTintColor: drawerActiveTint,
                headerTitleAlign: 'center',
                headerStyle: { backgroundColor: colors.notification },
                headerTintColor: drawerActiveTint,
                drawerStyle: style.drawer,
                drawerItemStyle: style.drawerItem,
                drawerIcon: ({ color, size }) =>
                    IonIcons({ name: drawerIcon, size, color }),
            }}
            drawerContent={dCprops => (
                <DrawerContent
                    {...dCprops}
                    logout={logout}
                    submitLoginReducer={submitLoginReducer.data}
                    drawerItemStyle={style.drawerItem}
                />
            )}>
            <Drawer.Screen
                name="dashboard"
                component={Dashboard}
                options={{
                    level: 0,
                    title: 'Dashboard',
                    headerTitleContainerStyle: { height: 0, width: 0 },
                    headerRight: dashboardHeaderRight,
                    drawerIcon: ({ color, focused, size }) =>
                        DrawerIcons({
                            color,
                            focused,
                            size,
                            icon: icons.drawer.nearby,
                        }),
                }}
            />

            <Drawer.Screen
                name="dashboard2Stack"
                component={Dashboard2Stack}
                options={{
                    level: 0,
                    title: 'Dashboard2',
                    headerTitleContainerStyle: { height: 0, width: 0 },
                    drawerIcon: ({ color, focused, size }) =>
                        DrawerIcons({
                            color,
                            focused,
                            size,
                            icon: icons.drawer.nearby,
                        }),
                }}
            />

            <Drawer.Screen
                name="orderStack"
                component={OrdersStack}
                options={{
                    level: 1,
                    title: 'Orders',
                    drawerIcon: ({ color, focused, size }) =>
                        DrawerIcons({
                            color,
                            focused,
                            size,
                            icon: icons.drawer.orders,
                        }),
                }}
            />

            <Drawer.Screen
                name="myOrderStack"
                component={MyOrdersStack}
                options={{
                    level: 1,
                    title: 'My Orders',
                    drawerIcon: ({ color, focused, size }) =>
                        DrawerIcons({
                            color,
                            focused,
                            size,
                            icon: icons.drawer.myorders,
                        }),
                }}
            />

            <Drawer.Screen
                name="profileStack"
                component={ProfileStack}
                options={{
                    level: 1,
                    title: 'My Profile',
                    headerShown: false,
                    drawerIcon: ({ color, focused, size }) =>
                        DrawerIcons({
                            color,
                            focused,
                            size,
                            icon: icons.drawer.profile,
                        }),
                }}
            />

            <Drawer.Screen name="playground" component={Playground} />
        </Drawer.Navigator>
    );
}

function mapStateToProps({ submitLoginReducer }) {
    return {
        submitLoginReducer,
    };
}

export default connect(mapStateToProps, {
    logout,
})(DrawerNav);

const styles = () =>
    // colors
    StyleSheet.create({
        drawerItem: {},

        drawer: {
            width: 0.8 * Dimensions.get('window').width,
        },

        time: {
            color: drawerActiveTint,
            textAlign: 'right',
            marginHorizontal: mgMs,
        },
    });
