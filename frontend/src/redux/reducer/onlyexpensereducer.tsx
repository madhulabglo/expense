import {
  onlyExpense,
  onlyExpenseResponseWithPagination,
  onlyExpenseResponseWithoutPagination,
} from "../../types/onlyexpenseTypes";
import {
  ONLY_EXPENSE_DELETE_FAILURE,
  ONLY_EXPENSE_DELETE_REQUEST,
  ONLY_EXPENSE_DELETE_SUCCESS,
  ONLY_EXPENSE_FAILURE,
  ONLY_EXPENSE_PAGINATION_FAILURE,
  ONLY_EXPENSE_PAGINATION_REQUEST,
  ONLY_EXPENSE_PAGINATION_SUCCESS,
  ONLY_EXPENSE_PATCH_FAILURE,
  ONLY_EXPENSE_PATCH_REQUEST,
  ONLY_EXPENSE_PATCH_SUCCESS,
  ONLY_EXPENSE_POST_FAILURE,
  ONLY_EXPENSE_POST_REQUEST,
  ONLY_EXPENSE_POST_SUCCESS,
  ONLY_EXPENSE_REQUEST,
  ONLY_EXPENSE_SUCCESS,
} from "../constant/onlyexpenseconstant";

interface OnlyExpenseState {
  loading: boolean;
  allexpense: onlyExpenseResponseWithoutPagination;
  error: string | null;
}

const initialOnlyExpenseState: OnlyExpenseState = {
  loading: false,
  allexpense: {
    results: [],
    totalExpenses: 0,
  },
  error: null,
};

export const onlyexpenseReducer = (
  state = initialOnlyExpenseState,
  action: any
): OnlyExpenseState => {
  switch (action.type) {
    case ONLY_EXPENSE_REQUEST:
      return { ...state, loading: true };
    case ONLY_EXPENSE_SUCCESS:
      return { ...state, loading: false, allexpense: action.payload };
    case ONLY_EXPENSE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

interface OnlyExpensePaginationState {
  loading: boolean;
  allexpense: onlyExpenseResponseWithPagination;
  error: string | null;
}

const initialOnlyExpensePaginationState: OnlyExpensePaginationState = {
  loading: false,
  allexpense: {
    results: [],
    page: 1,
    limit: 5,
    total: 0,
    totalPages: 1,
    fromdate: "",
    todate: "",
    totalExpenses: 0,
  },
  error: null,
};

export const onlyexpensePaginationReducer = (
  state = initialOnlyExpensePaginationState,
  action: any
): OnlyExpensePaginationState => {
  switch (action.type) {
    case ONLY_EXPENSE_PAGINATION_REQUEST:
      return { ...state, loading: true };
    case ONLY_EXPENSE_PAGINATION_SUCCESS:
      return { ...state, loading: false, allexpense: action.payload };
    case ONLY_EXPENSE_PAGINATION_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

interface onlyExpensePostData {
  loading: boolean;
  data: onlyExpense | null;
  error: object | null;
}

const initialOnlyExpensePostState: onlyExpensePostData = {
  loading: false,
  data: null,
  error: null,
};

export const onlyExpensePostReducer = (
  state = initialOnlyExpensePostState,
  action: any
): onlyExpensePostData => {
  switch (action.type) {
    case ONLY_EXPENSE_POST_REQUEST:
      return { ...state, loading: true };
    case ONLY_EXPENSE_POST_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case ONLY_EXPENSE_POST_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

interface onlyExpensePatchData {
  loading: boolean;
  data: onlyExpense | null;
  error: object | null;
}

const initialOnlyExpensePatchState: onlyExpensePatchData = {
  loading: false,
  data: null,
  error: null,
};

export const onlyExpensePatchReducer = (
  state = initialOnlyExpensePatchState,
  action: any
): onlyExpensePatchData => {
  switch (action.type) {
    case ONLY_EXPENSE_PATCH_REQUEST:
      return { ...state, loading: true };
    case ONLY_EXPENSE_PATCH_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case ONLY_EXPENSE_PATCH_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

interface SuccessData {
  message?: string;
  // Add any other properties that logindata might have
}

interface onlyExpenseDeleteData {
  loading: boolean;
  data: SuccessData | null;
  error: object | null;
}

const initialOnlyExpenseDeleteState: onlyExpenseDeleteData = {
  loading: false,
  data: null,
  error: null,
};

export const onlyExpenseDeleteReducer = (
  state = initialOnlyExpenseDeleteState,
  action: any
): onlyExpenseDeleteData => {
  switch (action.type) {
    case ONLY_EXPENSE_DELETE_REQUEST:
      return { ...state, loading: true };
    case ONLY_EXPENSE_DELETE_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case ONLY_EXPENSE_DELETE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
