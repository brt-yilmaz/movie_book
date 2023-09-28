import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { apiFileUpload } from "../../services/apiFileUpload";
import { useAppDispatch, useAppSelector } from "../../state/store";
import { updateUserProfilePhoto } from "../../state/userSlice";

function FileUploader() {
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.user.token);
  const dispatch = useAppDispatch();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) {
        // When no file is selected
        toast.error("No file selected.");
        return;
      }

      const file = acceptedFiles[0]; // Assuming only one file is selected

      try {
        const response = await apiFileUpload(token, file);
        console.log("response", response);
        if (response.error) {
          // Handle API error
          toast.error(response.error);
        } else {
          // File uploaded successfully
          toast.success("File uploaded successfully.");
          navigate("/"); // Redirect to a success page or perform other actions
          console.log(response);
          dispatch(updateUserProfilePhoto(response.data.s3RL));
        }
      } catch (error) {
        // Handle network or other errors
        toast.error("An error occurred while uploading the file.");
      }
    },
    [navigate, token, dispatch]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <div {...getRootProps()} style={dropzoneStyles}>
        <input {...getInputProps()} />
        <p>Drag and drop files here or click to select</p>
      </div>
    </div>
  );
}

const dropzoneStyles: React.CSSProperties = {
  border: "2px dashed #cccccc",
  borderRadius: "4px",
  textAlign: "center",
  padding: "20px",
  cursor: "pointer",
};

export default FileUploader;
