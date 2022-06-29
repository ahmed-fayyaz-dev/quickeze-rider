import React, { useEffect, useState } from 'react';
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
import { setStorageItem } from 'src/helpers';
import { callApi } from 'src/helpers/apiCall';
// import { signupValidationSchema } from 'src/screens/signup/helpers/validationSchema';

const Form = ({ navigation }) => {
    const { colors } = useTheme();
    const style = styles(colors);
    const [loading, setLoading] = useState(false);

    function successFunc(values) {}

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
                cardNumber: '',
                cvc: '',
                expirayMonth: '',
                expirayYear: '',
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
                            label="Credit Card Number"
                            value={values.cardNumber}
                            placeholder="Enter your card number"
                            onBlur={handleBlur('cardNumber')}
                            onChange={handleChange('cardNumber')}
                            helper={
                                touched.cardNumber ? errors.cardNumber : null
                            }
                        />
                        <GapV small />

                        <CustomInput
                            controlled
                            label="CVC"
                            value={values.cvc}
                            placeholder="Enter your card cvc"
                            onBlur={handleBlur('cvc')}
                            onChange={handleChange('cvc')}
                            helper={touched.cvc ? errors.cvc : null}
                        />
                        <GapV small />

                        <CustomInput
                            controlled
                            label="Expiray Month"
                            value={values.expirayMonth}
                            placeholder="Enter your card expirayMonth"
                            onBlur={handleBlur('expirayMonth')}
                            onChange={handleChange('expirayMonth')}
                            helper={
                                touched.expirayMonth
                                    ? errors.expirayMonth
                                    : null
                            }
                        />
                        <GapV small />

                        <CustomInput
                            controlled
                            label="Expiray Year"
                            value={values.expirayYear}
                            placeholder="Enter your card cvc"
                            onBlur={handleBlur('expirayYear')}
                            onChange={handleChange('expirayYear')}
                            helper={
                                touched.expirayYear ? errors.expirayYear : null
                            }
                        />
                        <GapV small />

                        <CustomRoundButton
                            title="Add Card"
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

// todo
// validation schema
