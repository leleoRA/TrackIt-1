// import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./css/reset.css"
import React, { useState, useContext } from "react";

import SignInPage from './Components/SignInPage'
import RegisterPage from './Components/RegisterPage'
import UserContext from "./context/UserContext";
import TodayPage from "./Components/TodayPage";
import Habits from "./Components/Habits";
import Historic from './Components/Historic'


export default function App() {
  const [info, setInfo] = useState();
  return (
    <BrowserRouter>
      <UserContext.Provider value={{ info, setInfo }}>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/cadastro" element={<RegisterPage />} />
          <Route path="/hoje" element={<TodayPage />} />
          <Route path="/habitos" element={<Habits />} />
          <Route path="/historico" element={<Historic />} />

        </Routes>
      </UserContext.Provider>
    </BrowserRouter >
  );
}

