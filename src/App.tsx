import { Box, grommet, Grommet } from "grommet";
import React from "react";
import { BrowserRouter, Link, Outlet, Route, Router, Routes } from "react-router-dom";
import DashboardPage from "./Pages/Dashboard/DashboardPage";
import Login from "./Pages/Login/Login";
import PrivateRoute from "./Pages/Router/privateRouter";
import Routers from "./Pages/Router/Routes";

const App = () => {
  return (
    <Routers></Routers>
  );
}

export default App;

