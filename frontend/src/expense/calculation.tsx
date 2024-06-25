import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks/storehooks";
import Nav from "./navbar";

import "../style/calculation.css";

import { fetchRoomMatesWithoutPagination } from "../redux/actions/roommatesactions";
import { getCalculation } from "../redux/actions/calculationactions";

interface DateRange {
  fromdate: string;
  todate: string;
  name: string;
  split: string;
}

const Calculation: React.FC = () => {
  const dispatch = useAppDispatch();
  const roomMates = useAppSelector((state) => state.roomMates);
  const calculation_data = useAppSelector((state) => state.calculation);

  const [date, setDate] = useState<DateRange>({
    fromdate: "",
    todate: "",
    name: "",
    split: "",
  });

  const handleDateChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setDate((prev) => ({ ...prev, [name]: value }));
  };

  const personExpense = calculation_data?.list?.person_own_expense?.find(
    (expenseObj) => expenseObj.hasOwnProperty(date?.name)
  );

  const personAmount = personExpense ? personExpense[date?.name] : 0;
  const single_person_getting_amount =
    calculation_data?.list?.total_expense_amount - personAmount;

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

  useEffect(() => {
    if (date.fromdate && date.todate === "") {
      setDate((prev) => ({ ...prev, todate: date.fromdate }));
    }
  }, [date.fromdate]);

  useEffect(() => {
    dispatch(fetchRoomMatesWithoutPagination());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      getCalculation(date?.fromdate, date?.todate, date?.name, date?.split)
    );
  }, [dispatch, date?.todate, date?.name, date?.split]);

  return (
    <div>
      <Nav />
      <div className="calculation-card">
        <h5>Calculation Details</h5>
        <div className="calculation-header">
          <div className="date-filter">
            <input
              name="fromdate"
              id="fromdate"
              placeholder="Enter date"
              type="date"
              onChange={handleDateChange}
              value={date?.fromdate}
              required
              max={date?.todate}
              className="date-input"
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
              className="date-input"
            />
          </div>
        </div>
        <div className="calculation-content">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {calculation_data?.list?.person_own_expense?.map(
                  (expenseObj, index) => {
                    return Object.entries(expenseObj).map(
                      ([name, amount], idx) => (
                        <tr key={index + "-" + idx}>
                          <td>{name}</td>
                          <td>₹{amount}</td>
                        </tr>
                      )
                    );
                  }
                )}
                <tr>
                  <td>Total</td>
                  <td>₹{calculation_data?.list?.person_expense_total}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="summary-container">
            <h5
              style={{ color: "red" }}
            >{`Total Expense Amount ₹${calculation_data?.list?.total_expense_amount}`}</h5>
            <div className="spend-by-filter">
              <label className="spend-by-label">Spend By</label>
              <select
                className="form-select"
                aria-label="Default select example"
                name="name"
                onChange={handleDateChange}
              >
                <option selected>Select one person</option>
                {roomMates?.roomMatesList?.results?.map((element) => (
                  <option value={element?.name} key={element?.name}>
                    {element?.name}
                  </option>
                ))}
              </select>
            </div>
            {date?.name && (
              <>
                <p>
                  {`${date?.name} Spend Amount  `}
                  <span className="amount">{`₹${calculation_data?.list?.total_expense_amount}`}</span>
                </p>
                <p>
                  {`${date?.name}'s Expense Amount `}
                  <span className="amount">{`₹${personAmount}`}</span>{" "}
                </p>
                <p style={{ color: "green" }}>
                  {`${date?.name}'s Getting Amount from Others `}
                  <span className="amount">{`₹${single_person_getting_amount}`}</span>
                </p>
                <hr />
                {calculation_data?.list?.other_person_expense?.map(
                  (expenseObj, index) => {
                    return Object.entries(expenseObj).map(
                      ([name, amount], idx) => (
                        <p
                          key={index + "-" + idx}
                          style={{ paddingLeft: "30%" }}
                        >
                          {name} ₹ {amount}
                        </p>
                      )
                    );
                  }
                )}
                <p>
                  {`Splitting Total Amount `}
                  <span className="amount">{`₹${calculation_data?.list?.buy_expense_amount}`}</span>
                </p>
                <div className="spend-by-filter">
                  <label className="spend-by-label">
                    Enter Spliting Mememers Count
                  </label>
                  <input
                    placeholder="split person count"
                    name="split"
                    type="number"
                    onChange={handleDateChange}
                  />
                </div>
                {date?.split && (
                  <p>
                    {`Per person Splitting Amount is `}
                    <span className="amount">{`₹${calculation_data?.list?.person_spliting_amount}`}</span>
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Calculation;
