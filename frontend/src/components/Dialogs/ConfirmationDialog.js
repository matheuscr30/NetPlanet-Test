import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from "@material-ui/core";

const ConfirmationDialog = ({
  open,
  title,
  content,
  okText,
  cancelText,
  onClose,
}) => {
  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose(true);
  };

  return (
    <Dialog disableBackdropClick disableEscapeKeyDown maxWidth="sm" open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Box py={2}>{content}</Box>
      </DialogContent>
      <DialogActions>
        <Button autoFocus className="mutedColor" onClick={handleCancel}>
          {cancelText}
        </Button>
        <Button onClick={handleOk} className="successColor">
          {okText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
