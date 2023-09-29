export async function apiFileUpload(token: string | null, file: File) {
  if (!token) {
    return { error: "A logged-in user is required." };
  }

  if (!file) {
    return { error: "No file selected." };
  }

  const url = `http://localhost:3001/api/v1/users/uploadProfilePhoto/`;
  try {
    const formData = new FormData();
    formData.append("photo", file);
    console.log(formData);
    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    });

    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}
