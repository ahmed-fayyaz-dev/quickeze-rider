import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Image, StatusBar } from 'react-native';
import { useTheme, Divider } from 'react-native-paper';
import Animated, {
    BounceInDown,
    BounceOutDown,
    Layout,
    FadeIn,
    FadeOut,
} from 'react-native-reanimated';
import { connect } from 'react-redux';

import { icons } from 'assets/images';
import { CustomSnackbar } from 'src/components/customSnackbar';
import { CustomCaption, CustomSubheading } from 'src/components/customText';
import { GapV } from 'src/components/gap';
import { IonIcons } from 'src/helpers';
import { submitGetDashboardData } from 'src/screens/dashboard/actions/actions';
import { iconSizeL, mgM, mgMs, mgS, onBackgroundDark } from 'src/styles/index';
import { submitLoginAccount } from './actions/actions';

import { Form } from './components/form';

function Login({ navigation, submitLoginReducer, submitLoginAccount }) {
    const { colors } = useTheme();
    const style = styles(colors);

    const [formState, setFormState] = useState();
    const [loading, setLoadingState] = useState(false);
    const [visibleSnack, setVisibleSnack] = useState(false);
    const [snackMsg, setSnackMsg] = useState('');

    // Navigate
    function navigate() {
        navigation.reset({
            index: 0,
            routes: [{ name: 'drawerNav' }],
        });
    }

    // OnLoginPress
    async function handleSubmitLogin() {
        // const data = formState;
        // await callApi({
        //   data,
        //   setLoading: setLoadingState,
        //   callApiReducer: submitLoginReducer,
        //   submitCallApi: submitLoginAccount,
        //   successFunc: () => {
        //     navigate();
        //   },
        //   errFunc: () => {},
        //   catchFunc: () => {},
        // });
    }

    function onDismissSnackBar() {
        setVisibleSnack(false);
    }

    function showSnack(msg) {
        setSnackMsg(msg);
        setVisibleSnack(true);
    }

    function onPress(v) {
        setFormState(v);
        handleSubmitLogin();
    }

    const TopView = () => (
        <View>
            <Image
                resizeMode="contain"
                source={icons.app.logoLargeW}
                style={style.image}
            />
            <GapV small />

            <Divider style={[style.divider]} />
            <GapV small />

            <CustomCaption style={style.subText}>
                Please Login to your Account
            </CustomCaption>

            <GapV />
        </View>
    );

    const LoginView = () => (
        <Animated.View
            entering={BounceInDown}
            exiting={BounceOutDown}
            layout={Layout.springify()}
            style={style.loginView}>
            <IonIcons
                style={style.icon}
                name="person-outline"
                size={iconSizeL}
            />

            <CustomSubheading style={style.title}>LOGIN</CustomSubheading>
            <GapV small />

            <Form onSubmit={navigate} />
        </Animated.View>
    );

    return (
        <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            style={style.container}>
            <ScrollView contentContainerStyle={[style.content]}>
                {LoginView()}
                {TopView()}
            </ScrollView>
            <CustomSnackbar
                visible={visibleSnack}
                onDismiss={onDismissSnackBar}
                msg={`${snackMsg}`}
            />
        </Animated.View>
    );
}

function mapStateToProps({
    submitLoginReducer,
    getDashboardDataReducer,
    companyIdReducer,
    gDateReducer,
    gMonthReducer,
}) {
    return {
        submitLoginReducer,
        getDashboardDataReducer,
        companyIdReducer,
        gDateReducer,
        gMonthReducer,
    };
}

export default connect(mapStateToProps, {
    submitLoginAccount,
    submitGetDashboardData,
})(Login);

const styles = colors =>
    StyleSheet.create({
        container: {
            backgroundColor: colors.notification,
            flex: 1,
            paddingTop: StatusBar.currentHeight,
        },

        content: {
            flexDirection: 'column-reverse',
            flexGrow: 1,
        },

        image: {
            alignSelf: 'center',
            height: 66,
        },

        fdr: { flexDirection: 'row' },

        divider: {
            alignSelf: 'center',
            backgroundColor: onBackgroundDark,
            height: 1,
            width: '80%',
        },

        subText: {
            color: onBackgroundDark,
        },

        title: {
            fontWeight: 'bold',
        },

        icon: { alignSelf: 'center' },

        loginView: {
            backgroundColor: colors.surface,
            borderTopStartRadius: 40,
            borderTopEndRadius: 40,
            paddingHorizontal: mgMs,
            paddingTop: mgM,
            marginHorizontal: mgS,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 8,
            },
            shadowOpacity: 0.46,
            shadowRadius: 11.14,
            elevation: 17,
            zIndex: 17,
        },

        revBottomContainer: {
            flexDirection: 'column-reverse',
            flex: 1,
        },
    });
