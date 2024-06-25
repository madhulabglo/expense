// ------------------------context ------------------------

// import React, { useEffect, useState, useCallback } from "react";
// import Nav from "./navbar";
// import Modal from "../commoncomponents/modal";
// import EditExpense from "./editexpense";

// import "../style/allhistory.css";
// import { expenseGetApi } from "../api/expenseapicalls";
// import { Expense, ExpenseResponse } from "../types/expenseTypes";
// import DeleteExpense from "./deleteexpense";
// import AddExpense from "./addexpense";
// import { useMyContext } from "../usemycontext";

// const AllHistory: React.FC = () => {
//   const localstorage_data = JSON.parse(localStorage.getItem("data") as string);
//   console.log(localstorage_data?.token, "tokenee");
//   const { list, setList,triggerapi,setTriggerapi } = useMyContext();
//   // const [triggerapi, setTriggerapi] = useState(false);
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

//   const [modalOpen, setModalOpen] = useState<{
//     add: boolean;
//     edit: boolean;
//     delete: boolean;
//   }>({
//     add: false,
//     edit: false,
//     delete: false,
//   });

//   const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
//   const [loading, setLoading] = useState(false);

//   const handleEdit = (expense: Expense) => {
//     setSelectedExpense(expense);
//     setModalOpen((prev) => ({ ...prev, edit: true }));
//   };

//   const handleDelete = (expense: Expense) => {
//     setSelectedExpense(expense);
//     setModalOpen((prev) => ({ ...prev, delete: true }));
//   };

//   const handleAdd = () => {
//     setModalOpen((prev) => ({ ...prev, add: true }));
//   };

//   const handlePageChange = (newPage: number) => {
//     setList((prev) => ({ ...prev, page: newPage }));
//   };

//   const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setList((prev) => ({ ...prev, [name]: value }));
//   };

//   const allHistory = useCallback(
//     async (page: number) => {
//       setLoading(true);
//       try {
//         const response = await expenseGetApi(
//           page,
//           list.limit,
//           list.fromdate,
//           list.todate,
//           localstorage_data?.token
//         );
//         console.log(response, "history response");
//         setList((prev) => ({
//           ...response,
//           fromdate: prev.fromdate,
//           todate: prev.todate,
//         }));
//         setLoading(false);
//       } catch (error) {
//         console.error("Failed to fetch expenses:", error);
//         setLoading(false);
//       }
//     },
//     [list.limit, list.fromdate, list.todate, localstorage_data?.token]
//   );

//   // Prevent setting todate if fromdate is empty
//   useEffect(() => {
//     if (list.fromdate && list.todate === "") {
//       setList((prev) => ({ ...prev, todate: list.fromdate }));
//     }
//   }, [list.fromdate]);

//   useEffect(() => {
//     allHistory(list.page);
//   }, [list.page,list.limit, list.fromdate, list.todate, allHistory,triggerapi]);

