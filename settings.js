import { LogBox } from 'react-native';
import * as Sentry from '@sentry/react-native';
import { useKeepAwake } from 'expo-keep-awake';
import i18n from 'i18n-js';
import { enableFreeze } from 'react-native-screens';

import { SENTRY_DSN } from './appConstants';
import { languageDictionary } from './assets/locale/index';

// Sentry Setup
export const settings = ((i18n.translations = languageDictionary.languageSet),
(i18n.fallbacks = true),
Sentry.init({
    dsn: SENTRY_DSN,
    debug: true,
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
