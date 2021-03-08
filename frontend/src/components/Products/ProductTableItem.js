import React from "react";
import { TableCell, TableRow, IconButton, Box } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const ProductTableItem = ({ editHandler, deleteHandler, product }) => {
  const onEditProduct = (productId) => {
    editHandler(productId);
  };

  const onDeleteProduct = (productId) => {
    deleteHandler(productId);
  };

  return (
    <TableRow hover key={product.id}>
      <TableCell>{product.name || "-"}</TableCell>
      <TableCell>{product.description || "-"}</TableCell>
      <TableCell>{product.brand || "-"}</TableCell>
      <TableCell>{product.quantity || "-"}</TableCell>
      <TableCell>{product.price || "-"}</TableCell>
      <TableCell>
        <Box display="flex">
          <IconButton
            aria-label="edit"
            className="hoverSuccessColor"
            size="small"
            onClick={() => onEditProduct(product.id)}
          >
            <EditIcon fontSize="small" />
          </IconButton>

          <IconButton
            aria-label="delete"
            className="hoverDangerColor"
            size="small"
            onClick={() => onDeleteProduct(product.id)}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default ProductTableItem;
