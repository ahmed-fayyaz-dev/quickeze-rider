import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {useTheme} from 'react-native-paper';
import Animated from 'react-native-reanimated';
import {connect} from 'react-redux';

import {submitGetDashboardData} from './actions/actions';
import {CustomSnackbar} from 'src/components/customSnackbar';
// import { GapV } from 'src/components/gap';
// import { StickyHeader } from 'src/components/stickyHeader';
// import VirtualizedView from 'src/components/virtualizedBackedContainer';
import {callApi} from 'src/constants/apiCall';
import gloabalStyle, {mgMs, mgVm, zIndexM} from 'src/styles/index';

function Dashboard({
    // submitLoginReducer,
    submitGetDashboardData,
    //
    getDashboardDataReducer,
}) {
    const {colors} = useTheme();
    const gStyle = gloabalStyle();
    const style = styles(colors);

    const [visibleSnack, setVisibleSnack] = useState(false);
    const [snackMsg] = useState('');
    // const [refreshing] = useState(false);
    // const [loading, setLoading] = useState(false);

    function onDismissSnackBar() {
        setVisibleSnack(false);
    }

    // function handleSubmitGetDashboardData() {
    //     callApi({
    //         data: {},
    //         setLoading: null,
    //         callApiReducer: getDashboardDataReducer,
    //         submitCallApi: submitGetDashboardData,
    //         successFunc: () => {},
    //         errFunc: () => {},
    //         catchFunc: () => {},
    //     });
    // }

    return (
        <Animated.View style={[gStyle.container]}>
            {/* <VirtualizedView
        contentContainerStyle={[gStyle.fg]}
        refresh
        refreshing={refreshing}
        onRefresh={async () => {
          try {
            handleSubmitGetDashboardData();
          } catch (e) {
            console.error(e);
          }
        }}>
        {loading ? null : <View style={[style.content]}></View>}
        <GapV />
      </VirtualizedView> */}

            <MapView
                provider={PROVIDER_GOOGLE}
                style={style.map}
                region={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
            />
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

        map: {
            ...StyleSheet.absoluteFillObject,
        },
    });
