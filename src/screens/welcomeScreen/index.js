import React from 'react';
import {
  StyleSheet, View, Image, TouchableOpacity,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import Animated, { ZoomOut } from 'react-native-reanimated';

import { icons } from '../../../assets/images';
import { CustomText, CustomCaption } from '../../components/customText';
import { hitSlopS } from '../../styles/index';
import { GapV } from '../../components/gap';
import { setStorageItem } from '../../constants/index';

export default function WelcomeScreen({ navigation }) {
  const { colors } = useTheme();
  const style = styles(colors);

  function navigate() {
    setStorageItem('notFirstTime', true);
    navigation.navigate('login');
  }

  return (
    <Animated.View exiting={ZoomOut} style={[style.container]}>
      <View style={style.imageView}>
        <Image
          style={style.imageLogo}
          resizeMode="contain"
          source={icons.app.logoLargeW}
        />
      </View>

      <View style={[style.container, style.revCol, style.itemCentre]}>
        <TouchableOpacity hitSlop={hitSlopS} onPress={navigate}>
          <CustomText style={style.textNext}>
            Next
            {'>>'}
          </CustomText>
        </TouchableOpacity>

        <CustomCaption style={style.textComment}>
          {
            'A creative group of people who design\ninfluential brands and digital\nexperiences.'
          }
        </CustomCaption>

        <GapV small />

        <CustomText style={[style.text]}>
          Welcome to ZETA Enterprises Pvt. Ltd.
        </CustomText>
      </View>
    </Animated.View>
  );
}

const styles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.notification,
  },

  revCol: { flexDirection: 'column-reverse' },

  imageLogo: {
    height: 66,
  },

  imageView: { marginTop: '60%', alignItems: 'center' },

  text: {
    marginTop: '3%',
    fontWeight: 'bold',
    color: 'white',
  },

  textComment: {
    marginBottom: '30%',
    textAlignVertical: 'center',
    color: 'white',
  },

  textNext: {
    fontWeight: 'bold',
    marginBottom: '8%',
    color: 'white',
  },

  itemCentre: {
    alignItems: 'center',
  },
});
