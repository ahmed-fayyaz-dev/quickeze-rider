import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { useTheme } from 'react-native-paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { CustomCheckbox } from 'src/components/CustomCheckbox';
import CustomInput from 'src/components/CustomInput';
import { CustomRoundButton } from 'src/components/buttons';
import { CustomText } from 'src/components/customText';
import { GapV } from 'src/components/gap';
import { callApi } from 'src/helpers/apiCall';
import { actionLogin } from 'src/screens/login/actions';
import { loginValidationSchema } from 'src/screens/login/helpers/validationSchema';

const Form = ({ navigation, actionLogin }) => {
    const { colors } = useTheme();
    const style = styles(colors);
    const [loading, setLoading] = useState(false);

    function navigate() {
        navigation.reset({
            index: 0,
            routes: [{ name: 'drawerNav' }],
        });
    }

    function successFunc(values) {
        // if (values.remember) {
        //   setStorageItem('id', id);
        //   setStorageItem('password', password);
        //   setStorageItem('onboard', true);
        // }
    }

    function onSubmit(v) {
        handleSubmitLogin(v);
    }

    async function handleSubmitLogin(d) {
        await callApi({
            data: d,
            setLoading: setLoading,
            submitCallApi: actionLogin,
            successFunc: () => successFunc(d),
            errFunc: () => {},
            catchFunc: () => {},
        });
    }

    return (
        <Formik
            validationSchema={loginValidationSchema}
            initialValues={{ email: '', password: '', remember: false }}
            onSubmit={values => {
                onSubmit(values);
            }}>
            {({
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                values,
                errors,
                touched,
            }) => {
                const handleChangeRemember = () =>
                    setFieldValue('remember', !values.remember);

                return (
                    <>
                        <CustomInput
                            fieldName="email"
                            onChange={handleChange('email')}
                            label="UserId / Email"
                            state={values.email}
                            onBlur={handleBlur('email')}
                            helper={touched.email ? errors.email : null}
                        />
                        <GapV small />

                        <CustomInput
                            secure
                            fieldName="password"
                            onChange={handleChange('password')}
                            label="Password"
                            state={values.password}
                            onBlur={handleBlur('email')}
                            helper={touched.password ? errors.password : null}
                        />
                        <GapV small />

                        <View style={style.fdr}>
                            <CustomCheckbox
                                status={values.remember}
                                onPress={handleChangeRemember}
                            />

                            <CustomText>Remember Me</CustomText>
                        </View>
                        <GapV large />

                        <View style={style.revBottomContainer}>
                            <GapV />

                            <CustomRoundButton
                                title="Login"
                                loading={loading}
                                icon="arrow-forward"
                                onPress={handleSubmit}
                            />
                        </View>
                    </>
                );
            }}
        </Formik>
    );
};

function mapStateToProps({ submitLoginReducer }) {
    return {
        submitLoginReducer,
    };
}

function mapDipatchToProps(dispatch, getState) {
    return bindActionCreators(
        {
            actionLogin,
        },
        dispatch,
        getState,
    );
}

export default connect(mapStateToProps, mapDipatchToProps)(Form);

// eslint-disable-next-line no-unused-vars
const styles = colors =>
    StyleSheet.create({
        fdr: { flexDirection: 'row' },

        revBottomContainer: {
            flexDirection: 'column-reverse',
            flex: 1,
        },
    });
