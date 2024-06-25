import { ExpenseResponse } from "../types/expenseTypes";
import { HTTP } from "./baseurl";

interface ExpenseData {
  date: string;
  description: string;
  amount: string;
  is_expense: boolean;
}

const getHeaders = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const expensePostApi = async (
  data: ExpenseData,
  token: string
): Promise<any> => {
  try {
    const response = await HTTP.post("/addexpense", data, getHeaders(token));
    return response.data;
  } catch (error) {
    throw error;
  }
};
// ****************** without pagination ***************************
export const expenseGetApiWithoutPagination = async (
  token: string
): Promise<any> => {
  try {
    const response = await HTTP.get("/getallexpense", getHeaders(token));
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ********************* with pagination *******************************

export const expenseGetApi = async (
  page: number,
  limit: number,
  fromdate: string,
  todate: string,
  token: string
): Promise<ExpenseResponse> => {
  try {
    const response = await HTTP.get(
      `/getexpense?page=${page}&limit=${limit}&fromdate=${fromdate}&todate=${todate}`,
      getHeaders(token)
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const expenseUpdateApi = async (
  id: string,
  data: ExpenseData,
  token: string
): Promise<any> => {
  try {
    const response = await HTTP.patch(
      `/updateexpense/${id}/`,
      data,
      getHeaders(token)
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const expenseDeleteApi = async (
  id: string,
  token: string
): Promise<any> => {
  try {
    const response = await HTTP.delete(
      `/deleteexpense/${id}/`,
      getHeaders(token)
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
