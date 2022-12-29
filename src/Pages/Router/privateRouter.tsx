import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthHelper from '../../Common/AuthHelper';

const isAuth = (): boolean => {
    return AuthHelper.isAutenticed();
};

const PrivateRoute: React.FC<any> = ({ redirectPath = '/login', children }) => {

    if (!isAuth()) {
        return <Navigate to={redirectPath} replace />;
    }
    return children ? children : <Outlet />;
};

export default PrivateRoute;
