type Signup = {
  fullName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export async function signup({ fullName, email , password, passwordConfirm}: Signup) {

  const savedUserResponse = await fetch(
    "http://localhost:3001//api/v1/users/signup",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, email , password, passwordConfirm}),
    })

   
    if (savedUserResponse.ok) {
      const responseBody = await savedUserResponse.json();
      const { data } = responseBody;
      const { user } = data;

      return user;

    } else {
      const errorResponse = await savedUserResponse.json();
      const errorMessage = errorResponse.message || "Failed to create user.";
      throw new Error(errorMessage);
    }
    
}

