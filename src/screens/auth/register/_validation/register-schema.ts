import * as Yup from 'yup';

const registrationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password'), 'null'], 'Passwords must match')
    .required('Please confirm your password'),
});

export default registrationSchema;
