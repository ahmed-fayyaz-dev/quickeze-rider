import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { useTheme } from 'react-native-paper';
import { connect } from 'react-redux';

// import { entering, exiting } from 'src/helpers/animation';
// import { GapV } from 'src/components/gap';
// import { StickyHeader } from 'src/components/stickyHeader';
// import { callApi } from 'src/helpers/apiCall';
import gloabalStyle, { mgMs, zIndexM } from 'src/styles/index';

function Dashboard() {
    const { colors } = useTheme();
    const gStyle = gloabalStyle();
    const style = styles(colors);

    // const [refreshing] = useState(false);
    // const [loading, setLoading] = useState(false);

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
        <View style={[gStyle.container]}>
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
        </View>
    );
}

function mapStateToProps() {
    return {};
}

export default connect(mapStateToProps)(Dashboard);

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
            marginTop: mgMs,
            paddingHorizontal: mgMs,
        },

        map: {
            ...StyleSheet.absoluteFillObject,
        },
    });
