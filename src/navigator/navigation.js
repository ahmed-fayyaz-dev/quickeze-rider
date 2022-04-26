// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Appearance, I18nManager } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import i18n from 'i18n-js';
import { Provider as PaperProvider } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

import { bindActionCreators } from 'redux';
import { ID, PASSWORD, ONBOARD } from 'src/appConstants';
import { getStorageItem } from 'src/helpers';
import { callApi } from 'src/helpers/apiCall';
import { setLanguage } from 'src/redux/common/actions/actions';
import { actionLogin } from 'src/screens/login/actions';
import {
    paperLightTheme,
    paperDarkTheme,
    navDarkTheme,
    navLightTheme,
} from 'src/styles/theme';

import RootNavigator from './rootNavigator';

function AppNavigator(props) {
    const {
        actionLogin,
        //
        setLanguage,
    } = props;

    const [ready, setReady] = useState(false);
    const [theme, setTheme] = useState(paperLightTheme);
    const [navTheme, setNavTheme] = useState(navLightTheme);
    const loggedIn = useRef(false);
    const board = useRef(false);

    useEffect(() => {
        async function effect() {
            changeTheme(Appearance.getColorScheme() || 'light');
            setData();
            board.current = await getStorageItem(ONBOARD);

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
            unsubscribe.remove();
        };
    }, [themeListener]);

    const changeTheme = c => {
        if (c == 'dark') {
            setTheme(paperDarkTheme);
            setNavTheme(navDarkTheme);
        } else {
            setTheme(paperLightTheme);
            setNavTheme(navLightTheme);
        }
    };

    const themeListener = useCallback(({ colorScheme }) => {
        changeTheme(colorScheme || 'light');
    }, []);

    const setData = async () => {
        const language = await getStorageItem('language');

        if (language) {
            setLanguage(language);
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
        const id = await getStorageItem(ID);
        const password = await getStorageItem(PASSWORD);

        if (id && password) {
            const data = {
                email: id.toLocaleLowerCase(),
                password,
            };

            // await callApi({
            //     data,
            //     callApiReducer: {},
            //     submitCallApi: actionLogin,
            //     successFunc: () => {
            //         loggedIn.current = true;
            //         setReady(true);
            //     },
            //     errFunc: () => setReady(true),
            //     catchFunc: () => setReady(true),
            //     setLoading: () => {},
            // });

            loggedIn.current = true;
            setReady(true);
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
                <NavigationContainer theme={navTheme}>
                    <RootNavigator loggedIn={loggedIn} />
                </NavigationContainer>
            </PaperProvider>
        );
    }
    return null;
}

function mapStateToProps() {
    return {};
}

function mapActionsToProps(dispatch, getState) {
    return bindActionCreators(
        {
            setLanguage,
            actionLogin,
        },
        dispatch,
        getState,
    );
}

export default connect(mapStateToProps, mapActionsToProps)(AppNavigator);
