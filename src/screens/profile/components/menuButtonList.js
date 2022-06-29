import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { nativeApplicationVersion } from 'expo-application';

import { CustomSquareButton } from 'src/components/buttons';
import { CustomTitle, CustomCaption } from 'src/components/customText';
import { GapV } from 'src/components/gap';
import { pdVm } from 'src/styles';

const ButtonList = ({ status }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <CustomSquareButton
                // mode="outline"
                title={'Edit Profile'}
                icon="arrow-forward"
                contentStyle={styles.menuButtons}
                onPress={() => {
                    navigation.navigate('editProfile');
                }}
            />
            <GapV small />

            {!status && ( // If not verified
                <CustomSquareButton
                    // mode="outline"
                    title={'Continue Verification'}
                    icon="arrow-forward"
                    contentStyle={styles.menuButtons}
                />
            )}
            <GapV />

            {/* Payments */}
            <CustomTitle style={styles.menuTitles}>{'Payments'}</CustomTitle>

            <CustomSquareButton
                // mode="outline"
                title={'Your Payment Methods'}
                icon="arrow-forward"
                contentStyle={styles.menuButtons}
                onPress={() => {}}
            />
            <GapV small />

            <CustomSquareButton
                // mode="outline"
                title={'Attach Payment Method'}
                icon="arrow-forward"
                contentStyle={styles.menuButtons}
                onPress={() => {
                    navigation.navigate('attachPaymentMethod');
                }}
            />
            <GapV />

            {/* About */}
            <CustomTitle style={styles.menuTitles}>{'About'}</CustomTitle>

            <CustomSquareButton
                // mode="outline"
                title={'About'}
                icon="arrow-forward"
                contentStyle={styles.menuButtons}
                onPress={() => {}}
            />
            <GapV small />

            <CustomSquareButton
                // mode="outline"
                title={'Help Centre'}
                icon="arrow-forward"
                contentStyle={styles.menuButtons}
                onPress={() => {}}
            />
            <GapV />

            {/* Build Number */}
            <CustomCaption>
                App version {nativeApplicationVersion}
            </CustomCaption>
        </View>
    );
};

export default ButtonList;

const styles = StyleSheet.create({
    container: {
        // alignItems: 'center',
        paddingVertical: pdVm,
    },

    menuButtons: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
    },

    menuTitles: {
        textAlign: 'left',
    },
});
