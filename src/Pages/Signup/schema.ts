import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('El correo electrónico no es válido')
    .required('El correo electrónico es requerido'),
  password: yup
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('La contraseña es requerida'),
  fullName: yup
    .string()
    .required('fullName is required'),
  userName: yup
    .string()
    .required('userName is required'),
});
