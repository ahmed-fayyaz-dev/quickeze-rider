import {StyleSheet, StatusBar} from 'react-native';
import {useColorScheme} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {colorDictionary} from './theme';

export const iconSize = 30;
export const iconSizeL = 42;
//will discard these below old extra variables slowly
export const mgHl = 30;
export const mgHs = 10;
export const mgVl = 30;
export const mgHm = 18;
export const mgVm = 20;
export const mgVs = 10;

export const pdHm = 18;
export const pdHs = 10;
export const pdVm = 20;
export const pdVms = 15;
export const pdVs = 10;
export const pdVss = 5;

//Dashboard App
export const mgL = 62;
export const mgM = 35;
export const mgMs = 20;
export const mgS = 10;
export const mgSs = 5;

export const searchBarHeight = 53;
export const IconSize = 29;
export const buttonHeight = 50;

export const sBh = StatusBar.currentHeight;

export const bRss = 5;
export const bRs = 10;
export const bRms = 18;
export const bRm = 50;

//Fonst Sizes
export const title = RFValue(20);
export const text = RFValue(12);
export const caption = RFValue(10);
export const buttonText = RFValue(16);

export const zIndexS = 4;
export const zIndexM = 9;
export const zIndexL = 12;

export const light = 'light';
export const dark = 'dark';

export const onBackgroundDark = colorDictionary.colorSet.dark.onBackground;
export const onBackgroundLight = colorDictionary.colorSet.light.onBackground;

export const hitSlopS = {top: 30, bottom: 30, left: 20, right: 20};

