
import {
  Box,
  Card,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Select,
  styled,
  TextField,
} from "@mui/material";


import React, { useEffect, useState } from "react";

const ItemsBox = styled(Box)(({ theme }) => ({
  minWidth: "600px",
  borderBottom: "1px solid #999",
  padding: "10px 0px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  [theme.breakpoints.down('md')]: {
    gap: "15px"
  },
}));

const ItemsBox1 = styled(Box)(({ theme }) => ({
  minWidth: "600px",
  borderBottom: "1px solid #999",
  background: "#f5f5f5",
  color: "#88888",
  padding: "10px 0px",
  display: "flex",
  alignItems: "left",
  justifyContent: "space-around",
  [theme.breakpoints.down('md')]: {
    gap: "15px"
  },
}));

const OptionContiner = styled(Card)(({ theme }) => ({
  // margin: "0 10%",
  minWidth: "100%",
  //margin: "0 20px",
  "& h3": {
    margin: "0",
    padding: "15px",
    fontWeight: "400",
    borderBottom: "1px solid #999",
  },
  [theme.breakpoints.down('md')]: {
    overflowX: "scroll",
  }
}));


const ProductName = styled(Box)(({ theme }) => ({
  width: "460px",

}));

const ProductName1 = styled(Box)(({ theme }) => ({
  width: "480px",

}));

const ProductCode = styled(Box)(({ theme }) => ({
  width: "280px",
  paddingLeft: "40px",
  marignLeft: "20px",
  textAlign: "left"
}));

const ProductSize = styled(Box)(({ theme }) => ({
  width: "110px",
}));


const ProductPrice = styled(Box)(({ theme }) => ({
  width: "180px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

}));


const QuantityBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

}));

const QuantityBox1 = styled(Box)(({ theme }) => ({
  minWidth: '200px',
}));


const Product = (props) => {
  //console.log("prod.props", props); 
  return (
    <>
      <Container maxWidth="lx">
        <OptionContiner>
          <ItemsBox1>
            <ProductCode>Code</ProductCode>
            <ProductName1>Product</ProductName1>
            <ProductSize>SO</ProductSize>
            <ProductSize>Order Qty</ProductSize>
            <QuantityBox1>Recieve Qty</QuantityBox1>
            <ProductPrice>Price</ProductPrice>
            <ProductPrice>Discount(%)</ProductPrice>
            <ProductPrice>GST(%)</ProductPrice>
            <ProductPrice>Net Total</ProductPrice>
            <ProductPrice>Gross Total</ProductPrice>
            {/* <ProductPrice>Actions</ProductPrice> */}

          </ItemsBox1>
          {props.rows.length > 0 ? (
            props.rows
              .map((row) => {
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
                  <ItemsBox sx={{
                    background:
                      parseInt(row?.amount) === curr?.quantity
                        ? "#d1ffbd"
                        : "#ffcccb",
                  }}>

                    <ProductCode>{row.code}</ProductCode>
                    <ProductName>
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

                      />
                    </ProductName>
                    <ProductSize>{row.soNumber}</ProductSize>
                    <ProductSize>{row.amount}</ProductSize>
                    <ProductPrice>
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
                    </ProductPrice>
                    <ProductPrice>
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

                    </ProductPrice>
                    <ProductPrice>
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
                    </ProductPrice>
                    <ProductPrice>
                      <FormControl sx={{ m: 1, minWidth: 120 }} size="medium">

                        <Select
                          labelId="demo-select-small-label"
                          id="demo-select-small"
                          value={curr.gstRate}
                          name={"gstRate"}
                          //label="VAT"
                          onChange={(e) => props.handleChange(e, row)}
                        >
                          {props.vat.map((vat1) => (
                            <MenuItem value={vat1.id}>{vat1.name}</MenuItem>

                          ))}
                        </Select>
                      </FormControl>
                    </ProductPrice>
                    <ProductPrice>
                      <span>{"$" + curr.price * curr.quantity}</span>
                    </ProductPrice>
                    <ProductPrice>
                      <span>{"$" + (curr.price * curr.quantity * (1 - parseInt(curr.discount) / 100) * (1 + curr.gstRate / 100)).toFixed(3)}</span>
                    </ProductPrice>
                  </ItemsBox>
                );
              })
          ) : (
            <Grid item xs={12}>
              <Box textAlign={"center"} margin={"20px"}>No data available</Box>
            </Grid>
          )}
        </OptionContiner>
      </Container>
    </>
  );
};


export default Product;
