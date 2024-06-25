import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loader from "../commoncomponents/loader";

const LoginScreen = lazy(() => import("../expense/login"));
const HomeScreen = lazy(() => import("../expense/home"));
const OtpScreen = lazy(() => import("../expense/verifyotp"));
const AllHistoryScreen = lazy(() => import("../expense/allhistory"));
const ExpenselistScreen = lazy(() => import("../expense/onlyexpense/onlyexpenselist"));
const RoomMatesScreen = lazy(()=> import("../expense/roommate/roommateslist"))
const CalculationScreen = lazy(()=>import("../expense/calculation"))

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loader></Loader>}>
        <LoginScreen />
      </Suspense>
    ),
  },
  {
    path: "/home",
    element: (
      <Suspense fallback={<Loader></Loader>}>
        <HomeScreen />
      </Suspense>
    ),
  },
  {
    path: "/verify-otp",
    element: (
      <Suspense fallback={<Loader></Loader>}>
        <OtpScreen />
      </Suspense>
    ),
  },
  {
    path: "/viewall",
    element: (
      <Suspense fallback={<Loader></Loader>}>
        <AllHistoryScreen />
      </Suspense>
    ),
  },
  {
    path: "/expense",
    element: (
      <Suspense fallback={<Loader></Loader>}>
        <ExpenselistScreen />
      </Suspense>
    ),
  },
  {
    path: "/calculation",
    element: (
      <Suspense fallback={<Loader></Loader>}>
        <CalculationScreen />
      </Suspense>
    ),
  },
  {
    path: "/roommates",
    element: (
      <Suspense fallback={<Loader></Loader>}>
        <RoomMatesScreen />
      </Suspense>
    ),
  }
]);

export default routes;
