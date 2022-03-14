import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
// import i18n from "i18n-js";
import { View } from 'react-native';
// import { useTheme } from "react-native-paper";
import Animated, { BounceInUp, Layout, FadeOut } from 'react-native-reanimated';

/* CustomFuncs/components/etc */
import gloabalStyle from '../../styles/index';
import { CustomSnackbar } from '../../components/customSnackbar';
import VirtualizedView from '../../components/virtualizedBackedContainer';

/* REDUX */
import { submitGetDashboardDataDetail } from '../dashboard/actions/actions';

function Temp() {
  // var
  // const t = (v) => i18n.t(v); // Getting translated text
  // const { colors } = useTheme();
  const gStyle = gloabalStyle();
  // const style = styles(colors);

  // states
  const [visibleSnack, setVisibleSnack] = useState(false);
  const [snackMsg, setSnackMsg] = useState('');

  function onDismissSnackBar() {
    setVisibleSnack(false);
  }

  function showSnack(msg) {
    setSnackMsg(msg);
    setVisibleSnack(true);
  }

  useEffect(() => () => {}, []);

  return (
    <Animated.View
      entering={BounceInUp}
      exiting={FadeOut}
      layout={Layout.springify()}
      style={gStyle.container}
    >
      <VirtualizedView contentContainerStyle={[gStyle.fg]}>
        <View style={gStyle.content}>{/* Content */}</View>
      </VirtualizedView>

      {/* Modals and popups */}
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

function mapStateToProps({ detailsBankBalReducer, submitLoginReducer }) {
  return {
    detailsBankBalReducer,
    submitLoginReducer,
  };
}

export default connect(mapStateToProps, { submitGetDashboardDataDetail })(Temp);

// const styles = (colors) =>
//   StyleSheet.create({

//   });
