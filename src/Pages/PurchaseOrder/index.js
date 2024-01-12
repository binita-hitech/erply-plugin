import React, { useState, useEffect } from 'react';
import { Box, Button, Card, Container, CssBaseline, FormControl, FormGroup, Grid, InputAdornment, InputLabel, LinearProgress, MenuItem, Select, TextField, Typography, styled } from '@mui/material';
import { ArrowBack, Cancel, Search } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import httpclient from '../../utils';
import TableComponent1 from '../../Components/TableComponent';


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

const GridBlockContent = styled("div")(({ theme }) => ({
    display: "grid",
    maxWidth: "100%",
    gridTemplateColumns: "auto",
    gap: "1px solid #ccc",
    fontFamily: "'Trebechut' sans-serif",
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


const PurchaseOrder = () => {
    var sessionKey = localStorage.getItem('sessionKey');
    var session = JSON.parse(sessionKey);

    var clientCode = localStorage.getItem('clientCode');
    var code = JSON.parse(clientCode);

    var warehouses2 = localStorage.getItem('warehouses');
    var warehouses1 = JSON.parse(warehouses2);

    var [warehouse, setWarehouse] = useState('');
    //console.log("wqewe", warehouse);

    const handleChange = (event) => {
        setWarehouse(event.target.value);
    };

    const [loading, setLoading] = useState(false);
    const [poList, setPoList] = useState({});
    const [warehouses, setWarehouses] = useState({});
    const [searchValue, setSearchValue] = useState('');
    const [searchValue1, setSearchValue1] = useState('');

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
        if (warehouse !== '') {
            getPoList();
        }
    }, [warehouse, searchValue, searchValue1]);

    const getPoList = () => {
        setLoading(true);
        httpclient
            .get(`getAllPO.php?sessionKey=${session}&clientCode=${code}&warehouse=${warehouse}&poNo=${searchValue}&supplier=${searchValue1}`)
            .then(({ data }) => {
                if (data.msg === "success") {
                    setPoList(data.orderData);
                    setLoading(false);
                } else {
                    console.log("Error!");
                }
            });
    };

    //console.log("warehouses", warehouses);
    //console.log("po", poList);

    const handleSearch = () => {
        setSearchValue(searchValue);
        setSearchValue1(searchValue1);
    };

    const handleSearch1 = () => {
        setSearchValue1(searchValue1);
    };

    const handleCancel = () => {
        setSearchValue('');
    };

    const handleCancel1 = () => {
        setSearchValue1('');
    };

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
                                        <Box textAlign={"right"}>
                                            <Link to="/dashboard">
                                                <Button color="primary" variant="contained" >
                                                    <ArrowBack sx={{ marginRight: "10px" }} />
                                                    <b>Back</b>
                                                </Button>
                                            </Link>
                                        </Box>
                                    </GridBlockTitle>
                                    <Box pt={2} pb={1}>
                                        <Box p={2} pb={2} sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                            <FormControl fullWidth sx={{ flex: 1, marginRight: '8px' }}>
                                                <TextField
                                                    size="small"
                                                    variant="standard"
                                                    placeholder="Filter by PO#"
                                                    value={searchValue}
                                                    onChange={(e) => setSearchValue(e.target.value)}
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                {searchValue ? (
                                                                    <Cancel
                                                                        onClick={handleCancel}
                                                                        style={{ cursor: 'pointer' }}
                                                                    />
                                                                ) : null}
                                                                <Search
                                                                    onClick={handleSearch}
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
                                                    variant="standard"
                                                    placeholder="Filter by Supplier"
                                                    value={searchValue1}
                                                    onChange={(e) => setSearchValue1(e.target.value)}
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                {searchValue1 ? (
                                                                    <Cancel
                                                                        onClick={handleCancel1}
                                                                        style={{ cursor: 'pointer' }}
                                                                    />
                                                                ) : null}
                                                                <Search
                                                                    onClick={handleSearch1}
                                                                    style={{ cursor: 'pointer' }}
                                                                />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </FormControl>

                                        </Box>
                                    </Box>

                                    <Box p={2} pb={2} sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <FormControl variant="standard" sx={{ m: 1, minWidth: "50%" }}>
                                            <InputLabel id="demo-simple-select-standard-label">Search By Warehouse</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-standard-label"
                                                id="demo-simple-select-standard"
                                                value={warehouse}
                                                onChange={handleChange}
                                                label="Search By Warehouse"

                                            >   <MenuItem value={''}>Pick Warehouse </MenuItem>

                                                {warehouses1 && warehouses1.map((warehouse, index) => (
                                                    <MenuItem value={warehouse.warehouseID}>{warehouse.warehouseName}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Box>


                                </GridBlockContent>

                            </FormGroup>
                        </Grid>
                    </Grid>
                    {loading &&
                        <Box sx={{ width: '100%' }}>
                            <LinearProgress />
                        </Box>
                    }
                    <Grid item xs={12}>
                        <TableComponent1
                            columns={columns}
                            rows={poList}
                            sessionKey={session}
                            clientCode={code}
                            warehouse={warehouse}
                        />
                    </Grid>
                </Card>
            </Container>
        </div >
    );
}

export default PurchaseOrder;

