import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "../components/layout/Layout.js";
import Main from "../pages/Main.js";
import Search from "../pages/Search.js";
import Recommend from "../pages/Recommend.js";
import Receipt from "../pages/Receipt.js";
import Detail from "../pages/Detail.js";
import Test from "../Test.js";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getToken } from "../slices/TokenSlice.js";

const Router = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getToken());
  }, []);

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="/search" element={<Search />} />
          <Route path="/recommend" element={<Recommend />} />
          <Route path="/receipt" element={<Receipt />} />

          <Route path="/detail/:id" element={<Detail />} />

          <Route path="/test" element={<Test />} />
          <Route path="*" element={<Main />} />
          {/* <Route path="/detail/:id" element={<Detail id={"id"} />} /> */}
        </Route>
      </Routes>
    </>
  );
};

export default Router;
