import React, { useEffect, useState } from 'react';
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
// import { signupValidationSchema } from 'src/screens/signup/helpers/validationSchema';

const Form = ({ navigation }) => {
    const { colors } = useTheme();
    const style = styles(colors);
    const [loading, setLoading] = useState(false);

    function successFunc(values) {
        if (values) {
            setStorageItem(ID, values?.email);
            setStorageItem(PASSWORD, values?.password);
            setStorageItem(ONBOARD, true);
        }
    }

    function onSubmit(v) {
        successFunc(v);
    }

    // async function handleSubmitSignup(d) {
    //     await callApi({
    //         data: d,
    //         setLoading: setLoading,
    //         submitCallApi: actionLogin,
    //         successFunc: () => successFunc(d),
    //         errFunc: () => {},
    //         catchFunc: () => {},
    //     });
    // }

    return (
        <Formik
            // validationSchema={signupValidationSchema}
            initialValues={{
                name: '',
                phoneNumber: '',
                email: '',
                password: '',
                confirmPassword: '',
            }}
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
                return (
                    <>
                        <CustomInput
                            controlled
                            label="Name"
                            value={values.name}
                            placeholder="Enter your name"
                            onBlur={handleBlur('name')}
                            onChange={handleChange('name')}
                            helper={touched.name ? errors.name : null}
                        />
                        <GapV small />

                        <CustomInput
                            controlled
                            label="Phone number"
                            keyboardType="numeric"
                            value={values.phoneNumber}
                            placeholder="Enter your phone number"
                            onBlur={handleBlur('phoneNumber')}
                            onChange={handleChange('phoneNumber')}
                            helper={
                                touched.phoneNumber ? errors.phoneNumber : null
                            }
                        />
                        <GapV small />

                        <CustomInput
                            controlled
                            label="Email"
                            value={values.email}
                            placeholder="Enter your email adress"
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
                            placeholder="Enter your password"
                            onBlur={handleBlur('password')}
                            onChange={handleChange('password')}
                            helper={touched.password ? errors.password : null}
                        />
                        <GapV small />

                        <CustomInput
                            secure
                            controlled
                            label="Confrim Password"
                            value={values.confirmPassword}
                            placeholder="Re-enter your password"
                            onBlur={handleBlur('confirmPassword')}
                            onChange={handleChange('confirmPassword')}
                            helper={
                                touched.confirmPassword
                                    ? errors.confirmPassword
                                    : null
                            }
                        />
                        <GapV small />

                        <CustomRoundButton
                            title="Update"
                            loading={loading}
                            icon="arrow-forward"
                            onPress={handleSubmit}
                        />
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
    return bindActionCreators({}, dispatch, getState);
}

export default connect(mapStateToProps, mapDipatchToProps)(Form);

// eslint-disable-next-line no-unused-vars
const styles = colors =>
    StyleSheet.create({
        fdr: { flexDirection: 'row' },
    });
