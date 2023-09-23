import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Formik, Form, Field,FormikHelpers, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useSignup } from '../authentication/useSignup';
import { useLogin } from '../authentication/useLogin';

type Values = {
  name?: string;
  email: string;
  password: string;
  passwordConfirm?: string;
}

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const registerSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  passwordConfirm: yup.string().required().oneOf([yup.ref('password')], 'Passwords must match'),
});

const initialValuesLogin = {
  email: '',
  password: '',
};

const initialValuesRegister = {
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

export default function LoginForm() {
  const [pageType, setPageType] = React.useState('login');
  const navigate = useNavigate();
  const { signup, isLoading: isSignupLoading } = useSignup();
  const { login, isLoading: isLoginLoading } = useLogin();

  const handleSubmit = async (values: Values, { setErrors }: FormikHelpers<Values>) => {
    if (pageType === 'login') {
      try {
        await login(values);
        navigate('/'); // Replace with your desired route
      } catch (error) {
        setErrors({ email: 'Invalid credentials', password: 'Invalid credentials' });
      }
    } else {
      try {
        await signup(values as typeof initialValuesRegister);
        navigate('/login');
        setPageType('login');
      } catch (error) {
        setErrors({ email: 'Email already in use' }); // You can customize this error message
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {pageType === 'login' ? 'Sign in' : 'Sign up'}
        </Typography>
        <Formik
          initialValues={pageType === 'login' ? initialValuesLogin : initialValuesRegister}
          validationSchema={pageType === 'login' ? loginSchema : registerSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form >
              {pageType === 'register' && (
                <Field
                  as={TextField}
                  margin="normal"
                  fullWidth
                  id="name"
                  label="Full Name"
                  name="name"
                  autoComplete="name"
                  required
                  helperText={
                    <ErrorMessage name="name"/>
                  }
                />
              )}
              <Field
                as={TextField}
                margin="normal"
                fullWidth
                required
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                helperText={
                  <ErrorMessage name="email"/>
                }
              />
              <Field
                as={TextField}
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                required
                helperText={
                  <ErrorMessage name="password"/>
                }
              />
              {pageType === 'register' && (
                <Field
                  as={TextField}
                  margin="normal"
                  fullWidth
                  name="passwordConfirm"
                  label="Confirm Password"
                  type="password"
                  id="passwordConfirm"
                  autoComplete="current-password"
                  required
                  helperText={
                    <ErrorMessage name="passwordConfirm"/>
                  }
                />
              )}
              {pageType === 'login' && (
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isSubmitting || isLoginLoading || isSignupLoading}
              >
                {pageType === 'login' ? 'Sign In' : 'Sign Up'}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    variant="body2"
                    onClick={() => {
                      setPageType(pageType === 'login' ? 'register' : 'login');
                    }}
                  >
                    {pageType === 'login' ? "Don't have an account? Sign Up" : 'Already have an account? Sign in'}
                  </Link>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
}

