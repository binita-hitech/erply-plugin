import React, { useState, useEffect } from 'react';
import {
    Backdrop, Box, Button, Card, CircularProgress, Container, CssBaseline, FormControl, FormGroup, Grid, InputAdornment, InputLabel, LinearProgress, MenuItem, Select, TextField, Typography, styled, Pagination,
    useMediaQuery,
    useTheme,
    Collapse,
    Snackbar
} from '@mui/material';
import { ArrowBack, ArrowForward, Cancel, Close, FilterList, Search } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import httpclient from '../../utils';
import TableComponent1 from '../../Components/TableComponent';
import { Masonry } from "@mui/lab";
import OrderCard from "../../Components/OrderCard";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const columns = [
    { id: "poNo", name: "PO#" },
    { id: "date", name: "Date" },
    { id: "warehouseName", name: "Warehouse" },
    { id: "supplierName", name: "Supplier" },
    { id: "total", name: "Total" },
    { id: "status", name: "Status" },
    { id: "poLink", name: "PO Link" },
    { id: "actions", name: "Recieved PO" },

];

const StyledFormControl = styled(FormControl)(({ theme }) => ({
    width: "50%", // Default width for all screens
    size: "small",
    [theme.breakpoints.down("md")]: {
        width: "100%", // Set a minimum width for medium and larger screens
    },
}));

const FilteredBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'flex-start',
    background: "#f9f9f9",
    padding: "5px 10px",
    borderRadius: "5px",
    "& p": {
        margin: "3px 0",
        marginRight: "10px",
        display: "inline-block",
        background: "#dedede",
        borderRadius: "10px",
        padding: "2px 5px",
    },
    "& span": {
        margin: "3px 3px ",

    },
    "& svg": {
        fontSize: "15px",
        cursor: "pointer",
        position: "relative",
        top: "3px",
        background: theme.palette.primary.dark,
        color: "#fff",
        borderRadius: "50%",
        padding: "2px",
        marginLeft: "2px",
    },
}));

const ButtonBox = styled(Box)(({ theme }) => ({
    textAlign: "right",
    display: "flex",
    gap: "10px",
    [theme.breakpoints.down("md")]: {
        display: "flex",
        flexDirection: "column",  // Set the direction to column for vertical arrangement
        gap: "3px",

    },

}));

const GridBlockContent = styled("div")(({ theme }) => ({
    display: "grid",
    maxWidth: "100%",
    gridTemplateColumns: "auto",
    gap: "1px solid #ccc",
    fontFamily: "Poppins !important",
    fontSize: "14px",
    fontWeight: "bold",
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

const FlexContent = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    width: "100%",
    [theme.breakpoints.down("md")]: {
        flexDirection: "column", // Revert to row for medium and larger screens
        alignItems: "left",
    },
}));


