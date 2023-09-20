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

const signupSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
  fullName: yup.string().required(),
})

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
})

const initialValuesRegister = {
  fullName: "",
  email: "",
  password: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const LoginForm = () => {

  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "signup";

  

}