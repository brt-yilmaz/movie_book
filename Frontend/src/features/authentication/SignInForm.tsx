import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useLogin } from "./useLogin";
import Copyright from "../../ui/Copyright";

type LoginValues = {
  email: string;
  password: string;
};

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Enter a valid email"),
  password: yup.string().required("Enter your password"),
});

const initialValuesLogin = {
  email: "",
  password: "",
};

export default function LoginForm() {
  const navigate = useNavigate();
  const { login, isLoading: isLoginLoading } = useLogin();

  const handleFormSubmit = async (values: LoginValues) => {
    await login(values);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Formik
            initialValues={initialValuesLogin}
            validationSchema={loginSchema}
            onSubmit={(values, { resetForm }) => {
              handleFormSubmit(values);
              resetForm({ values: { password: "", email: values.email } });
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
              <Form onSubmit={handleSubmit}>
                <TextField
                  label="Email Address"
                  color={"success"}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  fullWidth
                  autoFocus
                  autoComplete="email"
                  required
                  margin={"normal"}
                />
                <TextField
                  color={"success"}
                  label="Password"
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  fullWidth
                  autoComplete="current-password"
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
                  disabled={isLoginLoading}
                >
                  Sign In
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
                      href="#"
                      onClick={() => {
                        navigate("/signup");
                      }}
                    >
                      Don't have an account? Sign Up
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
