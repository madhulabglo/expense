import React, { useState } from "react";
import { EditExpenseProps } from "../../types/expenseTypes";
import { expenseDeleteApi } from "../../api/expenseapicalls";

const DeleteExpense: React.FC<EditExpenseProps> = ({
  expense,
  setModal,
  triggerapi,
  setTriggerapi,
}) => {
  const localstorage_data = JSON.parse(localStorage.getItem("data") as string);
  const [loading, setLoading] = useState(false);

  const handleNo = () => {
    setModal((prev) => ({ ...prev, delete: false }));
  };

  const handleYes = async () => {
    try {
      setLoading(true);
      const response = await expenseDeleteApi(
        expense?._id,
        localstorage_data?.token
      );
      // setList((prev)=>({...prev,results:prev?.results?.filter((ele)=>ele?._id !== expense?._id)}))
      // setList((prev)=>({...prev,results:response?.filter((ele)=>ele?._id !== expense?._id)}))
      setTriggerapi(!triggerapi);
      setLoading(false);
      setModal((prev) => ({ ...prev, delete: false }));
    } catch (error) {
      console.log(error, "error");
      setLoading(false);
    }
  };
  return (
    <div>
      <p>Are you sure do you want to delete the expense ?</p>
      <button className="delete-yes-button" onClick={handleYes}>
        {loading ? "Loading..." : "yes"}
      </button>
      <button className="delete-no-button" onClick={handleNo}>
        No
      </button>
    </div>
  );
};

export default DeleteExpense;
