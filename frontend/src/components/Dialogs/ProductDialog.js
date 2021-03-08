import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Grid,
  TextField,
} from "@material-ui/core";
import { useDispatch } from "react-redux";

import { createProduct, updateProduct } from "../../store/product/actions";
import { createNotification } from "../../store/notification/actions";
import styles from "./ProductDialog.module.scss";

const ProductDialog = ({ open, item, onClose }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (item) {
      setName(item.name);
      setDescription(item.description);
      setBrand(item.brand);
      setQuantity(item.quantity);
      setPrice(item.price);
    } else {
      setName("");
      setDescription("");
      setBrand("");
      setQuantity("");
      setPrice("");
    }
  }, [item]);

  const handleCancel = () => {
    onClose();
  };

  const handleSave = () => {
    if (validateFields()) {
      const data = {
        name,
        description,
        brand,
        quantity,
        price,
      };

      item
        ? dispatch(updateProduct({ id: item.id, ...data }))
        : dispatch(createProduct(data));

      onClose();
    }
  };

  const validateFields = () => {
    const errors = [];

    if (!item && (!name || name.length === 0))
      errors.push("Name is a required field");
    if (!quantity || quantity.length === 0)
      errors.push("Quantity is a required field");
    if (!price || price.length === 0) errors.push("Price is a required field");

    if (errors.length) {
      dispatch(
        createNotification({
          message: errors[0],
          error: true,
        })
      );
      return false;
    }

    return true;
  };

  return (
    <Dialog disableBackdropClick maxWidth="md" open={open}>
      <DialogTitle>{item ? "Update Product" : "Create Product"}</DialogTitle>

      <DialogContent>
        <Box>
          <Grid container spacing={2}>
            {!item ? (
              <Grid item xs={12}>
                <Box>
                  <TextField
                    id="name"
                    label="Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                  />
                </Box>
              </Grid>
            ) : (
              ""
            )}

            <Grid item xs={12} md={6}>
              <Box>
                <TextField
                  id="description"
                  label="Description"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  fullWidth
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box>
                <TextField
                  id="brand"
                  label="Brand"
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  fullWidth
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box>
                <TextField
                  id="quantity"
                  label="Quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  fullWidth
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box>
                <TextField
                  id="price"
                  label="Price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  fullWidth
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions className={styles.DialogActions}>
        <Button autoFocus className="mutedColor" onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          className="successButton"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDialog;
