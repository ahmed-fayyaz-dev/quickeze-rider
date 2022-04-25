import { LogBox, StatusBar } from 'react-native';
import * as Sentry from '@sentry/react-native';
import { useKeepAwake } from 'expo-keep-awake';
import i18n from 'i18n-js';
import { enableFreeze } from 'react-native-screens';

import { languageDictionary } from 'assets/locale/index';
import { SENTRY_DSN } from 'src/appConstants';
import { CombinedLightTheme } from 'src/styles/theme';

export const settings =
    ((i18n.translations = languageDictionary.languageSet),
    (i18n.fallbacks = true),
    StatusBar.setBackgroundColor(CombinedLightTheme.colors.notification, true),
    Sentry.init({
        dsn: SENTRY_DSN,
        // debug: true,
    }),
    LogBox.ignoreLogs([
        "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
    ]),
    enableFreeze(true),
    () => {
        try {
            useKeepAwake();
        } catch (e) {
            console.error(e);
        }
    });
