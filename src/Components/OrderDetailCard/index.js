
import {
  Accordion,
  AccordionDetails,
  Box,
  styled,
  Grid,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Container
} from "@mui/material";
import moment from "moment";
import React, { useState } from "react";



const DetailsDiv = styled(AccordionDetails)(({ theme }) => ({
  background: "#f5f5f5",
  fontFamily: "Poppins !important",
  "& img": {
      height: "50px",
      width: "50px",
      objectFit: "contain",
      borderRadius: "5px",
  },
  "& p": {
      margin: "0",
      marginTop: "10px",
      marginBottom: "0",
  },
  "& small": {
      color: "grey",
      fontSize: "12px",
      lineHeight: "1.4",
  },
}));

const FlexContent1 = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  fontSize: "17px",
  marginBottom: "20px",
  alignItems: "flex-start",
  
}));

const FlexInnerTitle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "left",
  justifyContent: "space-between",
  minWidth: "120px",
  maxWidth: "250px",
  fontWeight: "700",
  fontSize: "14px",

}));

const Values = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  marginLeft: "15px",
  fontWeight: "500",
  fontSize: "14px",
  color: "#2a2a2a",
  width: "100%",

}));

const OrderCard = (props) => {

  

  const OrderHeader = styled(Box)(({ theme }) => ({
    color: "#111",
    background: parseInt(props?.order.amount) <= props.curr?.quantity ? "#d1ffbd" : "#ffcccb",
    fontFamily: "Poppins !important",
    padding:"15px",
    gap: "10px",
    "& span": {
      fontSize: "15px",
      color: "#111",
    },
  
  }));

  const AccDiv = styled(Accordion)(({ theme }) => ({
    background: parseInt(props?.order.amount) === props.curr?.quantity ? "#d1ffbd" : "#ffcccb",
    fontFamily: "Poppins !important",
    transition: "0.3s",
    // width:"440px",
    "& h3": {
      margin: "0",
    },
    "& .MuiAccordionSummary-expandIconWrapper": {
      top: "24px",
      right: "10px",
      position: "absolute",
    },

    "& span": {
      fontSize: "15px",
      color: "#111",
    },
    "& button": {
      textTransform: "none",
    },
    "& svg": {
      color: "#111",
      
    },
  }));



  return (
    <>
        <Box>
          <OrderHeader>
            <Box>
            <h3>Code: #{props?.order?.code}</h3>
            </Box>
          <Box
            display={"grid"}
            gridTemplateColumns={"1.75fr 1.50fr 1fr 0.3fr"}
            gap="15px"
            mt={3}
            color={"#999"}
          >
            <span>
              Added date:{" "}
              {moment(props.order?.addedDate).format("ddd, MMM Do YYYY, h:mm a")}
            </span>
            <span>Item : {props.order?.itemName}</span>
            <span>Order Qty : {props.order?.amount}</span>
            <span>SO: <span style={{cursor:"pointer", color:"royalblue", textDecoration: "underline"}} onClick={() => props.handleSO(props.order?.saleID)}>{props.order?.soNumber}</span></span>
          </Box>
          </OrderHeader>
        </Box>
    
      
      <DetailsDiv>
                <Box
                    display={"grid"}                   
                    alignItems={"left"}
                    pr={3}
                    pl={3}
                    pt={3}
                    //key={props.order?.id}
                    mb={1}
                >


                    {/* Left Side */}
                    <Grid item xs={12} md={4}>
                        <FlexContent1>
                            <FlexInnerTitle>
                                <span>Product: </span> <span> </span>
                            </FlexInnerTitle>
                            <Values><TextField
                                id="outlined-basic"
                                name="itemName"
                                type="text"
                                variant="outlined"
                                defaultValue={props.order?.itemName}
                                value={
                                    props.curr.itemName
                                }
                                onChange={(e) => props.handleChange(e, props.order)}
                                style={{ width: "100%" }}
                                size="small"
                            /></Values>
                        </FlexContent1>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <FlexContent1>
                            <FlexInnerTitle>
                                <span>Recieve Quantity: </span> <span> </span>
                            </FlexInnerTitle>
                            <Values><TextField
                            id="outlined-basic"
                            name={"quantity"}
                            type="number"
                            variant="outlined"
                            defaultValue={0}
                            value={
                                props.curr.quantity === 0
                                    ? 0
                                    : props.curr.quantity || 1
                            }
                            onChange={(e) => props.handleChange3(e, props.order)}
                            style={{ width: "100%" }}
                            size="small"
                            error={props.curr.quantity < parseInt(props.curr.amount)}
                            //helperText={props.curr.quantity !== parseInt(props.curr.amount) ? "order-qty and recieve-qty must be same" : ""}
                            Inputprops={{
                                inputprops: {
                                    //max: parseInt(props.order?.amount),
                                    min: 0,
                                },
                            }}
                            
                        /></Values>
                        </FlexContent1>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FlexContent1>
                            <FlexInnerTitle>
                                <span>Price: </span> <span> </span>
                            </FlexInnerTitle>
                            <Values><TextField
                            id="outlined-basic"
                            name="price"
                            type="text"
                            variant="outlined"
                            defaultValue={props.order?.price}
                            value={
                                props.curr.price
                            }
                            onChange={(e) => props.handleChange(e, props.order)}
                            style={{ width: "100%" }}
                            size="small"
                        /></Values>
                        </FlexContent1>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FlexContent1>
                            <FlexInnerTitle>
                                <span>Discount: </span> <span> </span>
                            </FlexInnerTitle>
                            <Values><TextField
                            id="outlined-basic"
                            name="discount"
                            type="number"
                            variant="outlined"
                            defaultValue={props.order?.discount}
                            value={
                                props.curr.discount
                            }
                            onChange={(e) => props.handleChange(e, props.order)}
                            style={{ width: "100%" }}
                            size="small"
                        /></Values>
                        </FlexContent1>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FlexContent1>
                            <FlexInnerTitle>
                                <span>GST: </span> <span> </span>
                            </FlexInnerTitle>
                            <Values><FormControl sx={{ width: "100%" }} size="small">

                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={props.curr.gstRate || props.vat[0]?.rate}
                                name={"gstRate"}

                                onChange={(e) => props.handleChange(e, props.order)}
                            >
                                {props.vat?.map((vat1) => (
                                    <MenuItem value={vat1.rate}>{vat1.name}</MenuItem>

                                ))}
                            </Select>
                        </FormControl></Values>
                        </FlexContent1>
                    </Grid>

                </Box>

                {/* })} */}
                <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    style={{ borderTop: "1px solid #999" }}
                    pt={2}
                    gap={"35px"}
                >

                    <div>
                        <p>Net Total: {"$" + props.curr.price * props.curr.quantity}</p>
                    </div>
                    <div>
                        <p>Gross Total: {"$" + (props.curr.price * props.curr.quantity * (1 - parseInt(props.curr.discount) / 100) * (1 + props.curr.gstRate / 100)).toFixed(3)}</p>
                    </div>
                </Box>
            </DetailsDiv>
            
      
    
   
    </>
  );
};

export default OrderCard;
