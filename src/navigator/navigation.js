// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Appearance, I18nManager } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import i18n from 'i18n-js';
import { Provider as PaperProvider } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

import { getStorageItem } from 'src/helpers';
import { callApi } from 'src/helpers/apiCall';
import { setLanguage } from 'src/redux/common/actions/actions';
import { submitGetDashboardData } from 'src/screens/dashboard/actions/actions';
import { submitLoginAccount } from 'src/screens/login/actions/actions';
import { CombinedLightTheme, CombinedDarkTheme } from 'src/styles/theme';

import RootNavigator from './rootNavigator';

// App nav
function AppNavigator(props) {
    const {
        submitLoginAccount,
        //
        submitLoginReducer,
    } = props;

    const [ready, setReady] = useState(false);
    const [theme, setTheme] = useState(CombinedLightTheme);
    const loggedIn = useRef(false);
    const board = useRef(false);

    useEffect(() => {
        async function effect() {
            changeTheme(Appearance.getColorScheme() || 'light');
            setRedux();
            board.current = await getStorageItem('onboard');

            if (board.current) {
                await getData();
            } else {
                setReady(true);
            }
        }
        effect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const unsubscribe = Appearance.addChangeListener(themeListener);
        return () => {
            unsubscribe;
        };
    }, [themeListener]);

    const changeTheme = c => {
        if (c == 'dark') {
            setTheme(CombinedDarkTheme);
        } else {
            setTheme(CombinedLightTheme);
        }
    };

    const themeListener = useCallback(({ colorScheme }) => {
        changeTheme(colorScheme || 'light');
    }, []);

    const setRedux = async () => {
        const language = await getStorageItem('language');

        if (language) {
            props.setLanguage(language);
            i18n.locale = language;

            if (language == 'ud') {
                try {
                    I18nManager.forceRTL(true);
                } catch (e) {
                    console.error(e);
                }
            } else {
                try {
                    I18nManager.forceRTL(false);
                } catch (e) {
                    console.error(e);
                }
            }
        }
    };

    async function getData() {
        const id = await getStorageItem('id');
        const password = await getStorageItem('password');

        if (id && password) {
            const data = {
                email: id.toLocaleLowerCase(),
                password,
            };

            await callApi({
                data,
                callApiReducer: submitLoginReducer,
                submitCallApi: submitLoginAccount,
                successFunc: async () => {
                    loggedIn.current = true;
                    setReady(true);
                },
                errFunc: () => {
                    setReady(true);
                },
                catchFunc: () => {
                    setReady(true);
                },
                setLoading: () => {},
            });
        } else {
            setReady(true);
        }
    }

    if (ready) {
        return (
            <PaperProvider
                theme={theme}
                settings={{
                    icon: props => <Ionicons {...props} />,
                }}>
                <NavigationContainer theme={theme}>
                    <RootNavigator loggedIn={loggedIn} />
                </NavigationContainer>
            </PaperProvider>
        );
    }
    return null;
}

function mapStateToProps({
    appAppearanceReducer,
    submitLoginReducer,
    getDashboardDataReducer,
    companyIdReducer,
    gMonthReducer,
    gDateReducer,
}) {
    return {
        appAppearanceReducer,
        submitLoginReducer,
        getDashboardDataReducer,
        companyIdReducer,
        gMonthReducer,
        gDateReducer,
    };
}

// function mapActionsToProps(dispatch) {
//   return bindActionCreators(
//     {
//       setLanguage,
//       submitLoginAccount,
//       submitGetDashboardData,
//     },
//     dispatch
//   );
// }

export default connect(mapStateToProps, {
    setLanguage,
    submitLoginAccount,
    submitGetDashboardData,
})(AppNavigator);
