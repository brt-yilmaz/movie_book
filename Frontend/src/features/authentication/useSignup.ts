import { signup as signupApi } from '../../services/apiAuth'
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      toast.success(`Account successfully created! Please verify the new account from the ${user.email} email address.`);
    }
  })

  return { signup, isLoading };

}
