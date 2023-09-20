import { useDispatch } from "react-redux";


const signup = async (values, onSubmitProps) => {
  const savedUserResponse = await fetch(
    "http://localhost:3001//api/v1/users/signup",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }
  );
  
  if (savedUserResponse.ok) {
    const responseBody = await savedUserResponse.json();
    const { data } = responseBody;
    const { user } = data;
    onSubmitProps.resetForm();
    
    dispatch(setLogin(user));
    navigate("/");
  }

}

export default signup