import React, { useState } from "react";

import { RoomMates, roomMatesAddProps } from "../../types/roommatesTypes";
import { postRoomMates } from "../../redux/actions/roommatesactions";
import { useAppDispatch } from "../../redux/hooks/storehooks";

const AddRoomMates: React.FC<roomMatesAddProps> = ({
  setModal,
  // setList,
  // list,
  triggerapi,
  setTriggerapi,
}) => {
  const [addExpenseData, setAddExpenseData] = useState<RoomMates>({
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setAddExpenseData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(postRoomMates(addExpenseData));
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
        <button className="add-expense-button" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddRoomMates;
