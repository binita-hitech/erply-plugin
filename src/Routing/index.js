import React from 'react'
import { BrowserRouter, HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from '../Pages/Login';
import Navbar from '../Components/Navbar';
import Dashboard from '../Pages/Dashboard';
import PurchaseOrder from '../Pages/PurchaseOrder';
import PurchaseOrderDetail from '../Pages/PurchaseOrderDetail';
import CopyAllTexts from '../test';


const PrivateRoute = ({ children }) => {
    return localStorage.getItem("clientCode") ? (
        <>
            <Navbar />
            {children}
        </>

    ) : (
        <Navigate to="/"></Navigate>
    );
};


const PublicRoute = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}

const Routing = () => {
    return (
        <BrowserRouter basename="/erply-plugin">
            <Routes>
                {/* HOME */}
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<PrivateRoute> <Dashboard /> </PrivateRoute>} />
                <Route path="/purchaseorder" element={<PrivateRoute> <PurchaseOrder /> </PrivateRoute>} />
                <Route path="/purchaseorderdetail/:id" element={<PrivateRoute> <PurchaseOrderDetail /> </PrivateRoute>} />
                <Route path="/test" element={<CopyAllTexts/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default Routing;
