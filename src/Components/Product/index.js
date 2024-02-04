
import {
  Box,
  Container,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.light,
}))

const Product = (props) => {

  return (
    <>
      <Container maxWidth="lx">

        <TableContainer>
          <Table>
            <StyledTableHead>
              <TableRow>
                <TableCell style={{ color: "#f5f5f5" }}>Code</TableCell>
                <TableCell style={{ color: "#f5f5f5" }}>Product</TableCell>
                <TableCell style={{ color: "#f5f5f5" }}>SO</TableCell>
                <TableCell style={{ color: "#f5f5f5" }}>Order Qty</TableCell>
                <TableCell style={{ color: "#f5f5f5" }}>Recieve Qty</TableCell>
                <TableCell style={{ color: "#f5f5f5" }}>Price</TableCell>
                <TableCell style={{ color: "#f5f5f5" }}>Discount(%)</TableCell>
                <TableCell style={{ color: "#f5f5f5" }}>GST(%)</TableCell>
                <TableCell style={{ color: "#f5f5f5" }}>Net Total</TableCell>
                <TableCell style={{ color: "#f5f5f5" }}>Gross Total</TableCell>
                {/* Actions */}
              </TableRow>
            </StyledTableHead>
            <TableBody>
              {props.rows.length > 0 ? (
                props.rows.map((row) => {
                  const handleSO = (saleID) => {

                    const url = `https://au.erply.com/${props.code}/?lang=eng&section=invoice&authKey=${props.session}&edit=${saleID}`;
                    window.open(url, '_blank');
                  };
                  var curr = {};
                  props.modifiedData?.length > 0 &&
                    props.modifiedData.map((m) => {
                      
                      if (m.id === row.detailID) {
                        curr = m;
                      }
                    });
                   
                   
                  return (
                    <TableRow key={row.id} sx={{
                      background: (parseInt(row?.amount) <= curr?.quantity) ? "#d1ffbd" : "#ffcccb",
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
                          style={{ width: "180px" }}
                          size="small"
                        />
                      </TableCell>
                      <TableCell><span style={{ cursor: "pointer", color: "royalblue", textDecoration: "underline" }} onClick={() => handleSO(row.saleID)}>{row.soNumber}</span></TableCell>
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
                          style={{ width: "80px" }}
                          size="small"
                          error={curr.quantity < parseInt(curr.amount)}
                          //helperText={curr.quantity !== parseInt(curr.amount) ? "order-qty and recieve-qty must be same" : ""}
                          InputProps={{
                            inputProps: {
                              //max: parseInt(row?.amount),
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
                          style={{ width: "80px" }}
                          size="small"
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
                          style={{ width: "80px" }}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <FormControl sx={{ m: 1, minWidth: 80 }} size="small">

                          <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={curr.gstRate || props.vat[0]?.rate}
                            name={"gstRate"}

                            onChange={(e) => props.handleChange(e, row)}
                          >
                            {props.vat.map((vat1) => (
                              <MenuItem value={vat1.rate} key={vat1.id}>{vat1.name}</MenuItem>

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
