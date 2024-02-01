import { AccordionDetails, Box, Button, IconButton } from "@mui/material";
import React, { Suspense, useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Download } from "@mui/icons-material";


const DetailsDiv = styled(AccordionDetails)(({ theme }) => ({
    background: "#fff",
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

const OrderDetails = ({ order, clientCode, sessionKey, warehouse }) => {


    const state = {
        clientCode: clientCode,
        sessionKey: sessionKey,
        warehouse: warehouse,
    };

    return (
        <div>
            <DetailsDiv>
                {/* {order?.sales_lines?.map((sales, index) => { */}

                <Box
                    display={"grid"}
                    gridTemplateColumns={"3fr 3fr 3fr"}
                    alignItems={"left"}
                    //gap="10px"
                    key={order.id}
                    mb={1}
                >

                    <div>
                        <p>Supplier: {order.supplierName}</p>
                    </div>
                    <div>
                        <p>Status: {order.status?.split('_').join(' ')}</p>
                    </div>
                    <div>
                        <p>Total: {order.total === null ? "" : `$${parseFloat(order.total).toFixed(2)}`}</p>
                    </div>

                </Box>

                {/* })} */}
                <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    style={{ borderTop: "1px solid #999" }}
                    pt={2}
                    gap={"15px"}
                >
                    
                    <Button
                        variant="contained"
                        color="primary"
                        href={order.poLink}
                        download
                        target="_blank"
                    >
                        Download PO
                        <Download color="#ffffff" fontSize="small" />
                    </Button>
                   

                    <Link to={`/purchaseorderdetail/${order.id}`} state={state}>
                        <Button
                            variant="contained"
                            color="secondary"

                        >
                            Recieve PO
                        </Button>
                    </Link>
                </Box>
            </DetailsDiv>
        </div>
    );
};

export default OrderDetails;
