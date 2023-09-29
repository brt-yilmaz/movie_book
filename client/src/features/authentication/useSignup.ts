import { signup as signupApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";
import { useState } from "react";

type Signup = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export function useSignup() {
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");

  const signup = async ({ name, email, password, passwordConfirm }: Signup) => {
    setIsLoading(true);

    try {
      await signupApi(name, email, password, passwordConfirm);
      toast.success(`Please verify your email address.`);
    } catch (error) {
      setEmailError((error as Error).message);
      toast.error(`${(error as Error).message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, isLoading, emailError };
}
