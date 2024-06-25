import { Dispatch } from "redux";
import {
  RoomMates,
  onlyRoomMates,
  roomMatesResponseWithPagination,
  roomMatesResponseWithoutPagination,
} from "../../types/roommatesTypes";
import {
  ROOM_MATES_REQUEST,
  ROOM_MATES_SUCCESS,
  ROOM_MATES_FAILURE,
  ROOM_MATES_PAGINATION_REQUEST,
  ROOM_MATES_PAGINATION_SUCCESS,
  ROOM_MATES_PAGINATION_FAILURE,
  ROOM_MATES_POST_REQUEST,
  ROOM_MATES_POST_SUCCESS,
  ROOM_MATES_POST_FAILURE,
  ROOM_MATES_PATCH_REQUEST,
  ROOM_MATES_PATCH_SUCCESS,
  ROOM_MATES_PATCH_FAILURE,
  ROOM_MATES_DELETE_REQUEST,
  ROOM_MATES_DELETE_SUCCESS,
  ROOM_MATES_DELETE_FAILURE,
} from "../constant/roommateconstant";

const baseURL = "http://127.0.0.1:4000";

const localstorage_data = JSON.parse(localStorage.getItem("data") as string);

export const fetchRoomMatesRequest = () => ({
  type: ROOM_MATES_REQUEST,
});

export const fetchRoomMatesSuccess = (
  roomMateList: roomMatesResponseWithoutPagination
) => ({
  type: ROOM_MATES_SUCCESS,
  payload: roomMateList,
});

export const fetchRoomMatesFailure = (error: string) => ({
  type: ROOM_MATES_FAILURE,
  payload: error,
});

export const fetchRoomMatesWithoutPagination = () => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchRoomMatesRequest());

    try {
      const token = localstorage_data?.token; // Replace with your actual token

      const response = await fetch(`${baseURL}/getallroommate`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include your token here
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const allRoomMates = await response.json();

      dispatch(fetchRoomMatesSuccess(allRoomMates));
    } catch (error) {
      // Type assertion to specify that error is an instance of Error
      dispatch(fetchRoomMatesFailure((error as Error).message));
    }
  };
};

export const fetchRoomMatesPaginationRequest = () => ({
  type: ROOM_MATES_PAGINATION_REQUEST,
});

export const fetchRoomMatesPaginationSuccess = (
  roomMateList: roomMatesResponseWithPagination
) => ({
  type: ROOM_MATES_PAGINATION_SUCCESS,
  payload: roomMateList,
});

export const fetchRoomMatesPaginationFailure = (error: string) => ({
  type: ROOM_MATES_PAGINATION_FAILURE,
  payload: error,
});

export const fetchRoomMatesWithPagination = (page: number, limit: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchRoomMatesPaginationRequest());

    try {
      const token = localstorage_data?.token; // Replace with your actual token

      const response = await fetch(
        `${baseURL}/getroommate?page=${page}&limit=${limit}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include your token here
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const roomMates = await response.json();

      dispatch(fetchRoomMatesPaginationSuccess(roomMates));
    } catch (error) {
      // Type assertion to specify that error is an instance of Error
      dispatch(fetchRoomMatesPaginationFailure((error as Error).message));
    }
  };
};

export const roomMatesPostRequest = () => ({
  type: ROOM_MATES_POST_REQUEST,
});

export const roomMatesPostSuccess = (roomMateData: onlyRoomMates) => ({
  type: ROOM_MATES_POST_SUCCESS,
  payload: roomMateData,
});

export const roomMatesPostFailure = (error: string) => ({
  type: ROOM_MATES_POST_FAILURE,
  payload: error,
});

export const postRoomMates = (roomMateData: RoomMates) => {
  return async (dispatch: Dispatch) => {
    dispatch(roomMatesPostRequest());

    try {
      const token = localstorage_data?.token;
      const response = await fetch(`${baseURL}/addroommate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(roomMateData),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const allexpense = await response.json();
      dispatch(roomMatesPostSuccess(allexpense));
    } catch (error) {
      // Type assertion to specify that error is an instance of Error
      dispatch(roomMatesPostFailure((error as Error).message));
    }
  };
};

export const roomMatesPatchRequest = () => ({
  type: ROOM_MATES_PATCH_REQUEST,
});

export const roomMatesPatchSuccess = (roomMatesData: onlyRoomMates) => ({
  type: ROOM_MATES_PATCH_SUCCESS,
  payload: roomMatesData,
});

export const roomMatesPatchFailure = (error: string) => ({
  type: ROOM_MATES_PATCH_FAILURE,
  payload: error,
});

export const patchRoomMates = (roomMatesData: onlyRoomMates, id: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(roomMatesPatchRequest());

    try {
      const token = localstorage_data?.token;
      const response = await fetch(`${baseURL}/updateroommate/${id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(roomMatesData),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const allexpense = await response.json();
      dispatch(roomMatesPatchSuccess(allexpense));
    } catch (error) {
      // Type assertion to specify that error is an instance of Error
      dispatch(roomMatesPatchFailure((error as Error).message));
    }
  };
};

export const roomMatesDeleteRequest = () => ({
  type: ROOM_MATES_DELETE_REQUEST,
});

export const roomMatesDeleteSuccess = (roomMatesData: onlyRoomMates) => ({
  type: ROOM_MATES_DELETE_SUCCESS,
  payload: roomMatesData,
});

export const roomMatesDeleteFailure = (error: string) => ({
  type: ROOM_MATES_DELETE_FAILURE,
  payload: error,
});

export const deleteRoomMates = (id: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(roomMatesDeleteRequest());

    try {
      const token = localstorage_data?.token;
      const response = await fetch(`${baseURL}/deleteroommate/${id}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const allexpense = await response.json();
      dispatch(roomMatesDeleteSuccess(allexpense));
    } catch (error) {
      // Type assertion to specify that error is an instance of Error
      dispatch(roomMatesDeleteFailure((error as Error).message));
    }
  };
};