const Styles = () => {
  const zIndexSLocal = zIndexS;
  const zIndexMLocal = zIndexM;
  const zIndexLLocal = zIndexL;

  // props
  let appearance = useColorScheme() || 'light';
  let appearanceInv =
    (useColorScheme() === 'light' ? 'dark' : 'light') || 'dark';

  if (appearance == undefined || appearance == null) {
    appearance = 'light';
  }
  return StyleSheet.create({
    //All these Extra Cluster is to be discarder and use a only a handfull
    mgTl: {marginTop: mgVl},
    mgBl: {marginBottom: mgVl},
    mgRl: {marginRight: mgHl},
    mgLl: {marginLeft: mgHl},
    mgHl: {marginHorizontal: mgHl},
    mgVl: {marginVertical: mgVl},
    mgTm: {marginTop: mgVm},
    mgBm: {marginBottom: mgVm},
    mgRm: {marginRight: mgHm},
    mgLm: {marginLeft: mgHm},
    mgHm: {marginHorizontal: mgHm},
    mgVm: {marginVertical: mgVm},
    mgVs: {marginVertical: mgVs},
    mgHs: {marginHorizontal: mgHs},

    pRm: {paddingRight: pdHm},
    pLm: {paddingLeft: pdHm},
    pTm: {paddingTop: pdVm},
    pBm: {paddingBottom: pdVm},
    pVm: {paddingVertical: pdVm},
    pdHm: {paddingHorizontal: pdHm},
    pdVs: {paddingVertical: pdVs},
    pdHs: {paddingHorizontal: pdHs},

    itemCenter: {alignItems: 'center'},
    fdrr: {flexDirection: 'row-reverse'},
    fdr: {flexDirection: 'row'},
    fg: {flexGrow: 1},
    mgSb: {
      marginTop: sBh,
    },
    divider: {
      backgroundColor: colorDictionary.colorSet[appearance].onBackground,
      height: 1,
      width: '80%',
      alignSelf: 'center',
    },
    headerTitleStyle: {
      fontWeight: 'bold',
      textAlign: 'center',
      alignSelf: 'center',
      color: 'black',
    },
    drawer: {},
    iconStyle: {
      // tintColor: navigatorsColors.tabActive,
      width: iconSize,
      height: iconSize,
    },
    tabImage: {},
    bg: {backgroundColor: colorDictionary.colorSet[appearance].background},
    bgS: {
      backgroundColor: colorDictionary.colorSet[appearance].primary,
    },
    jcCentre: {
      justifyContent: 'center',
    },
    itemCentre: {
      alignItems: 'center',
    },
    txtJustify: {
      textAlign: 'justify',
    },
    text: {
      color: colorDictionary.colorSet[appearance].onBackground,
    },

    modalViewfw: {
      justifyContent: 'center',
      paddingHorizontal: pdHm,
      paddingVertical: pdVm,
      marginHorizontal: mgHm,
      borderRadius: bRs,
    },
    modalView: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: pdHm,
      paddingVertical: pdVm,
      marginHorizontal: mgHm,
    },
    authView: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: pdHm,
      paddingVertical: pdVm,
      marginHorizontal: mgVm,
      marginVertical: sBh,
      backgroundColor: `${colorDictionary.colorSet[appearance].primary}`,
      overflow: 'scroll',
    },
    inputContentRow: {
      minHeight: 50,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: pdVs,
      backgroundColor: colorDictionary.colorSet[appearance].background,
      borderRadius: bRs,
    },
    inputContentRowWBorder: {
      minHeight: 50,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: pdVs,
      backgroundColor: colorDictionary.colorSet[appearance].background,
      borderRadius: bRs,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colorDictionary.colorSet[appearance].primary,
    },
    descContent: {
      minHeight: 50,
      padding: pdVs,
      paddingHorizontal: pdHs,
      backgroundColor: colorDictionary.colorSet[appearance].background,
      borderRadius: bRs,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colorDictionary.colorSet[appearance].primary,
    },
    addProductRow: {
      flexDirection: 'row',
      paddingHorizontal: pdHs,
      justifyContent: 'space-between',
    },
    DropdownSearch: {
      padding: 10,
      marginTop: StyleSheet.hairlineWidth,
      borderColor: colorDictionary.colorSet[appearance].muted,
      backgroundColor: colorDictionary.colorSet[appearance].surface,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5,
    },
    DropdownSearchInput: {
      padding: 12,
      borderRadius: 5,
      color: colorDictionary.colorSet[appearance].onBackground,
      // borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: colorDictionary.colorSet[appearance].muted,
      backgroundColor: colorDictionary.colorSet[appearance].surface,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
    },

    productRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: StyleSheet.hairlineWidth,
      padding: 10,
      borderRadius: 5,
      marginTop: mgVs,
      backgroundColor: colorDictionary.colorSet[appearance].background,
      borderColor: colorDictionary.colorSet[appearance].primary,
    },

    //Discount -App
    container: {
      flex: 1,
      backgroundColor: colorDictionary.colorSet[appearance].background,
    },

    content: {
      flex: 1,
      paddingHorizontal: mgMs,
      paddingTop: mgM,
    },

    contentCenter: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: pdHm,
      paddingTop: pdVm,
    },

    snackBar: {
      bottom: 50,
      backgroundColor: colorDictionary.colorSet[appearanceInv].background,
    },
    snackText: {
      color: colorDictionary.colorSet[appearanceInv].onBackground,
    },

    bottomContainer: {
      flexDirection: 'column-reverse',
      flex: 1,
    },

    elevationM: {
      shadowColor: colorDictionary.colorSet[appearance].shadow,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.32,
      shadowRadius: 5.46,

      zIndex: zIndexMLocal,
      elevation: 9,
    },

    elevationS: {
      shadowColor: colorDictionary.colorSet[appearance].shadow,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,

      zIndex: zIndexSLocal,
      elevation: 4,
    },

    roundButton: {
      minHeight: buttonHeight,
      justifyContent: 'center',
      borderColor: colorDictionary.colorSet[appearance].primaryVariant,
      width: '100%',
      alignSelf: 'center',
    },

    roundButtonS: {
      minHeight: buttonHeight,
      justifyContent: 'center',
      width: '45%',
      alignSelf: 'center',
    },

    squareButton: {
      justifyContent: 'center',
      borderRadius: bRs,
      minWidth: 30,
    },

    compactButton: {
      minHeight: 0,
      flexDirection: 'row',
      justifyContent: 'center',
    },

    titledButtonTitle: {
      textAlign: 'left',
      position: 'absolute',
      zIndex: zIndexLLocal,
      fontWeight: 'bold',
      borderRadius: bRss,
      top: -pdVs,
      left: pdHs,
      paddingHorizontal: pdVss,
      backgroundColor: colorDictionary.colorSet[appearance].background,
    },

    titledButtonView: {
      borderWidth: 1,
      borderRadius: bRss,
      backgroundColor: colorDictionary.colorSet[appearance].surface,
      // backgroundColor: colorDictionary.colorSet[appearance].background,
    },

    titledButton: {
      minHeight: buttonHeight,
      justifyContent: 'flex-start',
    },

    box: {
      backgroundColor: colorDictionary.colorSet[appearance].surface,
      paddingHorizontal: mgHs,
      paddingVertical: pdVs,
      borderRadius: bRs,
      borderTopWidth: bRs,
      borderColor: colorDictionary.colorSet[appearance].secondary,
      width: '100%',
    },
  });
};

export default Styles;
