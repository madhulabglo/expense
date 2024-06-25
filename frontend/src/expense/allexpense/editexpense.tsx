import React, { useState } from "react";
import { Expense, EditExpenseProps } from "../../types/expenseTypes";
import { expenseUpdateApi } from "../../api/expenseapicalls";

const EditExpense: React.FC<EditExpenseProps> = ({
  expense,
  setModal,
  // list,
  // setList,
  triggerapi,
  setTriggerapi,
}) => {
  const localstorage_data = JSON.parse(localStorage.getItem("data") as string);
  const [editExpense, setEditExpense] = useState<Expense>(expense);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setEditExpense((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await expenseUpdateApi(
        expense?._id,
        editExpense,
        localstorage_data?.token
      );
      // setList((prev)=>({...prev,results:prev?.results?.map((ele)=>ele?._id === response?.data?._id ? response?.data : ele)}))
      // setList(list?.results?.map((ele)=>ele?._id === response?.data?._id ?response?.data :ele))
      setTriggerapi(!triggerapi);
      setLoading(false);
      setModal((prev) => ({ ...prev, edit: false }));
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
          value={editExpense?.date?.slice(0, 10)}
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
          <option value={editExpense?.category} selected>
            {editExpense?.category}
          </option>
          <option value="food">food</option>
          <option value="bill payment">bill payment</option>
          <option value="shopping">shopping</option>
          <option value="health">health</option>
          <option value="travels">travels</option>
          <option value="others">others</option>
        </select>
        <label></label>
        <label>
          Enter Description <span>*</span>
        </label>
        <input
          name="description"
          id="description"
          placeholder="Enter description"
          type="text"
          onChange={handleChange}
          value={editExpense?.description}
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
          value={editExpense?.amount}
          required
        />
        <div className="checkbox-container">
          <input
            name="is_expense"
            id="is_expense"
            type="checkbox"
            onChange={handleChange}
            checked={editExpense?.is_expense}
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

export default EditExpense;
