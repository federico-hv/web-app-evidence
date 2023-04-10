import * as Yup from 'yup';

export const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  name: Yup.string().required('Name is required'),
  dateOfBirth: Yup.string().required('Date of birth is required'),
  artistName: Yup.string().required('Display name is required'),
  username: Yup.string().required('Username is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .required('Confirm password is required'),
});
