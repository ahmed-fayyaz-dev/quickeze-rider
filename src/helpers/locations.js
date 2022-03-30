/* eslint-disable no-useless-catch */
import * as Location from 'expo-location';
import { setStorageItem } from './index';

export const locationPermission = async callback => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        throw { message: 'Location Premission Denied' };
    } else if (status == 'granted') {
        return true;
    }
};

export const getCurrentLocation = async () => {
    try {
        if (await locationPermission()) {
            let location = await Location.getCurrentPositionAsync({
                accuracy: 6,
            });
            setStorageItem('location', location);
            return location;
        }
    } catch (e) {
        throw e;
    }
};

export const getRevGeoCode = async location => {
    try {
        if (await locationPermission()) {
            const { coords } = location;
            if (coords) {
                const { latitude, longitude } = coords;
                return await Location.reverseGeocodeAsync({
                    latitude: latitude,
                    longitude: longitude,
                });
            } else {
                const { longitude, latitude } = location[0];
                if (longitude && latitude) {
                    return await Location.reverseGeocodeAsync({
                        latitude: latitude,
                        longitude: longitude,
                    });
                }
            }
        }
    } catch (e) {
        throw e;
    }
};

export const getGeoCode = async address => {
    try {
        if (await locationPermission()) {
            return await Location.geocodeAsync(address);
        }
    } catch (e) {
        throw e;
    }
};

export const getCurrentAddress = async () => {
    try {
        let location = await getCurrentLocation();
        let revGeoCode = await getRevGeoCode(location);
        let address = changeRevGeoCodeToText(revGeoCode);
        setStorageItem('address', address);
        return address;
    } catch (e) {
        throw e;
    }
};

export const changeRevGeoCodeToText = rGCode => {
    let address = '';
    if (rGCode[0]?.name) address += rGCode[0]?.name + ',';
    if (rGCode[0]?.street) address += rGCode[0]?.street + ',';
    if (rGCode[0]?.district) address += rGCode[0]?.district + ',';
    if (rGCode[0]?.city) address += rGCode[0]?.city + '.';
    return address;
};
