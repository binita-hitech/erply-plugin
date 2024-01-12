import React from 'react';
import { Box, Button, Card, Container, CssBaseline, Grid, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const Page = styled("div")(({ theme }) => ({
    backgroundColor: "#fafafa",
    height: "100vh",
}));


const BoxFlex = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
}))

const Dashboard = () => {
    return (
        <Page>
            <BoxFlex>
                <Card sx={{ marginTop: '120px', width: '30%' }}>
                    <Box p={4}>
                        <Grid item xs={12}>
                            <Box textAlign="center"  >
                                <Link to="/purchaseorder">
                                    <Button
                                        size="large"
                                        variant="contained"
                                        color="primary"
                                        sx={{ margin: "10px" }}
                                    >
                                        Purchase Order Receiving
                                    </Button>
                                </Link>
                            </Box>

                        </Grid>
                    </Box>
                </Card>
            </BoxFlex>
        </Page>
    );
}


export default Dashboard;

