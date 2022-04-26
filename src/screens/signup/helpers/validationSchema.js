import * as yup from 'yup';

export const signupValidationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    phoneNumber: yup
        .number()
        .integer('Must be digit only')
        .required('Phone number is required'),
    email: yup
        .string()
        .email('Please enter valid email')
        .required('Email is Required'),
    password: yup.string().required('Password is required'),
    confirmPassword: yup
        .string()
        .test(
            'confirmPasswordEqualsPassword',
            'Confirm Password does not matches Password.',
            function (confirmPassword) {
                const { password } = this.parent;
                if (confirmPassword !== password) {
                    return false;
                }
                return true;
            },
        )
        .required('Confirm password is required'),
});

// cnic: null,
// cnicImageName: '',
// vehicleDoc: null,
// vehicleDocImageName: '',
// vehicleImages: [],
// vehicleImagesText: '',

export const docVerificationValidationSchema = yup.object().shape({
    cnic: yup.mixed().required('Cnic Required'),
    vehicleDoc: yup.mixed().required('Vehicle Documents required'),
    vehicleImages: yup
        .array()
        .min(4, 'Atleast 4 images are required from all 4 sides')
        .required('Vehicle images are required'),
});
