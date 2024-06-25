import { Dispatch } from "redux";
import {
  FormData,
  onlyExpense,
  onlyExpenseResponseWithPagination,
  onlyExpenseResponseWithoutPagination,
} from "../../types/onlyexpenseTypes";
import {
  ONLY_EXPENSE_FAILURE,
  ONLY_EXPENSE_REQUEST,
  ONLY_EXPENSE_SUCCESS,
  ONLY_EXPENSE_PAGINATION_REQUEST,
  ONLY_EXPENSE_PAGINATION_SUCCESS,
  ONLY_EXPENSE_PAGINATION_FAILURE,
  ONLY_EXPENSE_POST_REQUEST,
  ONLY_EXPENSE_POST_SUCCESS,
  ONLY_EXPENSE_POST_FAILURE,
  ONLY_EXPENSE_PATCH_REQUEST,
  ONLY_EXPENSE_PATCH_SUCCESS,
  ONLY_EXPENSE_PATCH_FAILURE,
  ONLY_EXPENSE_DELETE_REQUEST,
  ONLY_EXPENSE_DELETE_SUCCESS,
  ONLY_EXPENSE_DELETE_FAILURE,
} from "../constant/onlyexpenseconstant";

const baseURL = "http://127.0.0.1:4000";

const localstorage_data = JSON.parse(localStorage.getItem("data") as string);

export const fetchOnlyExpenseRequest = () => ({
  type: ONLY_EXPENSE_REQUEST,
});

export const fetchOnlyExpenseSuccess = (
  expenselist: onlyExpenseResponseWithoutPagination
) => ({
  type: ONLY_EXPENSE_SUCCESS,
  payload: expenselist,
});

export const fetchOnlyExpenseFailure = (error: string) => ({
  type: ONLY_EXPENSE_FAILURE,
  payload: error,
});

export const fetchOnlyExpenseWithoutPagination = () => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchOnlyExpenseRequest());

    try {
      const token = localstorage_data?.token; // Replace with your actual token

      const response = await fetch(`${baseURL}/onlyallexpense`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include your token here
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const allexpense = await response.json();

      dispatch(fetchOnlyExpenseSuccess(allexpense));
    } catch (error) {
      // Type assertion to specify that error is an instance of Error
      dispatch(fetchOnlyExpenseFailure((error as Error).message));
    }
  };
};

export const fetchOnlyExpensePaginationRequest = () => ({
  type: ONLY_EXPENSE_PAGINATION_REQUEST,
});

export const fetchOnlyExpensePaginationSuccess = (
  expenselist: onlyExpenseResponseWithPagination
) => ({
  type: ONLY_EXPENSE_PAGINATION_SUCCESS,
  payload: expenselist,
});

export const fetchOnlyExpensePaginationFailure = (error: string) => ({
  type: ONLY_EXPENSE_PAGINATION_FAILURE,
  payload: error,
});

export const fetchOnlyExpenseWithPagination = (
  page: number,
  limit: number,
  fromdate: string,
  todate: string
) => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchOnlyExpensePaginationRequest());

    try {
      const token = localstorage_data?.token; // Replace with your actual token

      const response = await fetch(
        `${baseURL}/onlyexpense?page=${page}&limit=${limit}&fromdate=${fromdate}&todate=${todate}`,
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
      const allexpense = await response.json();

      dispatch(fetchOnlyExpensePaginationSuccess(allexpense));
    } catch (error) {
      // Type assertion to specify that error is an instance of Error
      dispatch(fetchOnlyExpensePaginationFailure((error as Error).message));
    }
  };
};

export const onlyExpnesPostRequest = () => ({
  type: ONLY_EXPENSE_POST_REQUEST,
});

export const onlyExpensePostSuccess = (expensedata: onlyExpense) => ({
  type: ONLY_EXPENSE_POST_SUCCESS,
  payload: expensedata,
});

export const onlyExpensePostFailure = (error: string) => ({
  type: ONLY_EXPENSE_POST_FAILURE,
  payload: error,
});

export const postOnlyExpense = (expensedata: FormData) => {
  return async (dispatch: Dispatch) => {
    dispatch(onlyExpnesPostRequest());

    try {
      const token = localstorage_data?.token;
      const response = await fetch(`${baseURL}/onlyexpense`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(expensedata),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const allexpense = await response.json();
      dispatch(onlyExpensePostSuccess(allexpense));
    } catch (error) {
      // Type assertion to specify that error is an instance of Error
      dispatch(onlyExpensePostFailure((error as Error).message));
    }
  };
};

export const onlyExpnesPatchRequest = () => ({
  type: ONLY_EXPENSE_PATCH_REQUEST,
});

export const onlyExpensePatchSuccess = (expensedata: onlyExpense) => ({
  type: ONLY_EXPENSE_PATCH_SUCCESS,
  payload: expensedata,
});

export const onlyExpensePatchFailure = (error: string) => ({
  type: ONLY_EXPENSE_PATCH_FAILURE,
  payload: error,
});

export const patchOnlyExpense = (expensedata: onlyExpense, id: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(onlyExpnesPatchRequest());

    try {
      const token = localstorage_data?.token;
      const response = await fetch(`${baseURL}/onlyexpense/${id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(expensedata),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const allexpense = await response.json();
      dispatch(onlyExpensePatchSuccess(allexpense));
    } catch (error) {
      // Type assertion to specify that error is an instance of Error
      dispatch(onlyExpensePatchFailure((error as Error).message));
    }
  };
};

export const onlyExpnesDeleteRequest = () => ({
  type: ONLY_EXPENSE_DELETE_REQUEST,
});

export const onlyExpenseDeleteSuccess = (expensedata: onlyExpense) => ({
  type: ONLY_EXPENSE_DELETE_SUCCESS,
  payload: expensedata,
});

export const onlyExpenseDeleteFailure = (error: string) => ({
  type: ONLY_EXPENSE_DELETE_FAILURE,
  payload: error,
});

export const deleteOnlyExpense = (id: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(onlyExpnesDeleteRequest());

    try {
      const token = localstorage_data?.token;
      const response = await fetch(`${baseURL}/onlyexpense/${id}/`, {
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
      dispatch(onlyExpenseDeleteSuccess(allexpense));
    } catch (error) {
      // Type assertion to specify that error is an instance of Error
      dispatch(onlyExpenseDeleteFailure((error as Error).message));
    }
  };
};
