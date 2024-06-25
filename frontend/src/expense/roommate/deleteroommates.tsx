import React, { useState } from "react";

import { useAppDispatch } from "../../redux/hooks/storehooks";
import { roomMateseEditProps } from "../../types/roommatesTypes";
import { deleteRoomMates } from "../../redux/actions/roommatesactions";

const RoomMatesDelete: React.FC<roomMateseEditProps> = ({
  roomMates,
  setModal,
  triggerapi,
  setTriggerapi,
}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleNo = () => {
    setModal((prev) => ({ ...prev, delete: false }));
  };

  const handleYes = async () => {
    setLoading(true);
    try {
      await dispatch(deleteRoomMates(roomMates?._id));
      setModal((prev) => ({ ...prev, delete: false })); // Close the modal
      setTriggerapi(!triggerapi); // Trigger the fetch action
    } catch (error) {
      console.error("Failed to add expense:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <p>Are you sure do you want to delete the Room Mate ?</p>
      <button className="delete-yes-button" onClick={handleYes}>
        {loading ? "Loding..." : "yes"}
      </button>
      <button className="delete-no-button" onClick={handleNo}>
        No
      </button>
    </div>
  );
};

export default RoomMatesDelete;
