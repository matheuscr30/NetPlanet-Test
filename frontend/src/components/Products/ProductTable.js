import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
} from "@material-ui/core";
import ProductTableItem from "./ProductTableItem";

const ProductTable = ({ products, editHandler, deleteHandler }) => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const tableHeaders = [
    "Name",
    "Description",
    "Brand",
    "Quantity",
    "Price",
    "Actions",
  ];

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = (event) => {
    setPage(0);
    setRowsPerPage(event.target.value);
  };

  return (
    <Card elevation={3} padding={0}>
      <CardContent>
        <Table>
          <TableHead>
            <TableRow>
              {tableHeaders.map((item) => (
                <TableCell key={Math.random()}>
                  <span>{item}</span>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {products.length ? (
              products
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((product) => (
                  <ProductTableItem
                    key={product.id}
                    product={product}
                    editHandler={(productId) => editHandler(productId)}
                    deleteHandler={(productId) => deleteHandler(productId)}
                  />
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={tableHeaders.length} align="center">
                  No products available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>

      <CardActions>
        <TablePagination
          component="div"
          count={products.length || 0}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
        />
      </CardActions>
    </Card>
  );
};

export default ProductTable;
