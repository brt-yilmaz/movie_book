

export async function signup(fullName: string, email: string , password: string, passwordConfirm: string) {

 await fetch(
    "http://localhost:3001/api/v1/users/signup",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: fullName, email , password, passwordConfirm}),
    })

   
    // if (savedUserResponse.ok) {
    //   const responseBody = await savedUserResponse.json();
    //   console.log(responseBody);
    //   const { data } = responseBody;
    //   const { user } = data;

    //   return user;

    // } else {
    //   const errorResponse = await savedUserResponse.json();
    //   const errorMessage = errorResponse.message || "Failed to create user.";
    //   throw new Error(errorMessage);
    // }
    
}

type Login = {
    email: string;
    password: string;
}

export async function login({ email, password }: Login) {

  const loginResponse = await fetch(
    "http://localhost:3001/api/v1/users/login",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    if (loginResponse.ok) {
      const responseBody = await loginResponse.json();
     

      return responseBody;

    } else {
      const errorResponse = await loginResponse.json();
      const errorMessage = errorResponse.message || "Failed to login.";
      throw new Error(errorMessage);
    }
    
}

export async function checkCurrent() {

}