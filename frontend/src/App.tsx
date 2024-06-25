import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./expense/login"; // Ensure correct path to the Login component
import "../src/App.css";
import Home from "./expense/home";
import VerifyOtp from "./expense/verifyotp";
import AllHistory from "./expense/allhistory";
import { MyProvider } from "./context";

import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import Expenselist from "./expense/onlyexpense/onlyexpenselist";
import { RouterProvider } from "react-router-dom";
import routes from './router/router'
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Container>
    <RouterProvider router={routes} />
    </Container>

    // <Provider store={store}>
    //   <React.StrictMode>
    //     <BrowserRouter>
    //       <Routes>
    //         <Route path="/" element={<Login />} />
    //         <Route path="/verify-otp" element={<VerifyOtp />} />
    //         <Route path="/home" element={<Home />} />
    //         <Route path="/viewall" element={<AllHistory />} />
    //         <Route path="/expense" element={<Expenselist />} />
    //       </Routes>
    //     </BrowserRouter>
    //   </React.StrictMode>
    // </Provider>

  );
}

export default App;
