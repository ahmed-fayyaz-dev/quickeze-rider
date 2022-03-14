import React, {useState, useEffect, useRef, useCallback} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Appearance, I18nManager} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Provider as PaperProvider} from 'react-native-paper';
import i18n from 'i18n-js';

import {callApi} from '../constants/apiCall';
import {setLanguage} from '../redux/common/actions/actions';
import {submitGetDashboardData} from '../screens/dashboard/actions/actions';
import {submitLoginAccount} from '../screens/login/actions/actions';

import {getStorageItem} from '../constants';
import {CombinedLightTheme, CombinedDarkTheme} from '../styles/theme';

import RootNavigator from './rootNavigator';

//App nav
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

  const themeListener = useCallback(({colorScheme}) => {
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
      let data = {
        email: id.toLocaleLowerCase(),
        password: password,
      };

      await callApi({
        data: data,
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
  } else return null;
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
