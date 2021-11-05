import React from "react";
import { Route, Link, Routes, Outlet } from "react-router-dom";
import RouteC from "./RouteC";

const RouteP = () => {
  return (
    <div>
      RouteP
      {/* <Routes>
        <Route path="child" element={<RouteC />} />
      </Routes> */}
      <Outlet />
    </div>
  );
};

export default RouteP;
