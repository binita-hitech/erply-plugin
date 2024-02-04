import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  Collapse,
  Typography,
  styled,
} from "@mui/material";
import moment from "moment";
import React, { memo, useEffect, useMemo, useState } from "react";
import OrderDetails from "./OrderDetails";

const OrderHeader = styled(Box)(({ theme }) => ({
  color: "#111",
  // color: "rgb(255, 255, 255)",
  // mixBlendMode: "difference",
  fontFamily: "Poppins !important",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "10px",
  "& span": {
    fontSize: "18px",
    fontWeight: "500",
    letterSpacing: "2px",
  },
}));

const DetailsDiv = styled(AccordionDetails)(({ theme }) => ({
  background: "#fff",
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
    color: "#111",
    // color: "rgb(255, 255, 255)",
    // mixBlendMode: "difference",

    fontSize: "12px",
    lineHeight: "1.4",
  },
}));

const OrderCard = ({
  order,
  session,
  code,
  warehouse
}) => {


  const AccDiv = styled(Accordion)(({ theme }) => ({

    fontFamily: "Poppins !important",
    background:
      
      "#EEF5FF"
    ,
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
      color: "#ffffff",
      
    },
  }));

  const [open, setOpen] = useState(false);
  
  return (
    <AccDiv expanded={open} onChange={() => setOpen(!open)}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Box>
          <OrderHeader>
            <h3>PO: #{order.poNo}</h3>
            {/* <span style={{ marginRight: "30px" }}>{currentTimer}</span> */}
          </OrderHeader>
          <Box
            display={"grid"}
            gridTemplateColumns={"1.75fr 1.50fr"}
            gap="15px"
            mt={3}
            color={"#999"}
          >
            <span>
              Order date:{" "}
              {moment(order.date).format("ddd, MMM Do YYYY, h:mm a")}
            </span>
            <span>Warehouse : {order.warehouseName}</span>
          </Box>
        </Box>
      </AccordionSummary>

      <OrderDetails

        order={order}
        sessionKey={session}
        clientCode={code}
        warehouse={warehouse}

      />

    </AccDiv>
  );
};

export default OrderCard;
