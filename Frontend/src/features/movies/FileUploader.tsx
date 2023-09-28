import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { apiFileUpload } from "../../services/apiFileUpload";
import { useAppSelector } from "../../state/store";

function FileUploader() {
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.user.token);

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

        if (response.error) {
          // Handle API error
          toast.error(response.error);
        } else {
          // File uploaded successfully
          toast.success("File uploaded successfully.");
          navigate("/success"); // Redirect to a success page or perform other actions
        }
      } catch (error) {
        // Handle network or other errors
        toast.error("An error occurred while uploading the file.");
      }
    },
    [navigate, token]
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
