import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username je obavezan.')
    .min(2, 'Username mora imati najmanje 2 karaktera.')
    .max(50, 'Username može imati najviše 50 karaktera.')
    .matches(/^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/, 'Username nije validan.'),

  email: Yup.string()
    .required('Email je obavezan.')
    .email('Email nije validan.'),

  password: Yup.string()
    .required('Password je obavezan.')
    .min(6, 'Password mora imati najmanje 6 karaktera.')
    .max(128, 'Password može imati najviše 128 karaktera.'),

  forename: Yup.string()
    .required('Ime je obavezno.')
    .matches(/^[a-zA-Z]+$/, 'Ime nije validno.'),
    
  surname: Yup.string()
    .required('Prezime je obavezno.')
    .matches(/^[a-zA-Z]+$/, 'Prezime nije validno.'),
});
