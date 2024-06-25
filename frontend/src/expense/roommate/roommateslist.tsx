import React, { useEffect, useState } from "react";
import Nav from "../navbar";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/storehooks";
import { onlyRoomMates } from "../../types/roommatesTypes";
import { fetchRoomMatesWithPagination } from "../../redux/actions/roommatesactions";

import AddRoomMates from "./addroommates";
import RoomMatesEdit from "./editroommates";
import RoomMatesDelete from "./deleteroommates";

import "../../style/allhistory.css";
import Modal from "../../commoncomponents/modal";

const RoomMates: React.FC = () => {
  const localstorage_data = JSON.parse(localStorage.getItem("data") as string);

  const room_mates_data = useAppSelector((state) => state.roomMatesPagination);
  // const loading = useAppSelector((state) => state.allexpense.loading);
  // const error = useAppSelector((state) => state.allexpense.error);
  const dispatch = useAppDispatch();
  const [modalOpen, setModalOpen] = useState<{
    add: boolean;
    edit: boolean;
    delete: boolean;
  }>({
    add: false,
    edit: false,
    delete: false,
  });

  const [selectedExpense, setSelectedExpense] = useState<onlyRoomMates | null>(
    null
  );

  const [page, setPage] = useState({ page: 1, limit: 5 });
  const [triggerapi, setTriggerapi] = useState(false);
  const handleEdit = (roomMatesData: onlyRoomMates) => {
    setSelectedExpense(roomMatesData);
    setModalOpen((prev) => ({ ...prev, edit: true }));
  };

  const handleDelete = (roomMatesData: onlyRoomMates) => {
    setSelectedExpense(roomMatesData);
    setModalOpen((prev) => ({ ...prev, delete: true }));
  };

  const handleAdd = () => {
    setModalOpen((prev) => ({ ...prev, add: true }));
  };

  const handlePageChange = (newPage: number) => {
    setPage((prev) => ({ ...prev, page: newPage }));
  };
  useEffect(() => {
    dispatch(fetchRoomMatesWithPagination(page?.page, page?.limit));
  }, [dispatch, page?.page, page?.limit, triggerapi]);

  return (
    <div>
      <Nav />
      <div className="history-container">
        <h5>Room Mates</h5>
      </div>
      <div className="history-card">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {room_mates_data?.loading &&
            room_mates_data?.roomMatesList?.results.length === 0 ? (
              <div
                className="spinner-border"
                role="status"
                style={{ justifyContent: "center" }}
              >
                <span className="sr-only"></span>
              </div>
            ) : room_mates_data?.roomMatesList?.results.length === 0 ? (
              <td colSpan={6}>No Room Mates</td>
            ) : (
              room_mates_data?.roomMatesList?.results?.map((element, index) => (
                <tr key={element._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{element.name}</td>
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
          Page {room_mates_data?.roomMatesList.page} of{" "}
          {room_mates_data?.roomMatesList.totalPages}
        </div>
        <nav style={{ marginTop: "1%" }}>
          <ul className="pagination">
            <li
              className={`page-item ${
                room_mates_data?.roomMatesList.page === 1 ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() =>
                  handlePageChange(room_mates_data?.roomMatesList.page - 1)
                }
                disabled={room_mates_data?.roomMatesList.page === 1}
              >
                Previous
              </button>
            </li>
            {[...Array(room_mates_data?.roomMatesList.totalPages)].map(
              (_, idx) => (
                <li
                  key={idx + 1}
                  className={`page-item ${
                    room_mates_data?.roomMatesList.page === idx + 1
                      ? "active"
                      : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(idx + 1)}
                  >
                    {idx + 1}
                  </button>
                </li>
              )
            )}
            <li
              className={`page-item ${
                room_mates_data?.roomMatesList.page ===
                room_mates_data?.roomMatesList.totalPages
                  ? "disabled"
                  : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() =>
                  handlePageChange(room_mates_data?.roomMatesList.page + 1)
                }
                disabled={
                  room_mates_data?.roomMatesList.page ===
                  room_mates_data?.roomMatesList.totalPages
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
        title="Add RoomMates"
        onClose={() => setModalOpen((prev) => ({ ...prev, add: false }))}
      >
        {room_mates_data?.roomMatesList && (
          <AddRoomMates
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
        title="Edit RoomMates"
        onClose={() => setModalOpen((prev) => ({ ...prev, edit: false }))}
      >
        {selectedExpense && (
          <RoomMatesEdit
            roomMates={selectedExpense}
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
        title="Delete Room Mate"
        onClose={() => setModalOpen((prev) => ({ ...prev, delete: false }))}
      >
        {selectedExpense && (
          <RoomMatesDelete
            roomMates={selectedExpense}
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
export default RoomMates;