const PurchaseOrder = () => {
    var sessionKey = localStorage.getItem('sessionKey');
    var session = JSON.parse(sessionKey);

    var clientCode = localStorage.getItem('clientCode');
    var code = JSON.parse(clientCode);

    var warehouses2 = localStorage.getItem('warehouses');
    var warehouses1 = JSON.parse(warehouses2);


    //console.log("wqewe", warehouse);



    const [loading, setLoading] = useState(false);
    const [poList, setPoList] = useState([]);
    const [warehouses, setWarehouses] = useState({});


    const [page, setPage] = useState(1);
    const [from, setFrom] = useState(1);
    const [to, setTo] = useState(
        20
    );
    const [total, setTotal] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [count, setCount] = useState(1);
    const [filterOpen, setFilterOpen] = useState(true);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [messageState, setMessageState] = useState("");

    const [filterData, setFilterData] = useState({
        warehouse: "",
        searchValue: "",
        searchValue1: "",
        remove: false,
    });

    const [submittedData, setSubmittedData] = useState({
        warehouse: "",
        searchValue: "",
        searchValue1: "",
        submit: false,
    });

    useEffect(() => {
        getWarehouses();
    }, []);

    const getWarehouses = () => {
        httpclient
            .get(`getwarehouses.php?sessionKey=${session}&clientCode=${code}`)
            .then(({ data }) => {
                if (data.msg === "success") {
                    setWarehouses(data.warehouse);
                    localStorage.setItem("warehouses", JSON.stringify(data.warehouse));
                } else {
                    console.log("Error!");
                }
            });
    };


    useEffect(() => {
        if (
            filterData.warehouse === "" &&
            filterData.searchValue === "" &&
            filterData.searchValue1 === ""
        ) {
            setSubmittedData({
                ...submittedData,
                submit: false,
            });
        }
        if (filterData.warehouse === " ") filterData.warehouse = "";

        if (filterData.searchValue === " ") filterData.searchValue = "";

        if (filterData.searchValue1 === " ") filterData.searchValue1 = "";

        filterData.remove === true && handleFilter();
    }, [filterData]);


    useEffect(() => {
        let currentpolicy = JSON.parse(localStorage.getItem("orderlist_filter"));
        currentpolicy !== null && setFilterData(currentpolicy);
        // console.log("currentpolicy", currentpolicy);

        currentpolicy !== null && setFilterData(currentpolicy);
        //console.log("currentpolicy", currentpolicy);

        currentpolicy == null
            ? getPoList()
            : currentpolicy.warehouse == "" &&
                currentpolicy.searchValue == "" &&
                currentpolicy.searchValue1 == "" &&
                currentpolicy.removed == false
                ? getPoList()
                : console.log("orders");
    }, []);



    const getPoList = () => {
        setLoading(true);
        httpclient
            .get(`getAllPO.php?sessionKey=${session}&clientCode=${code}&perPage=${rowsPerPage}`)
            .then(({ data }) => {
                if (data.msg === "success") {
                    setPoList(data.orderData);
                    setTotal(data.paginateData.total);
                    setRowsPerPage(data.paginateData.perPage);
                    setPage(data.paginateData.pagination);
                    setFrom(data.paginateData.from);
                    setTo(data.paginateData.to);
                    setCount(Math.ceil(data.paginateData.total / data.paginateData.perPage));
                    setLoading(false);
                } else {
                    console.log("Error!");
                }
            });
    };

    //console.log("warehouses", warehouses);
    console.log("po", poList);

    const handleChangePage = (event, page) => {
        //setPage(newPage);
        setLoading(true);
        submittedData.submit ?
            httpclient
                .get(`getAllPO.php?sessionKey=${session}&clientCode=${code}&warehouse=${filterData.warehouse}&poNo=${filterData.searchValue}&supplier=${filterData.searchValue1}&perPage=${rowsPerPage}&pagination=${page}`)
                .then(({ data }) => {
                    if (data.msg === "success") {
                        setPoList(data.orderData);
                        setTotal(data.paginateData.total);
                        setRowsPerPage(data.paginateData.perPage);
                        setPage(data.paginateData.pagination);
                        setFrom(data.paginateData.from);
                        setTo(data.paginateData.to);
                        setCount(Math.ceil(data.paginateData.total / data.paginateData.perPage));
                        setLoading(false);

                    } else {
                        console.log("Error!");
                    }
                })
            : httpclient
                .get(`getAllPO.php?sessionKey=${session}&clientCode=${code}&perPage=${rowsPerPage}&pagination=${page}`)
                .then(({ data }) => {
                    if (data.msg === "success") {
                        setPoList(data.orderData);
                        setTotal(data.paginateData.total);
                        setRowsPerPage(data.paginateData.perPage);
                        setPage(data.paginateData.pagination);
                        setFrom(data.paginateData.from);
                        setTo(data.paginateData.to);
                        setCount(Math.ceil(data.paginateData.total / data.paginateData.perPage));
                        setLoading(false);
                    } else {
                        console.log("Error!");
                    }
                })


    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        //setPage(0);
        setLoading(true);
        submittedData.submit
            ?
            httpclient
                .get(`getAllPO.php?sessionKey=${session}&clientCode=${code}&warehouse=${filterData.warehouse}&poNo=${filterData.searchValue}&supplier=${filterData.searchValue1}&perPage=${+event.target.value}&pagination=${page}`)
                .then(({ data }) => {
                    if (data.msg === "success") {
                        setPoList(data.orderData);
                        setTotal(data.paginateData.total);
                        setRowsPerPage(data.paginateData.perPage);
                        setPage(data.paginateData.pagination);
                        setFrom(data.paginateData.from);
                        setTo(data.paginateData.to);
                        setCount(Math.ceil(data.paginateData.total / data.paginateData.perPage));
                        setLoading(false);

                    } else {
                        console.log("Error!");
                    }
                })
            : httpclient
                .get(`getAllPO.php?sessionKey=${session}&clientCode=${code}&perPage=${+event.target.value}&pagination=${1}`)
                .then(({ data }) => {
                    if (data.msg === "success") {
                        setPoList(data.orderData);
                        setTotal(data.paginateData.total);
                        setRowsPerPage(data.paginateData.perPage);
                        setPage(data.paginateData.pagination);
                        setFrom(data.paginateData.from);
                        setTo(data.paginateData.to);
                        setCount(Math.ceil(data.paginateData.total / data.paginateData.perPage));
                        setLoading(false);
                    } else {
                        console.log("Error!");
                    }
                })
    };

    const handleFilter = () => {
        setSubmittedData({
            ...submittedData,
            warehouse: filterData.warehouse,
            searchValue: filterData.searchValue,
            searchValue1: filterData.searchValue1,

            submit: true,
        });

        filterData.remove = true;

        // const orderlistFilterNew = {
        //   ...filterData,
        //   order_status: "Recieved", // Set order_status to "new" for orderlist_filter_new
        // };
        localStorage.setItem("orderlist_filter", JSON.stringify(filterData));
        // localStorage.setItem("orderlist_filter_new", JSON.stringify(orderlistFilterNew)); // Save orderlist_filter_new in localStorage

        setLoading(true);
        if (
            filterData.warehouse ||
            filterData.searchValue ||
            filterData.searchValue1

        ) {
            httpclient
                .get(
                    `getAllPO.php?sessionKey=${session}&clientCode=${code}&warehouse=${filterData.warehouse}&poNo=${filterData.searchValue}&supplier=${filterData.searchValue1}&perPage=${rowsPerPage}&pagination=${1}`
                )
                .then(({ data }) => {
                    if (data.msg === "success") {
                        setLoading(false);
                        setPoList(data.orderData);
                        setTotal(data.paginateData.total);
                        setRowsPerPage(data.paginateData.perPage);
                        setPage(data.paginateData.pagination);
                        setFrom(data.paginateData.from);
                        setTo(data.paginateData.to);
                        setCount(Math.ceil(data.paginateData.total / data.paginateData.perPage));
                        setLoading(false);
                    }
                });
        } else {
            getPoList();
        }
    };

    const handleChangeFilter = (e) => {
        const { name, value } = e.target;
        setFilterData({
            ...filterData,
            [name]: value,
            remove: false,
        });
    };
    // console.log('filter data', filterData);

    const handleRemove = (data) => {

        setFilterData({
            ...filterData,
            [data]: "",
            remove: true,
        });

        setSubmittedData({
            ...submittedData,
            [data]: "",
        });
    }


    const handleCancel = () => {
        setFilterData({
            ...filterData,
            searchValue: "",
            remove: true,
        });

        setSubmittedData({
            ...submittedData,
            searchValue: "",
        });
    };

    const handleCancel1 = () => {
        setFilterData({
            ...filterData,
            searchValue1: "",
            remove: true,
        });

        setSubmittedData({
            ...submittedData,
            searchValue1: "",
        });
    };

    const hadleFilterOpen = () => {
        setFilterOpen((prev) => !prev);
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));


    return (
        <div>
            <Container component="main" maxWidth="l" style={{ textAlign: 'center', marginTop: '20px' }}>
                <CssBaseline />
                <Card>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormGroup>
                                <GridBlockContent>
                                    <GridBlockTitle>
                                        <Box textAlign={"left"}>
                                            Purchase Order Recieving
                                        </Box>

                                        <ButtonBox>


                                            <Link to="/dashboard">
                                                <Button color="primary" variant="contained" >
                                                    <ArrowBack sx={{ marginRight: "10px" }} />
                                                    <b>Back</b>
                                                </Button>
                                            </Link>
                                            <Button color="primary" variant="contained"
                                                onClick={hadleFilterOpen}
                                            >
                                                Filter <FilterList style={{ marginLeft: "5px" }} fontSize="small" />
                                            </Button>
                                        </ButtonBox>
                                    </GridBlockTitle>

                                    {/* <Box pt={2} pb={1}> */}
                                    <Collapse in={filterOpen}>
                                        <Card>
                                            <Box p={2} pb={2} sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                                <FlexContent>
                                                    <>
                                                        <FormControl fullWidth sx={{ flex: 1, marginRight: '8px' }}>
                                                            <TextField
                                                                size="small"
                                                                //variant="standard"
                                                                placeholder="Filter by PO#"
                                                                value={filterData.searchValue}
                                                                name="searchValue"
                                                                onChange={handleChangeFilter}
                                                                InputProps={{
                                                                    endAdornment: (
                                                                        <InputAdornment position="end">
                                                                            {filterData.searchValue ? (
                                                                                <Cancel
                                                                                    onClick={handleCancel}
                                                                                    style={{ cursor: 'pointer' }}
                                                                                />
                                                                            ) : null}
                                                                            <Search
                                                                                onClick={handleFilter}
                                                                                style={{ cursor: 'pointer' }}
                                                                            />
                                                                        </InputAdornment>
                                                                    ),
                                                                }}
                                                            />
                                                        </FormControl>

                                                        <FormControl fullWidth sx={{ flex: 1 }}>
                                                            <TextField
                                                                size="small"
                                                                //variant="standard"
                                                                placeholder="Filter by Supplier"
                                                                value={filterData.searchValue1}
                                                                name="searchValue1"
                                                                onChange={handleChangeFilter}
                                                                InputProps={{
                                                                    endAdornment: (
                                                                        <InputAdornment position="end">
                                                                            {filterData.searchValue1 ? (
                                                                                <Cancel
                                                                                    onClick={handleCancel1}
                                                                                    style={{ cursor: 'pointer' }}
                                                                                />
                                                                            ) : null}
                                                                            <Search
                                                                                onClick={handleFilter}
                                                                                style={{ cursor: 'pointer' }}
                                                                            />
                                                                        </InputAdornment>
                                                                    ),
                                                                }}
                                                            />
                                                        </FormControl>
                                                    </>
                                                </FlexContent>
                                            </Box>

                                            {/* </Box> */}

                                            <Box p={2} pb={2} sx={{ display: 'flex', alignItems: 'flex-end' }}>

                                                <StyledFormControl>
                                                    <InputLabel size="small" id="demo-simple-select-standard-label">Search By Warehouse</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-standard-label"
                                                        id="demo-simple-select-standard"
                                                        value={filterData.warehouse}
                                                        onChange={handleChangeFilter}
                                                        label="Search By Warehouse"
                                                        name="warehouse"
                                                        size="small"

                                                    >   <MenuItem value={''}>Pick Warehouse </MenuItem>

                                                        {warehouses1 && warehouses1.map((warehouse, index) => (
                                                            <MenuItem value={warehouse.warehouseID}>{warehouse.warehouseName}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </StyledFormControl>

                                            </Box>



                                            <Box textAlign={"right"} padding={"10px"}>

                                                <Button color="primary" variant="contained" onClick={handleFilter} >
                                                    <b>Filter</b>
                                                    <ArrowForward sx={{ marginLeft: "10px" }} />

                                                </Button>

                                            </Box>
                                        </Card>
                                    </Collapse>
                                    {submittedData.warehouse ||
                                        submittedData.searchValue ||
                                        submittedData.searchValue1 ? (
                                        <Card>

                                            <FilteredBox>
                                                <span>Filtered: </span>
                                                {submittedData.warehouse && (
                                                    <p>
                                                        <span>
                                                            Warehouse: {poList[0]?.warehouseName}

                                                        </span>
                                                        <Close
                                                            fontSize="small"
                                                            onClick={() => handleRemove("warehouse")}
                                                        />
                                                    </p>
                                                )}

                                                {submittedData.searchValue && (
                                                    <p>
                                                        <span>PO Number: {submittedData.searchValue}</span>
                                                        <Close
                                                            fontSize="small"
                                                            onClick={() => handleRemove("searchValue")}
                                                        />
                                                    </p>
                                                )}
                                                {submittedData.searchValue1 && (
                                                    <p>
                                                        <span>Supplier: {submittedData.searchValue1}</span>
                                                        <Close
                                                            fontSize="small"
                                                            onClick={() => handleRemove("searchValue1")}
                                                        />
                                                    </p>
                                                )}

                                            </FilteredBox>

                                        </Card>
                                    ) : (
                                        <Box></Box>
                                    )}



                                </GridBlockContent>

                            </FormGroup>
                        </Grid>
                    </Grid>
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={loading}

                    >
                        <CircularProgress color="inherit" />
                        {/* <Typography variant="h6" component="div">
                            &nbsp;&nbsp; Fetching...Please Wait
                        </Typography> */}
                    </Backdrop>
                    {!isMobile ? (
                        <Grid item xs={12}>
                            <TableComponent1
                                columns={columns}
                                rows={poList}
                                sessionKey={session}
                                clientCode={code}
                                warehouse={filterData.warehouse}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                total={total && total}
                                fromTable={from}
                                toTable={to}
                                handleChangePage={handleChangePage}
                                handleChangeRowsPerPage={handleChangeRowsPerPage}
                            />

                        </Grid>
                    ) : (
                        <Grid item xs={12}>
                            <Masonry
                                columns={{ xs: 1, sm: 2, md: 3 }}
                                spacing={3}
                                sx={{ margin: "0", width: "auto" }}
                            >
                                {poList &&
                                    poList.map((po) => (
                                        <Box key={po.id}>
                                            <OrderCard
                                                order={po}
                                                sessionKey={session}
                                                clientCode={code}
                                                warehouse={filterData.warehouse}
                                            />
                                        </Box>
                                    ))}
                            </Masonry>
                            {poList.length ? (
                                <Box
                                    alignItems={"center"}
                                    justifyContent={"center"}
                                    display={"flex"}
                                >
                                    <Pagination
                                        size="large"
                                        count={count}
                                        page={page}
                                        onChange={handleChangePage}
                                        variant="outlined"
                                        shape="rounded"
                                        color="primary"
                                    />
                                </Box>
                            ) : (
                                ""
                            )}
                        </Grid>
                    )}
                </Card>
            </Container>
            <Snackbar
                autoHideDuration={3000}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={open}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity={messageState}
                    sx={{ width: "100%" }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </div >
    );
}

export default PurchaseOrder;

