// -------------------------------usecontext-----------------------------------

// import React, { useCallback, useEffect, useState } from "react";
// import Nav from "./navbar";
// import History from "./history";

// import "../style/home.css";
// import MyChart from "./chart";
// import { expenseGetApi, expenseGetApiWithoutPagination } from "../api/expenseapicalls";
// import { useMyContext } from "../usemycontext";
// import { useAppDispatch, useAppSelector } from "../redux/hooks/storehooks";
// import { fetchExpenseWithoutPagination } from "../redux/actions/expenseactions";

// const Home: React.FC = () => {
//   const { list, setList,triggerapi,alllist,setAlllist } = useMyContext();
//   const localstorage_data = JSON.parse(localStorage.getItem("data") as string);
//   console.log(localstorage_data?.token, "tokenee");
//   // const [list, setList] = useState<ExpenseResponse>({
//   //   results: [],
//   //   page: 1,
//   //   limit: 5,
//   //   total: 0,
//   //   totalPages: 1,
//   //   fromdate: "",
//   //   todate: "",
//   //   availableBalance: 0,
//   //   totalExpenses: 0,
//   //   totalIncome: 0,
//   // });

//   const [loading, setLoading] = useState(false);

//   const allHistory = useCallback(
//     async () => {
//       setLoading(true);
//       try {
//         const response = await expenseGetApiWithoutPagination(
//           localstorage_data?.token
//         );
//         console.log(response, "history response");
//         // setList((prev) => ({
//         //   ...response,
//         //   fromdate: prev.fromdate,
//         //   todate: prev.todate,
//         // }));
//         setAlllist(response)
//         setLoading(false);
//       } catch (error) {
//         console.error("Failed to fetch expenses:", error);
//         setLoading(false);
//       }
//     },
//     [ localstorage_data?.token]
//   );

// useEffect(() => {
//     allHistory();
//   }, [ allHistory,triggerapi]);

// // const users = useAppSelector((state) => state.expense);
// // // const loading = useAppSelector((state) => state.allexpense.loading);
// // // const error = useAppSelector((state) => state.allexpense.error);
// // const dispatch = useAppDispatch();

// // useEffect(() => {
// //   dispatch(fetchExpenseWithoutPagination());
// // }, [dispatch]);
// // console.log(users,"Userssssss");

//   return (
//     <div>
//       <Nav />
//       {loading ? (
//         <div
//           className="spinner-border"
//           role="status"
//           style={{ justifyContent: "center",marginTop:"30%" }}
//         >
//           <span className="sr-only"></span>
//         </div>
//       ) : (
//         <>
//           <div className="home-container">
//             <div className="home-card">
//               <div className="home-card-body">
//                 <p className="home-card-title">Available Balance</p>
//                 <p className="home-card-text">₹ {alllist?.availableBalance}</p>
//               </div>
//             </div>
//             <div className="home-card">
//               <div className="home-card-body">
//                 <p className="home-card-title">Expense</p>
//                 <p className="home-card-text">₹ {alllist?.totalExpenses}</p>
//               </div>
//             </div>
//             <div className="home-card">
//               <div className="home-card-body">
//                 <p className="home-card-title">Income</p>
//                 <p className="home-card-text">₹ {alllist?.totalIncome}</p>
//               </div>
//             </div>
//           </div>
//           <MyChart all_data={alllist} />
//           <History all_data={alllist} />
//         </>
//       )}
//     </div>
//   );
// };
// export default Home;

// -------------------------------------/usecontext --------------------------------------

import React, { useEffect } from "react";
import Nav from "./navbar";
import History from "./history";

import "../style/home.css";
import MyChart from "./chart";

import { useAppDispatch, useAppSelector } from "../redux/hooks/storehooks";
import { fetchExpenseWithoutPagination } from "../redux/actions/expenseactions";

const Home: React.FC = () => {
  const expense = useAppSelector((state) => state.expense);
  // const loading = useAppSelector((state) => state.allexpense.loading);
  // const error = useAppSelector((state) => state.allexpense.error);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchExpenseWithoutPagination());
  }, [dispatch]);

  return (
    <div>
      <Nav />
      {expense?.loading ? (
        <div
          className="spinner-border"
          role="status"
          style={{ justifyContent: "center", marginTop: "30%" }}
        >
          <span className="sr-only"></span>
        </div>
      ) : (
        <>
          <div className="home-container">
            <div className="home-card">
              <div className="home-card-body">
                <p className="home-card-title">Available Balance</p>
                <p className="home-card-text">
                  ₹ {expense?.allexpense?.availableBalance}
                </p>
              </div>
            </div>
            <div className="home-card">
              <div className="home-card-body">
                <p className="home-card-title">Expense</p>
                <p className="home-card-text">
                  ₹ {expense?.allexpense?.totalExpenses}
                </p>
              </div>
            </div>
            <div className="home-card">
              <div className="home-card-body">
                <p className="home-card-title">Income</p>
                <p className="home-card-text">
                  ₹ {expense?.allexpense?.totalIncome}
                </p>
              </div>
            </div>
          </div>
          <MyChart all_data={expense?.allexpense} />
          <History all_data={expense?.allexpense} />
        </>
      )}
    </div>
  );
};
export default Home;