//   return (
//     <div>
//       <Nav />
//       <div className="history-container">
//         <h5>All History</h5>
//         <div className="history-date-filter">
//           <input
//             name="fromdate"
//             id="fromdate"
//             placeholder="Enter date"
//             type="date"
//             onChange={handleDateChange}
//             value={list.fromdate}
//             required
//             max={list?.todate}
//           />
//           <input
//             name="todate"
//             id="todate"
//             placeholder="Enter date"
//             type="date"
//             onChange={handleDateChange}
//             value={list.todate}
//             required
//             min={list?.fromdate}
//           />
//         </div>
//       </div>
//       <div className="history-balance-card-container">
//         <div className="history-balance-card">
//           <div className="history-balance-card-body">
//             <p className="history-balance-card-title">Available Balance</p>
//             <p className="history-balance-card-text">
//               ₹ {list?.availableBalance}
//             </p>
//           </div>
//         </div>
//         <div className="history-balance-card">
//           <div className="history-balance-card-body">
//             <p className="history-balance-card-title">Expense</p>
//             <p className="history-balance-card-text">₹ {list?.totalExpenses}</p>
//           </div>
//         </div>
//         <div className="history-balance-card">
//           <div className="history-balance-card-body">
//             <p className="history-balance-card-title">Income</p>
//             <p className="history-balance-card-text">₹ {list?.totalIncome}</p>
//           </div>
//         </div>
//       </div>
//       <div className="history-card">
//         <table className="table table-striped">
//           <thead>
//             <tr>
//               <th scope="col">#</th>
//               <th scope="col">Amount</th>
//               <th scope="col">Category</th>
//               <th scope="col">Description</th>
//               <th scope="col">Date</th>
//               <th scope="col">Type</th>
//               <th scope="col">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? (
//               <div
//                 className="spinner-border"
//                 role="status"
//                 style={{ justifyContent: "center" }}
//               >
//                 <span className="sr-only"></span>
//               </div>
//             ) : list.results.length === 0 ? (
//               <td colSpan={6}>No history</td>
//             ) : (
//               list.results.map((element, index) => (
//                 <tr key={element._id}>
//                   <th scope="row">{index + 1}</th>
//                   <td>{element.amount}</td>
//                   <td>{element.category}</td>
//                   <td>{element.description}</td>
//                   <td>{element.date.slice(0, 10)}</td>
//                   <td>
//                     {element.is_expense ? (
//                       <p style={{ color: "red" }}>Expense</p>
//                     ) : (
//                       <p style={{ color: "green" }}>Income</p>
//                     )}
//                   </td>
//                   <td>
//                     <i
//                       className="bi bi-pencil-square"
//                       onClick={() => handleEdit(element)}
//                       style={{ cursor: "pointer" }}
//                     ></i>
//                     &nbsp;&nbsp;
//                     <i
//                       className="bi bi-trash"
//                       onClick={() => handleDelete(element)}
//                       style={{ cursor: "pointer" }}
//                     ></i>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//       <div className="d-flex justify-content-between align-items-center">
//         <div style={{ marginLeft: "70%" }}>
//           Page {list.page} of {list.totalPages}
//         </div>
//         <nav style={{ marginRight: "7%", marginTop: "1%" }}>
//           <ul className="pagination">
//             <li className={`page-item ${list.page === 1 ? "disabled" : ""}`}>
//               <button
//                 className="page-link"
//                 onClick={() => handlePageChange(list.page - 1)}
//                 disabled={list.page === 1}
//               >
//                 Previous
//               </button>
//             </li>
//             {[...Array(list.totalPages)].map((_, idx) => (
//               <li
//                 key={idx + 1}
//                 className={`page-item ${list.page === idx + 1 ? "active" : ""}`}
//               >
//                 <button
//                   className="page-link"
//                   onClick={() => handlePageChange(idx + 1)}
//                 >
//                   {idx + 1}
//                 </button>
//               </li>
//             ))}
//             <li
//               className={`page-item ${
//                 list.page === list.totalPages ? "disabled" : ""
//               }`}
//             >
//               <button
//                 className="page-link"
//                 onClick={() => handlePageChange(list.page + 1)}
//                 disabled={list.page === list.totalPages}
//               >
//                 Next
//               </button>
//             </li>
//           </ul>
//         </nav>
//       </div>
//       <div className="history-add-button">
//         <button type="button" className="btn btn-light" onClick={handleAdd}>
//           <i className="bi bi-plus-circle"></i>&nbsp;add
//         </button>
//       </div>
//       <Modal
//         isOpen={modalOpen.add}
//         title="Add Expense"
//         onClose={() => setModalOpen((prev) => ({ ...prev, add: false }))}
//       >
//         {list && (
//           <AddExpense
//             setModal={setModalOpen}
//             setList={setList}
//             list={list}
//             triggerapi={triggerapi}
//             setTriggerapi={setTriggerapi}
//           />
//         )}
//       </Modal>
//       <Modal
//         isOpen={modalOpen.edit}
//         title="Edit Expense"
//         onClose={() => setModalOpen((prev) => ({ ...prev, edit: false }))}
//       >
//         {selectedExpense && (
//           <EditExpense
//             expense={selectedExpense}
//             setModal={setModalOpen}
//             setList={setList}
//             list={list}
//             triggerapi={triggerapi}
//             setTriggerapi={setTriggerapi}
//           />
//         )}
//       </Modal>
//       <Modal
//         isOpen={modalOpen.delete}
//         title="Delete Expense"
//         onClose={() => setModalOpen((prev) => ({ ...prev, delete: false }))}
//       >
//         {selectedExpense && (
//           <DeleteExpense
//             expense={selectedExpense}
//             setModal={setModalOpen}
//             setList={setList}
//             list={list}
//             triggerapi={triggerapi}
//             setTriggerapi={setTriggerapi}
//           />
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default AllHistory;

// -------------------------- /context -----------------------------------

