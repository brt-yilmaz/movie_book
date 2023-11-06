import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { apiFileUpload } from "../../services/apiFileUpload";
import { useAppDispatch, useAppSelector } from "../../state/store";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { updateUserProfilePhoto } from "../../state/userSlice";

type FileUploaderDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function UploadImageModal({ open, setOpen }: FileUploaderDialogProps) {
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.user.token);
  const dispatch = useAppDispatch();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) {
        toast.error("No file selected.");
        return;
      }

      const file = acceptedFiles[0];

      try {
        const response = await apiFileUpload(token, file);

        if (response.error) {
          toast.error(response.error);
        } else {
          toast.success("File uploaded successfully.");
          dispatch(updateUserProfilePhoto(response.data.s3URL));
          handleClose();
        }
      } catch (error) {
        toast.error("An error occurred while uploading the file.");
      }
    },
    [navigate, token, dispatch]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <button onClick={handleOpen}>Upload File</button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Upload File</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Drag and drop files here or click to select.
          </DialogContentText>
          <div {...getRootProps()} style={dropzoneStyles}>
            <input {...getInputProps()} />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
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

export default UploadImageModal;
