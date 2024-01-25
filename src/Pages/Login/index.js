import React, { useState, useEffect } from 'react';
import { Box, Button, Card, Container, CssBaseline, FormGroup, Grid, TextField, Snackbar, CircularProgress } from '@mui/material';
import { AccountCircle, Https, Menu } from '@mui/icons-material';
import { styled } from "@mui/material";
import httpclient from '../../utils';
import MuiAlert from "@mui/material/Alert";
import Logo from "../../../src/Components/assets/ret1.png"
import { useNavigate } from "react-router";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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
    borderBottom: "1px solid #f1f1f1",
    backgroundColor: "#1976d2",
    color: "#ffffff",
    padding: "16px",
    fontSize: "16px",
    textAlign: "left",
}));

const Login = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [snackStatus, setSnackStatus] = useState("");
    const [snackMessage, setSnackMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [loginData, setLoginData] = useState({
        clientCode: "",
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        //console.log("user-name-value", name, value);
        setLoginData({
            ...loginData,
            [name]: value,
        });
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    const handleKeyPassword = (e) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    }

    const handleSubmit = () => {
        setLoading(true);
        let formData = new FormData();
        formData.append("clientCode", loginData.clientCode);
        formData.append("username", loginData.username);
        formData.append("password", loginData.password);

        httpclient.post('/login.php', formData).then(({ data }) => {
            if (data.msg === "success") {
                localStorage.setItem("sessionKey", JSON.stringify(data.sessionKey));
                localStorage.setItem("clientCode", JSON.stringify(data.clientCode));
                localStorage.setItem("userName", JSON.stringify(data.employeeName));
                setOpen(true);
                setSnackStatus("success");
                setSnackMessage("Logged in successfully!");
                setLoading(false);
                setTimeout(() => {
                    navigate("/purchaseorder");
                }, 500);
            } else {
                setLoading(false);
                setOpen(true);
                setSnackStatus("error");
                setSnackMessage(data.reason);

            }
        })
    }

    return (
        <div>
            <Container component="main" maxWidth="sm" style={{ textAlign: 'center', marginTop: '120px' }}>
                <CssBaseline />
                <Card style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.5)' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} textAlign="center">
                            <img src={Logo} alt="img"/>
                        </Grid>
                        <Grid item xs={12}>

                            <FormGroup>
                                <GridBlockContent>
                                    {/* <GridBlockTitle>Login</GridBlockTitle> */}
                                    <Box pt={2} pb={1}>
                                        <Box p={2} pb={2} sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                            <Menu sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                            <TextField
                                                id="input-with-sx"
                                                label=""
                                                placeholder="StoreCode"
                                                variant="standard"
                                                name="clientCode"
                                                type="text"
                                                value={loginData.clientCode}
                                                onChange={(e) => handleChange(e)}
                                                sx={{ width: '100%' }} />
                                        </Box>
                                        <Box p={2} pb={2} sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                            <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                            <TextField
                                                id="input-with-sx"
                                                label=""
                                                placeholder="Username"
                                                variant="standard"
                                                name="username"
                                                type="text"
                                                value={loginData.username}
                                                onChange={(e) => handleChange(e)}
                                                sx={{ width: '100%' }} />
                                        </Box>
                                        <Box p={2} pb={2} sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                            <Https sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                            <TextField
                                                id="input-with-sx"
                                                label=""
                                                placeholder="Password"
                                                variant="standard"
                                                name="password"
                                                type="password"
                                                value={loginData.password}
                                                onKeyDown={handleKeyPassword}
                                                onChange={(e) => handleChange(e)}
                                                sx={{ width: '100%' }} />
                                        </Box>
                                    </Box>
                                    <Box p={2} textAlign={"right"}>
                                        {loading ?
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                            >
                                                <CircularProgress style={{ height: "20px", width: "20px", color: "#fff", marginRight: "10px" }} /> Loading
                                            </Button> :
                                            <Button
                                                color="primary"
                                                variant="contained"
                                                onClick={handleSubmit}
                                            >
                                                <b>Login</b>
                                            </Button>
                                        }
                                    </Box>
                                </GridBlockContent>
                            </FormGroup>
                        </Grid>
                    </Grid>



                </Card>
            </Container>

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

export default Login;

