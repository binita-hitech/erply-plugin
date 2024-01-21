
import {
  Box,
  Container,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";


import React, { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


const Product = (props) => {
  //console.log("prod.props", props); 
  return (
    <>
      <Container maxWidth="lx">

        <TableContainer>
          <Table>
            <TableHead style={{ background: "#1976d2", color: "#f5f5f5" }}>
              <TableRow>
                <TableCell style={{color: "#f5f5f5" }}>Code</TableCell>
                <TableCell style={{color: "#f5f5f5" }}>Product</TableCell>
                <TableCell style={{color: "#f5f5f5" }}>SO</TableCell>
                <TableCell style={{color: "#f5f5f5" }}>Order Qty</TableCell>
                <TableCell style={{color: "#f5f5f5" }}>Recieve Qty</TableCell>
                <TableCell style={{color: "#f5f5f5" }}>Price</TableCell>
                <TableCell style={{color: "#f5f5f5" }}>Discount(%)</TableCell>
                <TableCell style={{color: "#f5f5f5" }}>GST(%)</TableCell>
                <TableCell style={{color: "#f5f5f5" }}>Net Total</TableCell>
                <TableCell style={{color: "#f5f5f5" }}>Gross Total</TableCell>
                {/* Actions */}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.rows.length > 0 ? (
                props.rows.map((row) => {
                  var curr = {};
                  props.modifiedData?.length > 0 &&
                    props.modifiedData.map((m) => {
                      if (m.id === row.detailID) {
                        curr = m;
                      }
                    });


                  if (curr.barcodeFlag === true) {
                    curr.quantity = parseInt(curr.amount)
                  };

                  return (
                    <TableRow key={row.id} sx={{
                      background: parseInt(row?.amount) === curr?.quantity ? "#d1ffbd" : "#ffcccb",
                    }}>
                      <TableCell>{row.code}</TableCell>
                      <TableCell>
                        <TextField
                          id="outlined-basic"
                          name="itemName"
                          type="text"
                          variant="outlined"
                          defaultValue={row.itemName}
                          value={
                            curr.itemName
                          }
                          onChange={(e) => props.handleChange(e, row)}
                          style={{ width: "260px" }}
                        />
                      </TableCell>
                      <TableCell>{row.soNumber}</TableCell>
                      <TableCell>{row.amount}</TableCell>
                      <TableCell>
                        <TextField
                          id="outlined-basic"
                          name={"quantity"}
                          type="number"
                          variant="outlined"
                          defaultValue={0}
                          value={
                            curr.quantity === 0
                              ? 0
                              : curr.quantity || 1
                          }
                          onChange={(e) => props.handleChange3(e, row)}
                          style={{ width: "160px" }}
                          error={curr.quantity !== parseInt(curr.amount)}
                          helperText={curr.quantity !== parseInt(curr.amount) ? "order-qty and recieve-qty must be same" : ""}
                          InputProps={{
                            inputProps: {
                              max: parseInt(row?.amount),
                              min: 0,
                            },
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          id="outlined-basic"
                          name="price"
                          type="text"
                          variant="outlined"
                          defaultValue={row.price}
                          value={
                            curr.price
                          }
                          onChange={(e) => props.handleChange(e, row)}
                          style={{ width: "120px" }}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          id="outlined-basic"
                          name="discount"
                          type="number"
                          variant="outlined"
                          defaultValue={row.discount}
                          value={
                            curr.discount
                          }
                          onChange={(e) => props.handleChange(e, row)}
                          style={{ width: "120px" }}
                        />
                      </TableCell>
                      <TableCell>
                        <FormControl sx={{ m: 1, minWidth: 120 }} size="medium">

                          <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={curr.gstRate}
                            name={"gstRate"}

                            onChange={(e) => props.handleChange(e, row)}
                          >
                            {props.vat.map((vat1) => (
                              <MenuItem value={vat1.id}>{vat1.name}</MenuItem>

                            ))}
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <span>{"$" + curr.price * curr.quantity}</span>
                      </TableCell>
                      <TableCell>
                        <span>{"$" + (curr.price * curr.quantity * (1 - parseInt(curr.discount) / 100) * (1 + curr.gstRate / 100)).toFixed(3)}</span>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={10} align="center">
                    <Box textAlign={"center"} margin={"20px"}>No data available</Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};


export default Product;
