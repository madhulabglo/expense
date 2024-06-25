// src/features/user/userReducer.ts
import { ExpenseResponse, ExpenseResponseWithoutPagination } from "../../types/expenseTypes";
import {
  FETCH_EXPENSE_REQUEST,
  FETCH_EXPENSE_SUCCESS,
  FETCH_EXPENSE_FAILURE,
  POST_EMAIL_REQUEST,
  POST_EMAIL_SUCCESS,
  POST_EMAIL_FAILURE,
  VERIFY_OTP_REQUEST,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAILURE,
  FETCH_PAGINATION_EXPENSE_REQUEST,
  FETCH_PAGINATION_EXPENSE_SUCCESS,
  FETCH_PAGINATION_EXPENSE_FAILURE
} from "../constant/expenseconstant";

// Define the interface for the expense state
interface ExpenseState {
  loading: boolean;
  allexpense:ExpenseResponseWithoutPagination;
  error: string | null;
}

const initialExpenseState: ExpenseState = {
  loading: false,
  allexpense:{
    results: [],
    availableBalance: 0,
    totalExpenses: 0,
    totalIncome: 0,
  },
  error: null,
};

export const expenseReducer = (
  state = initialExpenseState,
  action: any
): ExpenseState => {
  switch (action.type) {
    case FETCH_EXPENSE_REQUEST:
      return { ...state, loading: true };
    case FETCH_EXPENSE_SUCCESS:
      return { ...state, loading: false, allexpense: action.payload };
    case FETCH_EXPENSE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

interface ExpensePaginationState {
  loading: boolean;
  allexpense:ExpenseResponse;
  error: string | null;
}

const initialExpensePaginationState: ExpensePaginationState = {
  loading: false,
  allexpense:{
    results: [],
    page: 1,
    limit: 5,
    total: 0,
    totalPages: 1,
    fromdate: "",
    todate: "",
    availableBalance: 0,
    totalExpenses: 0,
    totalIncome: 0,
  },
  error: null,
};

export const expensePaginationReducer = (
  state = initialExpensePaginationState,
  action: any
): ExpensePaginationState => {
  switch (action.type) {
    case FETCH_PAGINATION_EXPENSE_REQUEST:
      return { ...state, loading: true };
    case FETCH_PAGINATION_EXPENSE_SUCCESS:
      return { ...state, loading: false, allexpense: action.payload };
    case FETCH_PAGINATION_EXPENSE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

interface LoginData {
  message?: string;
  // Add any other properties that logindata might have
}

interface LoginState {
  loading: boolean;
  logindata: LoginData|null;
  error: object | null;
}

const initialLoginState: LoginState = {
  loading: false,
  logindata: null,
  error: null,
};

export const loginReducer = (state = initialLoginState, action: any): LoginState => {
  switch (action.type) {
    case POST_EMAIL_REQUEST:
      return { ...state, loading: true };
    case POST_EMAIL_SUCCESS:
      return { ...state, loading: false, logindata: action.payload };
    case POST_EMAIL_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

// Define the interface for the OTP state
interface OtpState {
  loading: boolean;
  otpdata: object | null;
  error: object | null; // Allow the error to be any object
}

const initialOtpState: OtpState = {
  loading: false,
  otpdata: null,
  error: null,
};

export const otpReducer = (state = initialOtpState, action: any): OtpState => {
  switch (action.type) {
    case VERIFY_OTP_REQUEST:
      return { ...state, loading: true, error: null };
    case VERIFY_OTP_SUCCESS:
      return { ...state, loading: false, otpdata: action.payload };
    case VERIFY_OTP_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
