import React from 'react';
import { Snackbar } from 'react-native-paper';
import { CustomCaption } from './customText';

export function CustomSnackbar({
  style,
  visible,
  onDismiss,
  textStyle,
  onPress,
  msg,
  duration,
}) {
  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismiss}
      duration={duration || 2000}
      style={style}
      action={{
        onPress,
      }}
    >
      <CustomCaption style={textStyle}>{msg}</CustomCaption>
    </Snackbar>
  );
}
