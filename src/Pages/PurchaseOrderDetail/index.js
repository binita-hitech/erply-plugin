import React, { useState, useEffect } from 'react';
import { useTheme, useMediaQuery, Pagination, Backdrop, Box, Button, Card, CircularProgress, Container, CssBaseline, Grid, Snackbar, TextField, Typography, styled } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useLocation } from "react-router";
import httpclient from '../../utils';
import MuiAlert from "@mui/material/Alert";
import moment from 'moment/moment';
import Product from '../../Components/Product';
import { Masonry } from "@mui/lab";
import OrderCard from "../../Components/OrderDetailCard"

const columns = [
    { id: "code", name: "Code" },
    { id: "itemName", name: "Product" },
    { id: "soNumber", name: "SO" },
    { id: "amount", name: "Order Qty" },
    { id: "productQuantity", name: "Recieve Qty" },
    { id: "price", name: "Price" },
    { id: "discount", name: "Discount (%)" },
    { id: "gstRate", name: "Gst Rate (%)" },
    { id: "costTotal", name: "NetTotal" },
    { id: "totalWithGst", name: "Gross Total" },
    { id: "action", name: "Action" },

];

const FlexContent = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    fontSize: "17px",
    marginBottom: "20px",
    alignItems: "flex-start",
   
    [theme.breakpoints.down("md")]: {
        flexDirection: "column", // Revert to row for medium and larger screens
        alignItems: "left",
        
    },
}));
const FlexContent1 = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    fontSize: "17px",
    marginBottom: "20px",
    alignItems: "flex-start",
    
    [theme.breakpoints.down("md")]: {
        
        flexDirection: "row", // Revert to row for medium and larger screens
        alignItems: "flex-start",
       
       
    },
}));

const FlexInnerTitle1 = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "left",
    justifyContent: "space-between",
    minWidth: "180px",
    maxWidth: "250px",
    fontWeight: "700",
    fontSize: "14px",
    [theme.breakpoints.down("md")]: {
        alignItems: "left",
        minWidth: "60%",
        maxWidth: "60%",

    },


}));

const FlexInnerTitle = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "left",
    justifyContent: "space-between",
    minWidth: "180px",
    maxWidth: "250px",
    fontWeight: "700",
    fontSize: "14px",
    [theme.breakpoints.down("md")]: {
        alignItems: "left",
        minWidth: "100%",
        maxWidth: "100%",

    },


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

const ButtonsCart = styled("div")(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    [theme.breakpoints.down("md")]: {
        flexDirection: "column", // Revert to row for medium and larger screens
        width: "100%",
    },

}));

const LeftButtons = styled("div")(({ theme }) => ({
    display: "flex",
    gap: "10px",
    [theme.breakpoints.down("md")]: {
        flexDirection: "column", // Revert to row for medium and larger screens
        width: "100%",
    },
}));


const RightButton = styled("div")(({ theme }) => ({

    display: "flex",
    gap: "10px",
    marginLeft: "auto",
    [theme.breakpoints.down("md")]: {
        marginTop: "10px",
        flexDirection: "column", // Revert to row for medium and larger screens
        width: "100%",
    },
}));

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const GridBlockContent = styled("div")(({ theme }) => ({
    display: "grid",
    minWidth: "100%",
    gridTemplateColumns: "auto",
    gap: "1px solid #ccc",
    fontFamily: "Poppins !important",
    fontSize: "14px",
    fontWeight: "bold",
    [theme.breakpoints.down("md")]: {
        width: "auto auto",
    },
}));

const GridBlockTitle = styled("div")(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid #f1f1f1",
    backgroundColor: "#f5f5f5",
    color: "#2a2a2a",
    padding: "16px",
    fontSize: "16px",
    textAlign: "left",
    textTransform: "uppercase",

}));


