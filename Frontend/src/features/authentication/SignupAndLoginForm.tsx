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
import { useDispatch } from "react-redux";
import { setLogin } from "../../state";
import { useSignup } from "../authentication/useSignup";

type Values = {
    fullName?: string;
    email: string;
    password: string;
    passwordConfirm?: string;
}

const signupSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
  fullName: yup.string().required(),
  passwordConfirm: yup.string().required(),
})

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
})

const initialValuesRegister = {
  fullName: "",
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isSignup = pageType === "signup";
  const { signup, isLoading } = useSignup();

  const handleFormSubmit = (values : Values ) => {
    if (isSignup) {
      signup(values as typeof initialValuesRegister);
      dispatch(setLogin(values));
      navigate("/");
    }

    if(isLogin){
      dispatch(setLogin(values));
    }
  }
  
  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues ={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : signupSchema}
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
              value={values.fullName}
              name="fullName"
              error={
                Boolean(touched.fullName) && Boolean(errors.fullName)
              }
              helperText={touched.fullName && errors.fullName}
              sx={{ gridColumn: "span 2" }}
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
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.passwordConfirm}
              name="fullName"
              error={
                Boolean(touched.passwordConfirm) && Boolean(errors.passwordConfirm)
              }
              helperText={touched.passwordConfirm && errors.passwordConfirm}
              sx={{ gridColumn: "span 2" }}
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
              disabled={isLoading}
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