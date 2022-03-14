import React, {useState} from 'react';
import Animated from 'react-native-reanimated';
import {connect} from 'react-redux';
import {View, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';

import {submitGetDashboardData} from './actions/actions';
import gloabalStyle, {mgMs, mgVm, zIndexM} from '../../styles/index';
import {GapV} from '../../components/gap';
import {CustomSnackbar} from '../../components/customSnackbar';
import VirtualizedView from '../../components/virtualizedBackedContainer';
import {StickyHeader} from '../../components/stickyHeader';
import {callApi} from '../../constants/apiCall';

function Dashboard({
  submitLoginReducer,
  submitGetDashboardData,
  //
  getDashboardDataReducer,
}) {
  const {colors} = useTheme();
  const gStyle = gloabalStyle();
  const style = styles(colors);

  const [visibleSnack, setVisibleSnack] = useState(false);
  const [snackMsg] = useState('');
  const [refreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  function onDismissSnackBar() {
    setVisibleSnack(false);
  }

  function handleSubmitGetDashboardData() {
    callApi({
      data: {},
      setLoading: setLoading,
      callApiReducer: getDashboardDataReducer,
      submitCallApi: submitGetDashboardData,
      successFunc: () => {},
      errFunc: () => {},
      catchFunc: () => {},
    });
  }

  return (
    <Animated.View style={[gStyle.container]}>
      <VirtualizedView
        contentContainerStyle={[gStyle.fg]}
        refresh={true}
        refreshing={refreshing}
        onRefresh={async () => {
          try {
            handleSubmitGetDashboardData();
          } catch (e) {
            console.error(e);
          }
        }}>
        {loading ? null : <View style={[style.content]}>{/* CONTENT */}</View>}
        <GapV />
      </VirtualizedView>

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

function mapStateToProps({submitLoginReducer, getDashboardDataReducer}) {
  return {
    submitLoginReducer,
    getDashboardDataReducer,
  };
}

export default connect(mapStateToProps, {submitGetDashboardData})(Dashboard);

const styles = colors =>
  StyleSheet.create({
    dashboardHeader: {
      minHeight: 80,
      backgroundColor: colors.notification,
      paddingHorizontal: mgMs,
      zIndex: zIndexM,
    },

    content: {
      flex: 1,
      marginTop: mgVm,
      paddingHorizontal: mgMs,
    },
  });
