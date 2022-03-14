import React from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';
import {useTheme as paperTheme} from 'react-native-paper';
import Constants from 'expo-constants';
import {CustomCaption, CustomSubheading, CustomText} from './customText';
import {icons} from '../../assets/images/index';
import {IonIcons, removeStorageItem} from '../constants';
import {iconSize} from '../styles/navCss';
import {useTheme} from '@react-navigation/native';
import {CustomIconButton} from '../components/buttons';
import {bRss, mgS, onBackgroundDark} from '../styles';
import {GapH, GapV} from './gap';
// import globalStyles from "../styles/index";

function DrawerContent({state, navigation, ...props}) {
  const {colors} = useTheme();
  const {colors: paperColors} = paperTheme();
  const style = styles(paperColors);

  const BackIcon = () => (
    <CustomIconButton
      name={'chevron-back-outline'}
      size={iconSize}
      color={colors.primary}
      onPress={() => props.navigation.toggleDrawer()}
    />
  );

  const signOutFunc = () => {
    removeStorageItem('onboard');
    removeStorageItem('id');
    removeStorageItem('password');
    props.logout();
    navigation.reset({
      index: 0,
      routes: [{name: 'authStack'}],
    });
  };

  return (
    <Animated.View style={[style.container]}>
      <DrawerContentScrollView {...props}>
        <View style={[style.drawerTopView]}>
          <BackIcon />

          <View style={[style.accountInfo]}>
            <Image
              resizeMode="cover"
              source={{
                uri: props.profileUrl,
              }}
              style={[style.roundImage]}
            />
            <GapH small={true} />

            <View>
              <CustomText style={style.textLeft}>
                {props.submitLoginReducer?.session?.employeename}
              </CustomText>
              <CustomCaption style={style.textLeft}>
                {props.submitLoginReducer?.users?.empCode}
              </CustomCaption>
            </View>
          </View>
        </View>

        <GapV />
        <CustomSubheading style={[style.menuText]}>MENU</CustomSubheading>
        <DrawerItemList {...props} />
        <DrawerItem
          onPress={signOutFunc}
          icon={({size, color}) => (
            <IonIcons size={size} name={`exit-outline`} color={color} />
          )}
          label="Sign Out"
          labelStyle={[style.signoutLabel]}
          style={props.drawerItemStyle}
        />
      </DrawerContentScrollView>

      <View style={[style.drawerBottomView]}>
        <CustomCaption>App version {Constants.nativeAppVersion}</CustomCaption>
        <Image
          resizeMode="contain"
          source={icons.app.logoSmallB}
          style={[style.logoImage]}
        />
      </View>
    </Animated.View>
  );
}

export default DrawerContent;

const styles = colors =>
  StyleSheet.create({
    container: {flex: 1},

    menuText: {
      fontWeight: 'bold',
      margin: 10,
      textAlign: 'left',
      color: onBackgroundDark,
      backgroundColor: colors.notification,
      padding: mgS,
      borderRadius: bRss,
    },

    textLeft: {textAlign: 'left'},

    drawerBottomView: {
      marginBottom: 10,
      paddingHorizontal: 20,
      flexDirection: 'row-reverse',
      justifyContent: 'space-between',
    },

    drawerTopView: {
      flexDirection: 'row-reverse',
      // paddingHorizontal: 10,
    },

    roundImage: {
      width: 65,
      height: 65,
      borderRadius: 65 / 2,
      overflow: 'hidden',
    },

    accountInfo: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      margin: mgS,
      // justifyContent: "space-around",
    },

    logoImage: {maxWidth: 80},
  });
