import React, { useEffect, useState } from "react";
import Nav from "../navbar";
import Modal from "../../commoncomponents/modal";

import "../../style/allhistory.css";

import { useAppDispatch, useAppSelector } from "../../redux/hooks/storehooks";
import { fetchOnlyExpenseWithPagination } from "../../redux/actions/onlyexpenseactions";
import OnlyExpenseAdd from "./onlyexpenseadd";
import { onlyExpense } from "../../types/onlyexpenseTypes";
import OnlyExpenseEdit from "./onlyexpenseedit";
import OnlyExpensDelete from "./onlyexpensedelete";
import { useNavigate } from "react-router-dom";

interface DateRange {
  fromdate: string;
  todate: string;
}

const Expenselist: React.FC = () => {
  const expense = useAppSelector((state) => state.onlyexpensePagination);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState<{
    add: boolean;
    edit: boolean;
    delete: boolean;
  }>({
    add: false,
    edit: false,
    delete: false,
  });

  const [selectedExpense, setSelectedExpense] = useState<onlyExpense | null>(
    null
  );

  const [page, setPage] = useState({ page: 1, limit: 5 });
  const [date, setDate] = useState<DateRange>({ fromdate: "", todate: "" });
  const [triggerapi, setTriggerapi] = useState(false);

  useEffect(() => {
    const today = new Date();
    const startOfMonth = new Date(
      Date.UTC(today.getFullYear(), today.getMonth(), 1)
    );
    startOfMonth.setUTCHours(0, 0, 0, 0);

    const formattedToday = today.toISOString().split("T")[0];
    const formattedStartOfMonth = startOfMonth.toISOString().split("T")[0];

    if (today.getDate() === 1) {
      setDate((prev) => ({
        ...prev,
        todate: formattedStartOfMonth,
      }));
    } else {
      // Otherwise, set endDate to today
      setDate((prev) => ({
        ...prev,
        todate: formattedToday,
      }));
    }

    // Set endDate to today
    setDate((prev) => ({
      ...prev,
      todate: formattedToday,
      fromdate: formattedStartOfMonth,
    }));
  }, []);

  const handleEdit = (expense: onlyExpense) => {
    setSelectedExpense(expense);
    setModalOpen((prev) => ({ ...prev, edit: true }));
  };

  const handleDelete = (expense: onlyExpense) => {
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
  const handleCalender = () => {
    navigate("/calculation");
  };

  useEffect(() => {
    dispatch(
      fetchOnlyExpenseWithPagination(
        page?.page,
        page?.limit,
        date?.fromdate,
        date?.todate
      )
    );
  }, [dispatch, page?.page, page?.limit, date?.todate, triggerapi]);
  useEffect(() => {
    if (date.fromdate && date.todate === "") {
      setDate((prev) => ({ ...prev, todate: date.fromdate }));
    }
  }, [date.fromdate]);

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
        <h5>All Expense</h5>
        <div style={{ textAlign: "center" }} onClick={handleCalender}>
          <div
            style={{
              // margin: "auto",
              backgroundColor: "white",
              width: "45px",
              height: "45px",
              // borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              position: "relative",
              // top: "20px",
              marginLeft: "1300%",
              cursor: "pointer",
            }}
          >
            <i
              className="bi bi-calculator"
              style={{ fontSize: "25px", color: "#000" }}
            ></i>
          </div>
        </div>
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
            <p className="history-balance-card-title">Expense</p>
            <p className="history-balance-card-text">
              ₹ {expense?.allexpense?.totalExpenses}
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
              <th scope="col">Name</th>
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
              <td colSpan={6}>No Expense</td>
            ) : (
              expense?.allexpense?.results?.map((element, index) => (
                <tr key={element._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{element.amount}</td>
                  <td>{element.name}</td>
                  <td>{element.description}</td>
                  <td>{formatDateString(element.date)}</td>
                  <td>
                    <p style={{ color: "red" }}>Expense</p>
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
          <OnlyExpenseAdd
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
          <OnlyExpenseEdit
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
          <OnlyExpensDelete
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

export default Expenselist;