const PurchaseOrderDetail = () => {
    const { id } = useParams();
    const location = useLocation();
    const [total, setTotal] = React.useState(0);
    const [total2, setTotal2] = React.useState(0);
    const [total1, setTotal1] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    const [order, setOrder] = React.useState({});
    const [product, setProduct] = React.useState({});
    const [vat, setVat] = React.useState({});
    const [productDetails, setProductDetails] = React.useState([]);
    const [productItems, setProductItems] = React.useState([]);
    const [edit, setEdit] = React.useState(false)
    const [open, setOpen] = useState(false);
    const [snackStatus, setSnackStatus] = useState("");
    const [snackMessage, setSnackMessage] = useState("");
    var [modifiedData, setModifiedData] = useState([]);
    const [pickupList, setPickupList] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [barcode, setBarcode] = useState("");


    var sessionKey = localStorage.getItem('sessionKey');
    var session = JSON.parse(sessionKey);

    var clientCode = localStorage.getItem('clientCode');
    var code = JSON.parse(clientCode);

    var warehouses2 = localStorage.getItem('warehouses');
    var warehouses1 = JSON.parse(warehouses2);

    const [invoiceData, setInvoiceData] = useState({
        invoiceDate: "",
        invoiceNumber: "",
        invoiceTime: "",
        invoiceDueDays: "",
        notes: "",
    });

    const handleChange1 = (date) => {
        const formattedDate = dayjs(date).format('MM-DD-YYYY');
        setInvoiceData({
            ...invoiceData,
            invoiceDate: formattedDate,
        });
    };

    const handleChange2 = (selectedTime) => {
        const formattedTime = selectedTime.format('hh:mm A'); // Adjust the format as needed
        setInvoiceData({
            ...invoiceData,
            invoiceTime: formattedTime,
        });
    };

    const handleChange0 = (e) => {
        const { name, value } = e.target;
        setInvoiceData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    useEffect(() => {
        if (id !== undefined) {
            getPoList();
        }
    }, [id]);

    const getPoList = () => {
        setLoading(true);
        httpclient
            .get(`getPO.php?sessionKey=${session}&clientCode=${code}&warehouse=${location.state.warehouse}&poID=${id}`)
            .then(({ data }) => {
                if (data.msg === "success") {
                    setOrder(data.orderData);
                    setProduct(data.productDetail);
                    setPickupList(data.productDetail);
                    setVat(data.vatRates);
                    setLoading(false);
                } else {
                    console.log("Error!");
                }
            });
    };
    // console.log("prp", product);


    useEffect(() => {
        var allData = [];
        pickupList &&
            pickupList.map((pick) => {
                var newData = {
                    quantity: 0,
                    itemName: pick.itemName,
                    price: pick.price,
                    discount: pick.discount,
                    amount: pick.amount,
                    code: pick.code,
                    gstRate: 0,
                    costTotal: 0,
                    totalWithGst: 0,
                    id: pick.detailID,
                    productID: pick.productID,
                    soNumber: pick.soNumber,
                    barcode: pick.barcode,
                    barcodeFlag: false,
                };
                allData.push(newData);
            });

        setModifiedData(allData);
        setFilteredData(pickupList);
    }, [pickupList]);

    useEffect(() => {
        let calculatedTotal = 0;
        let calculatedTotalQuantity = 0;
        let calculatedGrossTotal = 0;

        for (let i = 0; i < modifiedData.length; i++) {

            const item = modifiedData[i];

            const { quantity, price, discount, gstRate } = item;

            const parsedQuantity = parseInt(quantity);
            const parsedPrice = parseFloat(price);
            const parsedDiscount = parseFloat(discount);
            const parsedGstRate = parseFloat(gstRate);

            calculatedTotalQuantity += parsedQuantity;

            const subtotal = parsedQuantity * parsedPrice;
            calculatedTotal += subtotal;

            const discountAmount = (subtotal * parsedDiscount) / 100;
            const gstAmount = (subtotal * parsedGstRate) / 100;
            const itemGrossTotal = subtotal - discountAmount + gstAmount;
            calculatedGrossTotal += itemGrossTotal;
        }

        setTotal1(calculatedTotalQuantity);
        setTotal(calculatedTotal.toFixed(3));
        setTotal2(calculatedGrossTotal.toFixed(3));
    }, [modifiedData]);




    const handleChange = (e, pick) => {
        
        const { name, value } = e.target;       
        const res = modifiedData.map((mod) => {
            if (mod.id === pick.detailID) {
                return { ...mod, [name]: value };
            } else {
                return mod;
            }
        });

        setModifiedData(res);
    };

    const handleChangeBarcode = (e) => {
        setBarcode(e.target.value);
    };
    //console.log("barcode", barcode);

    useEffect(() => {
        var res = modifiedData.filter((mod) => {
            if (parseInt(mod.barcode) == barcode) {
                return (mod.barcodeFlag = true);
            } else {
                return mod
            }
        });
        setModifiedData(res);
    }, [barcode])


    const handleChange3 = (e, pick) => {
        const updatedData = modifiedData.map((mod) => {
            if (mod.id === pick.detailID) {
                let currValue;
                if (e.target.value <= 0) {
                    currValue = 0;
                } else if (e.target.value >= parseInt(pick.amount)) {
                    currValue = parseInt(pick.amount);
                } else {
                    currValue = e.target.value;
                }
                return {
                    ...mod,
                    quantity: parseInt(currValue)
                };
            } else {
                return mod;
            }
        });
        
        setModifiedData(updatedData);
    };


    const handleSubmit = () => {
        setLoading(true);
        var formData = new FormData();
        formData.append('invoiceDate', invoiceData.invoiceDate);
        formData.append('invoiceNumber', invoiceData.invoiceNumber);
        formData.append('invoiceTime', invoiceData.invoiceTime);
        formData.append('invoiceDueDays', invoiceData.invoiceDueDays);
        formData.append('notes', invoiceData.notes);

        modifiedData.forEach((item, index) => {
            formData.append(`productID${index + 1}`, item.productID);
            formData.append(`code${index + 1}`, item.code);
            formData.append(`itemName${index + 1}`, item.itemName);
            formData.append(`amount${index + 1}`, item.quantity);
            formData.append(`price${index + 1}`, item.price);
            formData.append(`discount${index + 1}`, item.discount);
            formData.append(`vatrateID${index + 1}`, item.gstRate);
            formData.append(`soNumber${index + 1}`, item.soNumber);
        });

        httpclient.post(`/savePO.php?sessionKey=${session
            }&clientCode=${code
            }&supplierID=${order.supplierID
            }&warehouseID=${order.warehouseID
            }&poID=${id}`, formData).then(({ data }) => {
                if (data.msg === "success") {
                    setOpen(true);
                    setSnackStatus("success");
                    setSnackMessage(data.reason);
                    setLoading(false);
                } else {
                    setLoading(false);
                    setOpen(true);
                    setSnackStatus("error");
                    setSnackMessage(data.reason);
                }
            });
    }

    const calculateDueDate = () => {
        const dueDays = parseInt(invoiceData.invoiceDueDays);
        if (!isNaN(dueDays)) {
            const currentDate = moment(); 
            const futureDate = currentDate.add(dueDays, 'days');
            return futureDate.format('ddd, MMM Do YYYY, h:mm:ss a'); 
        }
        return '';
    };

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <div>
            <Container component="main" maxWidth="l" style={{ textAlign: 'left', marginTop: '20px', paddingBottom: '60px' }}>
                <CssBaseline />
                <Card>

                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                            <GridBlockContent>
                                <GridBlockTitle>Invoice for Order # {order.poNo}
                                    <Box textAlign={"right"}>
                                        <Link to='/purchaseorder'>
                                            <Button color="primary" variant="contained" >
                                                <ArrowBack sx={{ marginRight: "10px" }} />
                                                <b>Back</b>
                                            </Button>
                                        </Link>
                                    </Box>
                                </GridBlockTitle>
                                <Box pt={2} p={4} sx={{ margin: "20px", backgroundColor: "#f5f5f5" }}>
                                    <Grid container spacing={2}>
                                        {/* Left Side */}
                                        <Grid item xs={12} md={4}>
                                            <FlexContent1>
                                                <FlexInnerTitle1>
                                                    <span>Purchase Order No.</span> <span> </span>
                                                </FlexInnerTitle1>
                                                <Values>{order.poNo}</Values>
                                            </FlexContent1>

                                            <FlexContent1>
                                                <FlexInnerTitle1>
                                                    <span>Supplier Name</span> <span>   </span>
                                                </FlexInnerTitle1>
                                                <Values>{order.supplierName}</Values>
                                            </FlexContent1>


                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <FlexContent1>
                                                <FlexInnerTitle1>
                                                    <span>Date/Time</span> <span>  </span>
                                                </FlexInnerTitle1>
                                                <Values>{order.dateTime}</Values>
                                            </FlexContent1>

                                            <FlexContent1>
                                                <FlexInnerTitle1>
                                                    <span>Status</span> <span> </span>
                                                </FlexInnerTitle1>
                                                <Values>{order.status}</Values>
                                            </FlexContent1>


                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <FlexContent1>
                                                <FlexInnerTitle1>
                                                    <span>Warehouse</span> <span>   </span>
                                                </FlexInnerTitle1>
                                                <Values>{order.warehouseName}</Values>
                                            </FlexContent1>

                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box pt={2} p={4} sx={{ margin: "20px" }}>

                                    <Grid container spacing={2}>
                                        {/* Left Side */}
                                        <Grid item xs={12} md={6}>
                                            <FlexContent>
                                                <FlexInnerTitle>
                                                    <span>Invoice Date</span> <span>  </span>
                                                </FlexInnerTitle>
                                                <Values> <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DemoContainer components={['DatePicker']} sx={{ width: "100%" }}>
                                                        <DatePicker
                                                            name="invoiceDate"
                                                            label="Invoice Date"
                                                            format="MM-DD-YYYY"
                                                            value={invoiceData.invoiceDate}
                                                            onChange={handleChange1}

                                                        />
                                                    </DemoContainer>
                                                </LocalizationProvider></Values>
                                            </FlexContent>

                                            <FlexContent>
                                                <FlexInnerTitle>
                                                    <span>Invoice Number</span> <span>  </span>
                                                </FlexInnerTitle>
                                                <Values><TextField id="outlined-basic" placeholder="Invoice Number" variant="outlined"
                                                    name="invoiceNumber"
                                                    type="text"
                                                    required
                                                    error={!invoiceData.invoiceNumber}
                                                    value={invoiceData.invoiceNumber}
                                                    onChange={(e) => handleChange0(e)}
                                                    sx={{ width: "100%" }} /></Values>
                                            </FlexContent>


                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <FlexContent>
                                                <FlexInnerTitle>
                                                    <span>Invoice Time</span> <span>  </span>
                                                </FlexInnerTitle>
                                                <Values><LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DemoContainer components={['TimePicker']} sx={{ width: "100%" }}>

                                                        <TimePicker
                                                            label="Invoice Time"
                                                            name="invoiceTime"
                                                            value={invoiceData.invoiceTime}
                                                            onChange={handleChange2}

                                                        />
                                                    </DemoContainer>
                                                </LocalizationProvider></Values>
                                            </FlexContent>

                                            <FlexContent>
                                                <FlexInnerTitle>
                                                    <span>Invoice Due Days</span> <span>  </span>
                                                </FlexInnerTitle>
                                                <Values><TextField
                                                    id="standard-number"
                                                    //label="Number"
                                                    type="number"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    placeholder="Invoice Due Days"
                                                    variant="outlined"
                                                    name="invoiceDueDays"
                                                    //format="MM-DD-YYYY"
                                                    value={invoiceData.invoiceDueDays}
                                                    onChange={(e) => handleChange0(e)}
                                                    sx={{ width: "100%" }}
                                                    helperText={`${calculateDueDate()}`} /></Values>
                                            </FlexContent>


                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <FlexContent>
                                                <FlexInnerTitle>
                                                    <span>Notes</span> <span>  </span>
                                                </FlexInnerTitle>
                                                <Values><TextField
                                                    id="outlined-multiline-flexible"
                                                    label="Notes"
                                                    multiline
                                                    minRows={4}
                                                    name="notes"
                                                    type="text"
                                                    value={invoiceData.notes}
                                                    onChange={(e) => handleChange0(e)}
                                                    sx={{ width: "100%" }}
                                                /></Values>
                                            </FlexContent>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </GridBlockContent>
                        </Grid>
                    </Grid>
                    <Box pt={0} p={4} >
                        <Grid item xs={12} md={12}>
                            <FlexContent>
                                <FlexInnerTitle>
                                    <span>Products</span>
                                </FlexInnerTitle>
                            </FlexContent>
                        </Grid>
                    </Box>

                    {!isMobile ? (
                    <Grid item xs={12}>
                        <Product
                            columns={columns}
                            rows={filteredData}
                            handleChange={handleChange}
                            handleChange3={handleChange3}
                            modifiedData={modifiedData}
                            productDetails={productDetails}
                            vat={vat}
                            productItems={productItems}
                            setProductDetails={setProductDetails}
                            setProductItems={setProductItems}
                            edit={edit}
                            setEdit={setEdit}
                        />
                    </Grid>
                     ) : (
                    <Grid item xs={12}>
                        <Masonry
                            columns={{ xs: 1, sm: 2, md: 3 }}
                            spacing={3}
                            sx={{ margin: "0", width: "auto" }}
                        >
                            {filteredData &&
                                filteredData.map((po) => {
                                    let curr = {};
                                    if (modifiedData?.length > 0) {
                                        modifiedData.forEach((m) => {
                                            if (m.id === po?.detailID) {
                                                curr = m;
                                            }
                                        });
                                    }

                                    if (curr.barcodeFlag === true) {
                                        curr.quantity = parseInt(curr.amount, 10);
                                    }

                                    return (
                                        <Box key={po.id}>
                                            <OrderCard
                                                curr={curr}
                                                order={po}
                                                handleChange={handleChange}
                                                handleChange3={handleChange3}
                                                modifiedData={modifiedData}
                                                productDetails={productDetails}
                                                vat={vat}
                                                productItems={productItems}
                                                setProductDetails={setProductDetails}
                                                setProductItems={setProductItems}
                                                edit={edit}
                                                setEdit={setEdit}
                                            />
                                        </Box>
                                    );
                                })}
                        </Masonry>
                    </Grid>
                    )}

                    <Box pt={0} p={1} textAlign={"center"} >
                        <Grid item xs={12} md={12}>

                            <FlexInnerTitle>
                                <span>Scan Product Barcodes/Sku</span> <span>  </span>
                            </FlexInnerTitle>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Barcode"
                                multiline
                                minRows={1}
                                name="barcode"
                                type="text"
                                onChange={(e) => handleChangeBarcode(e)}


                            />

                        </Grid>
                    </Box>
                    <Box pt={0} p={2} sx={{ backgroundColor: "#f5f5f5" }}  >

                        <Grid container spacing={2}>
                            {/* Left Side */}
                            <Grid item xs={12} md={2}>
                                <FlexContent>
                                    <FlexInnerTitle>
                                        <span>Total Rec. Qty</span> <span>  <Values>{total1}</Values>  </span>
                                    </FlexInnerTitle>

                                </FlexContent>
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <FlexContent>
                                    <FlexInnerTitle>
                                        <span>Net Total</span> <span><Values>{total}</Values>  </span>
                                    </FlexInnerTitle>

                                </FlexContent>
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <FlexContent>
                                    <FlexInnerTitle>
                                        <span>GST Total</span> <span>   <Values>0</Values> </span>
                                    </FlexInnerTitle>

                                </FlexContent>
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <FlexContent>
                                    <FlexInnerTitle>
                                        <span>Gross</span> <span> <Values>{total2}</Values>  </span>
                                    </FlexInnerTitle>

                                </FlexContent>
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <FlexContent>
                                    <FlexInnerTitle>
                                        <span>Rounding</span> <span> <Values>0</Values>  </span>
                                    </FlexInnerTitle>

                                </FlexContent>
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <FlexContent>
                                    <FlexInnerTitle>
                                        <span>Total</span> <span> <Values>0</Values> </span>
                                    </FlexInnerTitle>

                                </FlexContent>
                            </Grid>
                        </Grid>
                    </Box>

                    <ButtonsCart>

                        <LeftButtons>
                            <Button variant="contained" onClick={handleSubmit} >Recieve PO</Button>
                            <Button variant="contained">Partial Recieve</Button>
                        </LeftButtons>
                        <RightButton>
                            <Button variant="contained">Reset</Button>
                        </RightButton>

                    </ButtonsCart>

                </Card>
            </Container>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}

            >
                <CircularProgress color="inherit" />
                <Typography variant="h6" component="div">
                    &nbsp;&nbsp; Fetching...Please Wait
                </Typography>
            </Backdrop>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert
                    onClose={handleClose}
                    severity={snackStatus}
                    sx={{ width: "100%" }}
                >
                    {snackMessage}
                </Alert>
            </Snackbar>
        </div >
    );
}

export default PurchaseOrderDetail;

