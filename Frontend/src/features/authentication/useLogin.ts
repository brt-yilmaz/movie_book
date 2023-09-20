import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state";

type Login = {
  email: string;
  password: string;
}

export function useLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email  , password } : Login) => loginApi({ email, password }),
    onSuccess: () => {
      dispatch(setLogin({name:'berat'}));
      navigate('/', { replace: true });
    },
    onError: (err) => {
      toast.error(`${err}`);
    },
  })

  return { login, isLoading };

}