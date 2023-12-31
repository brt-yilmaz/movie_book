export async function apiFileUpload(token: string | null, file: File) {
  if (!token) {
    return { error: "A logged-in user is required." };
  }

  if (!file) {
    return { error: "No file selected." };
  }

  const url = `${
    import.meta.env.VITE_BASE_URL
  }/api/v1/users/uploadProfilePhoto/`;
  try {
    const formData = new FormData();
    formData.append("photo", file);
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
