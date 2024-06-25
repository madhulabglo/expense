import React, { useState } from "react";
import { useAppDispatch } from "../../redux/hooks/storehooks";
import { postOnlyExpense } from "../../redux/actions/onlyexpenseactions";
import { FormData, onlyExpenseAddProps } from "../../types/onlyexpenseTypes";

import "../../style/onlyexpense.css";

const OnlyExpenseAdd: React.FC<onlyExpenseAddProps> = ({
  setModal,
  triggerapi,
  setTriggerapi,
}) => {
  const [addExpenseData, setAddExpenseData] = useState<FormData>({
    name: "",
    date: "",
    description: "",
    amount: "",
    amount_details: [],
  });

  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setAddExpenseData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMoreFieldsChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setAddExpenseData((prev) => {
      const newAmountDetails = [...prev.amount_details];
      newAmountDetails[index] = { ...newAmountDetails[index], [name]: value };
      return { ...prev, amount_details: newAmountDetails };
    });
  };

  const handleMoreFields = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newField = { name: "", amount: "" };
    setAddExpenseData((prev) => ({
      ...prev,
      amount_details: [...prev.amount_details, newField],
    }));
  };

  const handleDeleteField = (id: number) => {
    setAddExpenseData((prev) => ({
      ...prev,
      amount_details: prev.amount_details.filter(
        (field, index) => index !== id
      ),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(postOnlyExpense(addExpenseData));
      setModal((prev) => ({ ...prev, add: false })); // Close the modal
      setTriggerapi(!triggerapi); // Trigger the fetch action
    } catch (error) {
      console.error("Failed to add expense:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Name <span>*</span>
        </label>
        <input
          name="name"
          id="name"
          placeholder="Enter name"
          type="text"
          onChange={handleChange}
          value={addExpenseData.name}
          required
        />
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
        <div className="more-fields">
          <button
            className="btn btn-text text-success btn-sm float-end"
            onClick={handleMoreFields}
          >
            <i className="bi bi-plus-circle"></i>&nbsp;&nbsp;Add
          </button>
        </div>

        {addExpenseData.amount_details.map((field, index) => (
          <div key={index} className="extra-field">
            <label>
              Name <span>*</span>
            </label>
            <input
              name="name"
              placeholder="Enter name"
              type="text"
              onChange={(e) => handleMoreFieldsChange(index, e)}
              value={field.name}
              required
            />
            <label>
              Amount <span>*</span>
            </label>
            <input
              name="amount"
              placeholder="Enter amount"
              type="number"
              onChange={(e) => handleMoreFieldsChange(index, e)}
              value={field.amount}
              required
            />
            <button
              type="button"
              className="btn btn-text text-danger btn-sm float-end"
              onClick={() => handleDeleteField(index)}
              disabled={index === 0}
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
        ))}
        <button className="add-expense-button" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default OnlyExpenseAdd;
