import React from 'react';
import {
    Dimensions, Image, StyleSheet, View,
} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { format } from 'date-fns';
import { useTheme } from 'react-native-paper';
import { connect } from 'react-redux';

import { icons } from 'assets/images';
import { CustomCaption } from 'src/components/customText';
import DrawerContent from 'src/components/drawer';
import { IonIcons } from 'src/constants';

import { logout } from 'src/redux/common/actions/actions';

// screens
import Dashboard from 'src/screens/dashboard';
import { Playground } from 'src/screens/playground';
import { mgMs } from 'src/styles';
import { drawerActiveTint, drawerIcon } from 'src/styles/navCss';

const Drawer = createDrawerNavigator();

function DrawerNav(props) {
    const { colors } = useTheme();
    const style = styles(colors);

    function DrawerIcons({ size, focused, icon }) {
        return (
            <Image
                source={icon}
                style={[focused ? null : null, { height: size, width: size }]}
            />
        );
    }

    const headerRight = () => (
        <View>
            <CustomCaption style={style.time}>
                {format(new Date(), 'EEEE, MMMM')}
            </CustomCaption>
            <CustomCaption style={style.time}>
                {format(new Date(), 'd, yyy')}
            </CustomCaption>
        </View>
    );

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
                drawerIcon: ({ color, size }) => (
                    <IonIcons name={drawerIcon} size={size} color={color} />
                ),
            }}
            drawerContent={(dCprops) => (
                <DrawerContent
                    {...dCprops}
                    logout={props.logout}
                    submitLoginReducer={props.submitLoginReducer.data}
                    drawerItemStyle={style.drawerItem}
                />
            )}
        >
            <Drawer.Screen
                name="dashboard"
                component={Dashboard}
                options={{
                    title: 'Dashboard',
                    headerTitleContainerStyle: { height: 0, width: 0 },
                    headerRight,

                    drawerIcon: ({ color, focused, size }) => (
                        <DrawerIcons
                            color={color}
                            focused={focused}
                            size={size}
                            icon={icons.drawer.report}
                        />
                    ),
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
