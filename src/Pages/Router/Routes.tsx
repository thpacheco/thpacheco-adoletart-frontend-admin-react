import React from "react";
import { Route, Routes } from "react-router-dom";
import LoadingComponent from "../../Components/Loading";
import BudgetPage from "../Budget/BudgetPage";
import CustumerEditPage from "../Custumer/CustumerEditPage";
import CustumerNewPage from "../Custumer/CustumerNewPage";
import CustumerListPage from "../Custumer/List/CustumerListPage";
import DashboardPage from "../Dashboard/DashboardPage";
import Login from "../Login/Login";
import Main from "../Main/Main";
import PageNotFoundPage from "../PageNotFound/PageNotFoundPage";
import ProductListPage from "../Product/List/ProductListPage";
import ProductEditPage from "../Product/ProductEditPage";
import ProductNewPage from "../Product/ProductNewPage";
import PrivateRoute from "./privateRouter";

// const DashboardPage = React.lazy(() => import('../Dashboard/DashboardPage'));
// const CustumerEditPage = React.lazy(() => import('../Custumer/CustumerEditPage'));

const Routers = () => {
    return (
        <Routes>
            <Route element={<Login />}>
                <Route path="login/*" element={<Login />} />
            </Route>
            <Route path="/*" element={<Main />}>
                <Route index element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
                <Route path="custumers/*">
                    <Route index element={<PrivateRoute><CustumerListPage /></PrivateRoute>} />
                    <Route path=':id' element={<PrivateRoute><CustumerEditPage /></PrivateRoute>} />
                    <Route path='new' element={<PrivateRoute><CustumerNewPage /></PrivateRoute>} />
                </Route>
                <Route path="products/*">
                    <Route index element={<PrivateRoute><ProductListPage /></PrivateRoute>} />
                    <Route path=':id' element={<PrivateRoute><ProductEditPage /></PrivateRoute>} />
                    <Route path='new' element={<PrivateRoute><ProductNewPage /></PrivateRoute>} />
                </Route>
                <Route path="budget" element={<BudgetPage />} />
            </Route>
            <Route path="*" element={<PageNotFoundPage />}></Route>
        </Routes>
    );
}
export default Routers;