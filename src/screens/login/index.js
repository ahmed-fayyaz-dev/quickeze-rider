import React, { useState } from 'react';
import Animated, {
  BounceInDown,
  BounceOutDown,
  Layout,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';
import { connect } from 'react-redux';
import { useTheme, Divider } from 'react-native-paper';
import {
  ScrollView, View, StyleSheet, Image, StatusBar,
} from 'react-native';

import { icons } from '../../../assets/images';
import { GapV } from '../../components/gap';
import CustomInput from '../../components/CustomInput';
import { CustomRoundButton } from '../../components/buttons';
import { IonIcons, setStorageItem } from '../../constants';
import { CustomCheckbox } from '../../components/CustomCheckbox';
import { CustomSnackbar } from '../../components/customSnackbar';
import gloabalStyle, {
  bRm,
  iconSizeL,
  mgM,
  mgMs,
  mgS,
  onBackgroundDark,
} from '../../styles/index';
import {
  CustomCaption,
  CustomSubheading,
  CustomText,
} from '../../components/customText';

import { callApi } from '../../constants/apiCall';
import { submitLoginAccount } from './actions/actions';
import { submitGetDashboardData } from '../dashboard/actions/actions';

function Login({ navigation, submitLoginReducer, submitLoginAccount }) {
  const { colors } = useTheme();
  const gStyle = gloabalStyle(colors);
  const style = styles(colors);

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoadingState] = useState(false);
  const [visibleSnack, setVisibleSnack] = useState(false);
  const [snackMsg, setSnackMsg] = useState('');

  // Navigate
  function navigate() {
    if (remember) {
      setStorageItem('id', id);
      setStorageItem('password', password);
      setStorageItem('onboard', true);
    }

    navigation.reset({
      index: 0,
      routes: [{ name: 'drawerNav' }],
    });
  }

  // OnLoginPress
  async function handleSubmitLogin() {
    const data = {
      email: id.toLocaleLowerCase(),
      password,
    };

    await callApi({
      data,
      setLoading: setLoadingState,
      callApiReducer: submitLoginReducer,
      submitCallApi: submitLoginAccount,

      successFunc: () => {
        navigate();
      },

      errFunc: () => {},
      catchFunc: () => {},
    });
  }

  function onDismissSnackBar() {
    setVisibleSnack(false);
  }

  function showSnack(msg) {
    setSnackMsg(msg);
    setVisibleSnack(true);
  }

  function onPress() {
    if (id !== '' && password !== '') {
      handleSubmitLogin();
    } else {
      showSnack('Enter Values');
    }
  }

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} style={style.container}>
      <ScrollView contentContainerStyle={[gStyle.fg, style.content]}>
        <Animated.View
          entering={BounceInDown}
          exiting={BounceOutDown}
          layout={Layout.springify()}
          style={style.loginView}
        >
          <IonIcons
            style={style.icon}
            name="person-outline"
            size={iconSizeL}
          />

          <CustomSubheading style={style.title}>LOGIN</CustomSubheading>

          <GapV small />

          <CustomInput
            colors={colors}
            onChange={setId}
            label="Employee Id"
            state={id}
            roundness={bRm}
          />

          <GapV small />

          <CustomInput
            colors={colors}
            onChange={setPassword}
            label="Password"
            state={password}
            secure
            roundness={bRm}
          />

          <GapV small />

          <View style={gStyle.fdr}>
            <CustomCheckbox
              status={remember}
              onPress={() => setRemember(!remember)}
            />

            <CustomText>Remember Me</CustomText>
          </View>

          <GapV large />

          <View style={gStyle.bottomContainer}>
            <GapV />

            <CustomRoundButton
              title="Login"
              colors={colors}
              gStyle={gStyle}
              loading={loading}
              icon="arrow-forward"
              onPress={onPress}
            />
          </View>
        </Animated.View>

        <View>
          <Image
            resizeMode="contain"
            source={icons.app.logoLargeW}
            style={style.image}
          />

          <GapV small />
          <Divider style={[gStyle.divider, style.divider]} />
          <GapV small />

          <CustomCaption style={style.subText}>
            Please Login to your Account
          </CustomCaption>

          <GapV />
        </View>
      </ScrollView>
      <CustomSnackbar
        visible={visibleSnack}
        onDismiss={onDismissSnackBar}
        style={gStyle.snackBar}
        textStyle={gStyle.snackText}
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

export const styles = (colors) => StyleSheet.create({
  container: {
    backgroundColor: colors.notification,
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },

  content: {
    flexDirection: 'column-reverse',
  },

  image: {
    alignSelf: 'center',
    height: 66,
  },

  divider: {
    alignSelf: 'center',
    backgroundColor: onBackgroundDark,
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
});
