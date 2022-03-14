import React from "react";
import { TextInput, HelperText } from "react-native-paper";

const CustomInput = ({
  onChange,
  label,
  state,
  secure,
  helper,
  helperVisible,
  keyboardType,
  roundness,
  ...props
}) => {
  const [localstate, setLocalstate] = React.useState(secure);
  function onChangeText(v) {
    onChange(v);
  }
  return (
    <>
      <TextInput
        mode="outlined"
        label={label}
        value={state}
        onChangeText={(text) => onChangeText(text)}
        theme={{ roundness: roundness ? roundness : 5 }}
        secureTextEntry={localstate}
        keyboardType={keyboardType}
        right={
          secure && (
            <TextInput.Icon
              forceTextInputFocus={false}
              name={!localstate ? "eye-outline" : "eye-off-outline"}
              onPress={() => setLocalstate(!localstate)}
            />
          )
        }
        {...props}
      />
      {helper && (
        <HelperText type="error" visible={helperVisible}>
          {helper}
        </HelperText>
      )}
    </>
  );
};

export default CustomInput;
