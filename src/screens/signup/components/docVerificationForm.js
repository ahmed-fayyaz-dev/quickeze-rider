import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useTheme } from 'react-native-paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ID, PASSWORD, ONBOARD } from 'src/appConstants';
import { CustomInputButton, CustomRoundButton } from 'src/components/buttons';
import { GapV } from 'src/components/gap';
import { setStorageItem } from 'src/helpers';
import { callApi } from 'src/helpers/apiCall';
import { docVerificationValidationSchema } from 'src/screens/signup/helpers/validationSchema';

const UPLOAD_IMAGE_ICON = 'document-attach-outline';
const UPLOAD_BUTTON_ICON = 'cloud-upload';

const Form = ({ navigation }) => {
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
        navigateToApp();
    }

    function onSubmit(v) {
        successFunc(v);
    }

    // async function handleSubmitDocUpload(d) {
    //     await callApi({
    //         data: d,
    //         setLoading: setLoading,
    //         submitCallApi: actionLogin,
    //         successFunc: () => successFunc(d),
    //         errFunc: () => {},
    //         catchFunc: () => {},
    //     });
    // }

    async function getImageFromLibrary() {
        const result = await launchImageLibrary();

        return result;
    }

    async function getMultipleImagesFromLibrary(limit = 4) {
        const result = await launchImageLibrary({ selectionLimit: limit });

        return result;
    }

    async function getImageFromCamera() {
        const result = await launchCamera();

        return result;
    }

    return (
        <Formik
            validationSchema={docVerificationValidationSchema}
            initialValues={{
                cnic: null,
                cnicImageName: '',
                vehicleDoc: null,
                vehicleDocImageName: '',
                vehicleImages: [],
                vehicleImagesText: '',
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
                async function onPressCninc() {
                    let img = await getImageFromLibrary();

                    if (img.didCancel) return;

                    setFieldValue('cnic', img, true);
                    setFieldValue(
                        'cnicImageName',
                        img?.assets[0].fileName,
                        true,
                    );
                }

                async function onPressVehicleDoc() {
                    let img = await getImageFromLibrary();

                    if (img.didCancel) return;

                    setFieldValue('vehicleDoc', img, true);
                    setFieldValue(
                        'vehicleDocImageName',
                        img?.assets[0].fileName,
                        true,
                    );
                }

                async function onPressVehicleImages() {
                    let img = await getMultipleImagesFromLibrary(4);

                    if (img.didCancel) return;

                    console.log(img);

                    let length = 0;
                    let imgArr = [];

                    length = img.assets.length;
                    imgArr = img.assets;

                    setFieldValue(
                        'vehicleImagesText',
                        `${length} Images are selected`,
                    );
                    setFieldValue('vehicleImages', imgArr);
                }

                return (
                    <>
                        <CustomInputButton
                            editable={false}
                            label={'CNIC'}
                            value={values.cnicImageName || 'Attach Cnic Image'}
                            icon={UPLOAD_IMAGE_ICON}
                            onPress={onPressCninc}
                            helper={touched.cnic ? errors.cnic : null}
                        />
                        <GapV small />

                        <CustomInputButton
                            editable={false}
                            label={'Vehicle Document'}
                            value={
                                values.vehicleDocImageName ||
                                'Attach Vehicle Registration'
                            }
                            icon={UPLOAD_IMAGE_ICON}
                            onPress={onPressVehicleDoc}
                            helper={
                                touched.vehicleDoc ? errors.vehicleDoc : null
                            }
                        />
                        <GapV small />

                        <CustomInputButton
                            editable={false}
                            label={'Vehicle Images'}
                            value={
                                values.vehicleImagesText ||
                                'Attach 4 Vehicle Images'
                            }
                            icon={UPLOAD_IMAGE_ICON}
                            onPress={onPressVehicleImages}
                            helper={
                                touched.vehicleImages
                                    ? errors.vehicleImages
                                    : null
                            }
                        />
                        <GapV small />

                        <CustomRoundButton
                            title="Upload"
                            loading={loading}
                            icon={UPLOAD_BUTTON_ICON}
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
