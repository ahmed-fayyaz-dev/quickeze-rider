import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { useTheme } from 'react-native-paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ID, PASSWORD, ONBOARD } from 'src/appConstants';
import { CustomCheckbox } from 'src/components/CustomCheckbox';
import CustomInput from 'src/components/CustomInput';
import { CustomRoundButton } from 'src/components/buttons';
import { CustomText } from 'src/components/customText';
import { GapV } from 'src/components/gap';
import { setStorageItem } from 'src/helpers';
import { callApi } from 'src/helpers/apiCall';
import { actionLogin } from 'src/screens/login/actions';
import { loginValidationSchema } from 'src/screens/login/helpers/validationSchema';

const Form = ({ navigation, actionLogin }) => {
    const { colors } = useTheme();
    const style = styles(colors);
    const [loading, setLoading] = useState(false);

    function navigateToApp() {
        navigation.reset({
            index: 0,
            routes: [{ name: 'drawerNav' }],
        });
    }

    function successFunc(values) {
        if (values.remember) {
            setStorageItem(ID, values?.email);
            setStorageItem(PASSWORD, values?.password);
            setStorageItem(ONBOARD, true);
        }

        navigateToApp();
    }

    function onSubmit(v) {
        successFunc(v);
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
                            controlled
                            value={values.email}
                            label="UserId / Email"
                            placeholder="Enter ID / Email"
                            onBlur={handleBlur('email')}
                            onChange={handleChange('email')}
                            helper={touched.email ? errors.email : null}
                        />
                        <GapV small />

                        <CustomInput
                            secure
                            controlled
                            label="Password"
                            value={values.password}
                            placeholder="Enter Password"
                            onBlur={handleBlur('password')}
                            onChange={handleChange('password')}
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
                            <GapV small />

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

function mapStateToProps() {
    return {};
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
