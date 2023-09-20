import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useSignup } from "../authentication/useSignup";
import { useLogin } from "../authentication/useLogin";

type Values = {
    name?: string;
    email: string;
    password: string;
    passwordConfirm?: string;
}

const registerSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
  name: yup.string().required(),
  passwordConfirm: yup.string().required(),
})

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
})

const initialValuesRegister = {
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};


const SignupAndLoginForm = () => {

  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isSignup = pageType === "register";
  const { signup, isLoading } = useSignup();
  const { login, isLoading: isLoginLoading} = useLogin();

  const handleFormSubmit = (values : Values ) => {
    if (isSignup) {
      signup(values as typeof initialValuesRegister);
      navigate("/login");
      setPageType("login");
    }

    if(isLogin){
      login(values as typeof initialValuesLogin);
    }
  }
  
  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues ={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({ 
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap={'30px'}
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div" : { gridColumn: isNonMobile ? undefined : 'span 4'}
            }}
          >
            {isSignup && 
              <TextField
              label="Full Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.name}
              name="name"
              error={
                Boolean(touched.name) && Boolean(errors.name)
              }
              helperText={touched.name && errors.name}
              sx={{ gridColumn: "span 4" }}
            />
            }
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
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
              sx={{ gridColumn: "span 4" }}
            />
            {isSignup && 
              <TextField
              label="Confirm Password"
              type={'password'}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.passwordConfirm}
              name="passwordConfirm"
              error={
                Boolean(touched.passwordConfirm) && Boolean(errors.passwordConfirm)
              }
              helperText={touched.passwordConfirm && errors.passwordConfirm}
              sx={{ gridColumn: "span 4" }}
            />
            }

          </Box>


          {/* BUTTONS */}

          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.paper ,
                "&:hover": { color: palette.primary.main },
              }}
              disabled={isLoginLoading || isLoading}
            >
              {isLogin ? "LOGIN" : "SIGN UP"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>

        </form>
      
      
      )}


    </Formik>
  )
  
}

export default SignupAndLoginForm;