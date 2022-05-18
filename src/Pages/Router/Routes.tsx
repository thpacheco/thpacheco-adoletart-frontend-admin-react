import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardPage from "../Dashboard/DashboardPage";
import Login from "../Login/Login";
import Main from "../Main/Main";
import PrivateRoute from "./privateRouter";

const Routers = () => {

    return (
        <Routes>
            <Route element={<Main />}>
                <Route index element={
                    <PrivateRoute>
                        <DashboardPage />
                    </PrivateRoute>
                } />
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <DashboardPage />
                        </PrivateRoute>
                    }
                />
            </Route>
            <Route path="/login" element={<Login />}
            />
        </Routes>
    );
}
export default Routers;