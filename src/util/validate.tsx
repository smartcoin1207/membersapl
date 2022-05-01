// import moment from 'moment';
import * as yup from 'yup';
export const validateForm = () => {
  return {
    email: yup
      .string()
      .required('This field is required')
      .email('Email is not valid'),
    password: yup
      .string()
      .required('This field is required')
      .min(6, 'Password must be at least 6 characters')
      .max(30, 'Password may not be greater than 30 characters'),
    confirmPassword: yup
      .string()
      .required('This field is required')
      // .min(VALIDATE.minPassLength, trans("validate.minConfirmPassError"))
      // .max(VALIDATE.maxPassLength, trans("validate.maxConfirmPassError"))
      .oneOf(
        [yup.ref('password'), null],
        'Confirm Password does not match the password',
      ),

    fullname: yup
      .string()
      .required('This field is required')
      .max(100, 'Full name may not be greater than 100 characters'),
    phone: yup
      .string()
      .required('This field is required')
      .min(7, 'Phone must be at least 7 characters')
      .max(11, 'Phone may not be greater than 11 characters'),
    prefix: yup.string().required('This field is required'),
    is_volunteer: yup.number().required('This field is required'),
    dob: yup.string().required('This field is required'),
    location: yup.string().required('This field is required'),
    language: yup.string().required('This field is required'),
  };
};
