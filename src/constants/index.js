import React from 'react';
import { View, Dimensions, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Device from 'expo-device';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const windowWidth = Dimensions.get('window').width;

export const windowHeigth = Dimensions.get('window').height;

export const isAndroid = Platform.OS === 'android';

export const isIos = Platform.OS === 'ios';

export const success = 'success';

export const versionCode = '0.0.1';

export const deviceInfo = {
    brand: Device.brand,
    manufacturer: Device.manufacturer,
    modelName: Device.modelName,
    modelIdIOS: Device.modelId,
    designNameAndroid: Device.designName,
    productNameAndroid: Device.productName,
    supportedCpuArchitectures: Device.supportedCpuArchitectures,
    osName: Device.osName,
    osVersion: Device.osVersion,
    osBuildId: Device.osBuildId,
    osInternalBuildId: Device.osInternalBuildId,
    osBuildFingerprintAndroid: Device.osBuildFingerprint,
    platformApiLevelAndroid: Device.platformApiLevel,
    deviceName: Device.deviceName,
};

export const setStorageItem = async (key, value) => {
    try {
        return await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.error(e);
        return false;
    }
};

export const getStorageItem = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.error(e);
        return false;
    }
};

export const removeStorageItem = async (key) => {
    try {
        return await AsyncStorage.removeItem(key);
    } catch (e) {
        console.error(e);
        return false;
    }
};

export function BottomBarIcons({ name, size, color }) {
    return (
        <View style={{}}>
            <Ionicons name={name} size={size} color={color} />
        </View>
    );
}
export function IonIcons({
    name, size, color, style,
}) {
    return <Ionicons name={name} size={size} color={color} style={style} />;
}

export const validateEmail = (email) => {
    const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)/;
    return re.test(email);
};

export function validatePassword(val) {
    const re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()+=-?;,./{}|":<>[\]\\' ~_]).{8,}/;
    return re.test(val);
}
