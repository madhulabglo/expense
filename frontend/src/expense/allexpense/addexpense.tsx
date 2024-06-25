import React, { useState } from "react";
import { AddExpenseProps } from "../../types/expenseTypes";
import { expensePostApi } from "../../api/expenseapicalls";

interface FormData {
  date: string;
  category: string;
  description: string;
  amount: string;
  is_expense: boolean;
}

const AddExpense: React.FC<AddExpenseProps> = ({
  setModal,
  // setList,
  // list,
  triggerapi,
  setTriggerapi,
}) => {
  const localstorage_data = JSON.parse(localStorage.getItem("data") as string);
  const [addExpenseData, setAddExpenseData] = useState<FormData>({
    date: "",
    category: "",
    description: "",
    amount: "",
    is_expense: false,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setAddExpenseData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await expensePostApi(
        addExpenseData,
        localstorage_data?.token
      );
      // if (list) {
      //   setList((prev) => ({
      //     ...prev,
      //     results: [...prev.results, response.data],
      //   }));
      // }
      setTriggerapi(!triggerapi);
      setLoading(false);
      setModal((prev) => ({ ...prev, add: false }));
    } catch (error) {
      console.log(error, "error");
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Date <span>*</span>
        </label>
        <input
          name="date"
          id="date"
          placeholder="Enter date"
          type="date"
          onChange={handleChange}
          value={addExpenseData.date}
          required
        />
        <label>
          Enter Category <span>*</span>
        </label>
        <select
          className="form-select"
          aria-label="Default select example"
          name="category"
          onChange={handleChange}
          required
          style={{height:"45px"}}
        >
          <option value="" selected>
            select category
          </option>
          <option value="food">food</option>
          <option value="bill payment">bill payment</option>
          <option value="shopping">shopping</option>
          <option value="health">health</option>
          <option value="travels">travels</option>
          <option value="others">others</option>
        </select>
        <label>
          Enter Description <span>*</span>
        </label>
        <input
          name="description"
          id="description"
          placeholder="Enter description"
          type="text"
          onChange={handleChange}
          value={addExpenseData.description}
          required
        />
        <label>
          Enter Amount <span>*</span>
        </label>
        <input
          name="amount"
          id="amount"
          placeholder="Enter amount"
          type="number"
          onChange={handleChange}
          value={addExpenseData.amount}
          required
        />
        <div className="checkbox-container">
          <input
            name="is_expense"
            id="is_expense"
            type="checkbox"
            onChange={handleChange}
            checked={addExpenseData.is_expense}
          />
          <label htmlFor="is_expense">Is Expense</label>
        </div>
        <button className="add-expense-button" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddExpense;