// ----------------------------------- redux -------------------------------

import React, { useEffect, useState } from "react";
import Nav from "./navbar";
import Modal from "../commoncomponents/modal";
import EditExpense from "./allexpense/editexpense";

import "../style/allhistory.css";

import { Expense } from "../types/expenseTypes";
import DeleteExpense from "./allexpense/deleteexpense";
import AddExpense from "./allexpense/addexpense";
import { useAppDispatch, useAppSelector } from "../redux/hooks/storehooks";
import { fetchExpenseWithPagination } from "../redux/actions/expenseactions";

const AllHistory: React.FC = () => {
  const localstorage_data = JSON.parse(localStorage.getItem("data") as string);
  // const { list, setList,triggerapi,setTriggerapi } = useMyContext();
  // const [triggerapi, setTriggerapi] = useState(false);
  // const [list, setList] = useState<ExpenseResponse>({
  //   results: [],
  //   page: 1,
  //   limit: 5,
  //   total: 0,
  //   totalPages: 1,
  //   fromdate: "",
  //   todate: "",
  //   availableBalance: 0,
  //   totalExpenses: 0,
  //   totalIncome: 0,
  // });

  const expense = useAppSelector((state) => state.expensePagination);
  // const loading = useAppSelector((state) => state.allexpense.loading);
  // const error = useAppSelector((state) => state.allexpense.error);
  const dispatch = useAppDispatch();
  const [modalOpen, setModalOpen] = useState<{
    add: boolean;
    edit: boolean;
    delete: boolean;
  }>({
    add: false,
    edit: false,
    delete: false,
  });

  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [page, setPage] = useState({ page: 1, limit: 5 });
  const [date, setDate] = useState({ fromdate: "", todate: "" });
  const [triggerapi, setTriggerapi] = useState(false);

  const handleEdit = (expense: Expense) => {
    setSelectedExpense(expense);
    setModalOpen((prev) => ({ ...prev, edit: true }));
  };

  const handleDelete = (expense: Expense) => {
    setSelectedExpense(expense);
    setModalOpen((prev) => ({ ...prev, delete: true }));
  };

  const handleAdd = () => {
    setModalOpen((prev) => ({ ...prev, add: true }));
  };

  const handlePageChange = (newPage: number) => {
    setPage((prev) => ({ ...prev, page: newPage }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDate((prev) => ({ ...prev, [name]: value }));
  };

  // const allHistory = useCallback(
  //   async (page: number) => {
  //     setLoading(true);
  //     try {
  //       const response = await expenseGetApi(
  //         page,
  //         list.limit,
  //         list.fromdate,
  //         list.todate,
  //         localstorage_data?.token
  //       );
  //       console.log(response, "history response");
  //       setList((prev) => ({
  //         ...response,
  //         fromdate: prev.fromdate,
  //         todate: prev.todate,
  //       }));
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Failed to fetch expenses:", error);
  //       setLoading(false);
  //     }
  //   },
  //   [list.limit, list.fromdate, list.todate, localstorage_data?.token]
  // );

  useEffect(() => {
    dispatch(
      fetchExpenseWithPagination(
        page?.page,
        page?.limit,
        date?.fromdate,
        date?.todate
      )
    );
  }, [dispatch, page?.page, page?.limit, date?.todate, triggerapi]);
  // Prevent setting todate if fromdate is empty
  useEffect(() => {
    if (date.fromdate && date.todate === "") {
      setDate((prev) => ({ ...prev, todate: date.fromdate }));
    }
  }, [date.fromdate]);

  // useEffect(() => {
  //   allHistory(list.page);
  // }, [list.page,list.limit, list.fromdate, list.todate, allHistory,triggerapi]);

  const formatDateString = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div>
      <Nav />
      <div className="history-container">
        <h5>All History</h5>
        <div className="history-date-filter">
          <input
            name="fromdate"
            id="fromdate"
            placeholder="Enter date"
            type="date"
            onChange={handleDateChange}
            value={date?.fromdate}
            required
            max={date?.todate}
          />
          <input
            name="todate"
            id="todate"
            placeholder="Enter date"
            type="date"
            onChange={handleDateChange}
            value={date?.todate}
            required
            min={date?.fromdate}
          />
        </div>
      </div>
      <div className="history-balance-card-container">
        <div className="history-balance-card">
          <div className="history-balance-card-body">
            <p className="history-balance-card-title">Available Balance</p>
            <p className="history-balance-card-text">
              ₹ {expense?.allexpense?.availableBalance}
            </p>
          </div>
        </div>
        <div className="history-balance-card">
          <div className="history-balance-card-body">
            <p className="history-balance-card-title">Expense</p>
            <p className="history-balance-card-text">
              ₹ {expense?.allexpense?.totalExpenses}
            </p>
          </div>
        </div>
        <div className="history-balance-card">
          <div className="history-balance-card-body">
            <p className="history-balance-card-title">Income</p>
            <p className="history-balance-card-text">
              ₹ {expense?.allexpense?.totalIncome}
            </p>
          </div>
        </div>
      </div>
      <div className="history-card">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Amount</th>
              <th scope="col">Category</th>
              <th scope="col">Description</th>
              <th scope="col">Date</th>
              <th scope="col">Type</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expense?.loading && expense?.allexpense?.results.length === 0 ? (
              <div
                className="spinner-border"
                role="status"
                style={{ justifyContent: "center" }}
              >
                <span className="sr-only"></span>
              </div>
            ) : expense?.allexpense?.results.length === 0 ? (
              <td colSpan={6}>No history</td>
            ) : (
              expense?.allexpense?.results.map((element, index) => (
                <tr key={element._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{element.amount}</td>
                  <td>{element.category}</td>
                  <td>{element.description}</td>
                  <td>{formatDateString(element.date)}</td>
                  <td>
                    {element.is_expense ? (
                      <p style={{ color: "red" }}>Expense</p>
                    ) : (
                      <p style={{ color: "green" }}>Income</p>
                    )}
                  </td>
                  <td>
                    <i
                      className="bi bi-pencil-square"
                      onClick={() => handleEdit(element)}
                      style={{ cursor: "pointer" }}
                    ></i>
                    &nbsp;&nbsp;
                    <i
                      className="bi bi-trash"
                      onClick={() => handleDelete(element)}
                      style={{ cursor: "pointer" }}
                    ></i>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <div style={{ marginLeft: "70%" }}>
          Page {expense?.allexpense.page} of {expense?.allexpense.totalPages}
        </div>
        <nav style={{ marginTop: "1%" }}>
          <ul className="pagination">
            <li
              className={`page-item ${
                expense?.allexpense.page === 1 ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(expense?.allexpense.page - 1)}
                disabled={expense?.allexpense.page === 1}
              >
                Previous
              </button>
            </li>
            {[...Array(expense?.allexpense.totalPages)].map((_, idx) => (
              <li
                key={idx + 1}
                className={`page-item ${
                  expense?.allexpense.page === idx + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(idx + 1)}
                >
                  {idx + 1}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${
                expense?.allexpense.page === expense?.allexpense.totalPages
                  ? "disabled"
                  : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(expense?.allexpense.page + 1)}
                disabled={
                  expense?.allexpense.page === expense?.allexpense.totalPages
                }
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <div className="history-add-button">
        <button type="button" className="btn btn-light" onClick={handleAdd}>
          <i className="bi bi-plus-circle"></i>&nbsp;add
        </button>
      </div>
      <Modal
        isOpen={modalOpen.add}
        title="Add Expense"
        onClose={() => setModalOpen((prev) => ({ ...prev, add: false }))}
      >
        {expense?.allexpense && (
          <AddExpense
            setModal={setModalOpen}
            // setList={setList}
            // list={list}
            triggerapi={triggerapi}
            setTriggerapi={setTriggerapi}
          />
        )}
      </Modal>
      <Modal
        isOpen={modalOpen.edit}
        title="Edit Expense"
        onClose={() => setModalOpen((prev) => ({ ...prev, edit: false }))}
      >
        {selectedExpense && (
          <EditExpense
            expense={selectedExpense}
            setModal={setModalOpen}
            // setList={setList}
            // list={list}
            triggerapi={triggerapi}
            setTriggerapi={setTriggerapi}
          />
        )}
      </Modal>
      <Modal
        isOpen={modalOpen.delete}
        title="Delete Expense"
        onClose={() => setModalOpen((prev) => ({ ...prev, delete: false }))}
      >
        {selectedExpense && (
          <DeleteExpense
            expense={selectedExpense}
            setModal={setModalOpen}
            // setList={setList}
            // list={list}
            triggerapi={triggerapi}
            setTriggerapi={setTriggerapi}
          />
        )}
      </Modal>
    </div>
  );
};

export default AllHistory;
