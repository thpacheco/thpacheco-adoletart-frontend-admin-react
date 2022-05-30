import { Box, Spinner, Stack } from "grommet";
import React from "react";
import { Route, Routes } from "react-router-dom";
import LoadingComponent from "../../Components/Loading";
import BudgetPage from "../Budget/BudgetPage";
import Login from "../Login/Login";
import Main from "../Main/Main";
import PrivateRoute from "./privateRouter";

const DashboardPage = React.lazy(() => import('../Dashboard/DashboardPage'));
const CustumerPage = React.lazy(() => import('../Custumer/CustumerPage'));

const Routers = () => {
    return (
        <React.Suspense fallback={<LoadingComponent />}>
            <Routes>
                <Route element={<Main />}>
                    <Route index element={
                        <PrivateRoute>
                            <DashboardPage />
                        </PrivateRoute>
                    } />
                    <Route
                        path="dashboard"
                        element={
                            <PrivateRoute>
                                <DashboardPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="custumer"
                        element={
                            <PrivateRoute>
                                <CustumerPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="budget"
                        element={
                            <PrivateRoute>
                                <BudgetPage />
                            </PrivateRoute>
                        }
                    />
                </Route>
                <Route path="/login" element={<Login />} />
            </Routes>
        </React.Suspense>
    );
}
export default Routers;