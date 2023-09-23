import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Formik, Form} from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Copyright from '../../ui/Copyright';
import { useSignup } from './useSignup';

type SignUpValues = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const SignUpSchema = yup.object().shape({
  name: yup.string().required('Enter your full name'),
  email: yup.string().email("Enter a valid email").required("Enter a valid email"),
  password: yup.string().required("Enter your password"),
  // check if password matches
  passwordConfirm: yup.string().oneOf([yup.ref('password'), ''], 'Passwords must match'),
});

const initialValuesLogin = {
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
};


export default function SignUpForm() {
  const navigate = useNavigate();
  const { signup, isLoading: isSignUpLoading } = useSignup();

  const handleFormSubmit =  (values: SignUpValues ) => {
    signup(values);
  }
  

  return (
    <Container component="main" maxWidth="xs">
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
           Sign in
        </Typography>
        <Box sx={{ mt: 1 }}>
        <Formik
          initialValues={initialValuesLogin }
          validationSchema={SignUpSchema }
          onSubmit={(values,{resetForm}) => {
            handleFormSubmit(values);
            resetForm();
          }}
        >
          {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
      }) => (
            <Form onSubmit={handleSubmit}  >
              <TextField
              label="Full Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.name}
              name="name"
              error={Boolean(touched.name) && Boolean(errors.name)}
              helperText={touched.name && errors.name}
              fullWidth
              autoComplete="name"
              required
              margin={"normal"}
            />
              <TextField
              label="Email Address"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              fullWidth
              required
              margin={"normal"}
            />
              <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              fullWidth
              required
              margin={"normal"}
            />
            <TextField
              label="Confirm Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.passwordConfirm}
              name="passwordConfirm"
              error={Boolean(touched.passwordConfirm) && Boolean(errors.passwordConfirm)}
              helperText={touched.passwordConfirm && errors.passwordConfirm}
              fullWidth
              required
              margin={"normal"}
            />
              
              
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isSignUpLoading}
              >
                Sign In
              </Button>
              <Grid container>
                
                <Grid item>
                  <Link
                    variant="body2"
                    href="#"
                    onClick={() => {
                      
                      navigate('/login');
                    }}
                  >
                    "Do you already have an account? Sign In"
                  </Link>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
        </Box>
      </Box>
      <Copyright />       

    </Container>
  );
}

