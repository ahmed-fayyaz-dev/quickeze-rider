import React from 'react';
import {
    ScrollView,
    View,
    StyleSheet,
    Image,
    StatusBar,
    TouchableOpacity,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import Animated from 'react-native-reanimated';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { icons } from 'assets/images';
import { CustomCaption, CustomSubheading } from 'src/components/customText';
import { DividerV } from 'src/components/divider';
import { GapV } from 'src/components/gap';
import { IonIcons } from 'src/helpers';
import { entering, exiting, layoutSpring } from 'src/helpers/animation';
import {
    iconSizeL,
    mgM,
    mgMs,
    mgS,
    onBackgroundDark,
    hitSlopS,
} from 'src/styles/index';

import Form from './components/form';

function Login({ navigation }) {
    const { colors } = useTheme();
    const style = styles(colors);

    function naivgateToSignup() {
        navigation.navigate('signup');
    }

    const TopView = () => (
        <View>
            <Image
                resizeMode="contain"
                source={icons.app.logoLargeW}
                style={style.image}
            />
            <GapV small />

            <DividerV m invertBg />
            <GapV small />

            <CustomCaption style={style.subText}>
                {`Please Login to your Account`}
            </CustomCaption>

            <GapV />
        </View>
    );

    const SignupView = () => (
        <TouchableOpacity
            onPress={naivgateToSignup}
            hitSlop={hitSlopS}
            style={style.signupBtn}>
            <CustomCaption>
                {`Don't have an account? `}
                <CustomSubheading
                    style={style.signupText}>{`Sign up.`}</CustomSubheading>
            </CustomCaption>
        </TouchableOpacity>
    );

    const LoginView = () => (
        <Animated.View
            entering={entering}
            exiting={exiting}
            layout={layoutSpring}
            style={style.loginView}>
            <IonIcons
                style={style.icon}
                name="person-outline"
                size={iconSizeL}
            />

            <CustomSubheading style={style.title}>LOGIN</CustomSubheading>
            <GapV small />

            <Form navigation={navigation} />

            {SignupView()}
            <GapV small />
        </Animated.View>
    );

    return (
        <View style={style.container}>
            <ScrollView contentContainerStyle={[style.content]}>
                {LoginView()}
                {TopView()}
            </ScrollView>
        </View>
    );
}

function mapStateToProps() {
    return {};
}

function mapDipatchToProps(dispatch, getState) {
    return bindActionCreators({}, dispatch, getState);
}

export default connect(mapStateToProps, mapDipatchToProps)(Login);

const styles = colors =>
    StyleSheet.create({
        container: {
            backgroundColor: colors.notification,
            flex: 1,
            paddingTop: StatusBar.currentHeight,
        },

        loginView: {
            backgroundColor: colors.background,
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

        content: {
            flexDirection: 'column-reverse',
            flexGrow: 1,
        },

        image: {
            alignSelf: 'center',
            height: 180,
            tintColor: onBackgroundDark,
        },

        subText: {
            color: onBackgroundDark,
        },

        title: {
            fontWeight: 'bold',
        },

        icon: { alignSelf: 'center' },

        signupText: {
            fontWeight: 'bold',
            color: colors?.primary,
        },
    });
