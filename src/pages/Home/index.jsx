import React from "react";
import { Route, Routes } from "react-router-dom";
import Profile from "./Profile";

const subRoutes = [];

const Home = ({ match }) => {
  //可以接收到記載route的match物件
  const { params, path } = match;
  console.log("match", match);
  return (
    <>
      <div>Home</div>
      <Routes>
        {/* //雖然也符合網址的條件，但是因為在Switch中只會渲染第一個符合條件的Route */}
        <Route
          path={`${path}/profile`}
          //要接props才拿到match
          element={<Profile />}
        />
      </Routes>
    </>
  );
};

export default Home;
