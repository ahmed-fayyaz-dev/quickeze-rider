import React from 'react';
import { TextInput, HelperText } from 'react-native-paper';

function CustomInput({
    onChange,
    label,
    value,
    secure,
    helper,
    helperVisible,
    keyboardType,
    roundness,
    ...props
}) {
    const [stateSecure, setStateSecure] = React.useState(secure);
    function onChangeText(v) {
        onChange(v);
    }
    return (
        <>
            <TextInput
                mode="outlined"
                label={label}
                // value={state} // Controlled Input
                defaultValue={value} //Uncontrolled
                onChangeText={text => onChangeText(text)}
                theme={{ roundness: roundness || 5 }}
                secureTextEntry={stateSecure}
                keyboardType={keyboardType}
                right={
                    secure && (
                        <TextInput.Icon
                            forceTextInputFocus={false}
                            name={
                                !stateSecure ? 'eye-outline' : 'eye-off-outline'
                            }
                            onPress={() => setStateSecure(!stateSecure)}
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
}

export default CustomInput;
