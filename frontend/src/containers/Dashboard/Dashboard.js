import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Container, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import { deleteProduct, getProducts } from "../../store/product/actions";
import ProductTable from "../../components/Products/ProductTable";
import ConfirmationDialog from "../../components/Dialogs/ConfirmationDialog";
import ProductDialog from "../../components/Dialogs/ProductDialog";

const Dashboard = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.product.products);
  const [productId, setProductId] = useState(0);
  const [modalConfirmationDialog, setModalConfirmationDialog] = useState(false);
  const [modalProduct, setModalProduct] = useState({
    active: false,
    item: null,
  });

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const onCreateHandler = () => {
    setModalProduct({ active: true, item: null });
  };

  const onEditHandler = (id) => {
    const product = products.find((prod) => prod.id === id);
    setModalProduct({ active: true, item: product });
  };

  const onDeleteHandler = (productId) => {
    setProductId(productId);
    setModalConfirmationDialog(true);
  };

  const onCloseDeleteConfirmationDialog = (val) => {
    if (val && productId) {
      dispatch(deleteProduct(productId));
    }
    setModalConfirmationDialog(false);
  };

  const onCloseModalProduct = () => {
    setModalProduct({ active: false, item: null });
  };

  return (
    <div>
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="space-between" mx="auto">
          <Typography variant="h5" component="span" color="textPrimary">
            Products
          </Typography>

          <Button
            variant="contained"
            color="secondary"
            className="successButton"
            size="small"
            endIcon={<AddIcon />}
            onClick={onCreateHandler}
          >
            New Product
          </Button>
        </Box>

        <Box mt={3}>
          <ProductTable
            products={products}
            deleteHandler={(productId) => onDeleteHandler(productId)}
            editHandler={(productId) => onEditHandler(productId)}
          />
        </Box>
      </Container>

      <ConfirmationDialog
        open={modalConfirmationDialog}
        title="Are you sure?"
        content="You will not be able to undo this operation"
        okText="Yes, delete it!"
        cancelText="cancel"
        onClose={onCloseDeleteConfirmationDialog}
      />

      <ProductDialog
        open={modalProduct.active}
        item={modalProduct.item}
        onClose={onCloseModalProduct}
      />
    </div>
  );
};

export default Dashboard;
