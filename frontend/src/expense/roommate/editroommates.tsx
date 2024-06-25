import React, { useState } from "react";

import { useAppDispatch } from "../../redux/hooks/storehooks";
import { onlyRoomMates, roomMateseEditProps } from "../../types/roommatesTypes";
import { patchRoomMates } from "../../redux/actions/roommatesactions";

const RoomMatesEdit: React.FC<roomMateseEditProps> = ({
  roomMates,
  setModal,
  // list,
  // setList,
  triggerapi,
  setTriggerapi,
}) => {
  const localstorage_data = JSON.parse(localStorage.getItem("data") as string);
  const [editExpense, setEditExpense] = useState<onlyRoomMates>(roomMates);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setEditExpense((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(patchRoomMates(editExpense, roomMates?._id));
      setModal((prev) => ({ ...prev, edit: false })); // Close the modal
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
          value={editExpense?.name}
          required
        />
        <button className="add-expense-button" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default RoomMatesEdit;
