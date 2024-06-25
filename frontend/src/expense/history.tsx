import React, { useState } from "react";

import "../style/history.css";
// import AddExpense from "./addexpense";
import { useNavigate } from "react-router-dom";
import { ExpenseResponseWithoutPagination } from "../types/expenseTypes";

interface MyChartProps {
  all_data: ExpenseResponseWithoutPagination;
}

const History: React.FC<MyChartProps> = ({ all_data }) => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  // const handleAddNew = () => {
  //   setModalOpen(true);
  // };

  const handleViewClick = () => {
    navigate("/viewall");
  };

  const formatDateString = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="home-history-card">
      <div className="home-history-card-body">
        <div className="home-history-card-title">
          <div className="home-history-card-title-content">
            <i className="bi bi-calendar-event"></i>
            <h6>Your Transaction History</h6>
          </div>
          <button type="button" className="view-button" onClick={handleViewClick}>
            View All
          </button>
        </div>
        <hr />
        {all_data?.results?.length > 7
          ? all_data?.results?.slice(0, 7)?.map((element, index) => {
              return (
                <div key={index} className="transaction-entry">
                  <p className="home-history-card-description">
                    {element?.category}
                  </p>
                  <p className="home-history-card-date">
                    {formatDateString(element?.date)}
                  </p>
                  <span className="home-history-card-amount">
                    {element?.is_expense ? (
                      <p style={{ color: "red" }}>₹{element?.amount}</p>
                    ) : (
                      <p style={{ color: "green" }}>₹{element?.amount}</p>
                    )}
                  </span>
                  {index !== all_data.results.length - 1 && <hr />}
                </div>
              );
            })
          : all_data?.results?.map((element, index) => {
              return (
                <div key={index} className="transaction-entry">
                  <p className="home-history-card-description">
                    {element?.category}
                  </p>
                  <p className="home-history-card-date">
                    {formatDateString(element?.date)}
                  </p>
                  <span className="home-history-card-amount">
                    ₹{element?.amount}
                  </span>
                  {index !== all_data.results.length - 1 && <hr />}
                </div>
              );
            })}
      </div>
      {/* <div className="card-footer">
        <i className="bi bi-calendar2-plus"></i>
        &nbsp;&nbsp;<p>Missing Transaction ?</p>
        <button className="add-button" onClick={handleAddNew}>
          Add New
        </button>
      </div> */}
      {/* {modalOpen && <AddExpense modal={modalOpen} setModal={setModalOpen}/>} */}
    </div>
  );
};
export default History;
