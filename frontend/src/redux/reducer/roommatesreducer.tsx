import {
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

interface roomMateState {
  loading: boolean;
  roomMatesList: roomMatesResponseWithoutPagination;
  error: string | null;
}

const initialOnlyExpenseState: roomMateState = {
  loading: false,
  roomMatesList: {
    results: []
  },
  error: null,
};

export const roomMatesReducer = (
  state = initialOnlyExpenseState,
  action: any
): roomMateState => {
  switch (action.type) {
    case ROOM_MATES_REQUEST:
      return { ...state, loading: true };
    case ROOM_MATES_SUCCESS:
      return { ...state, loading: false, roomMatesList: action.payload };
    case ROOM_MATES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

interface roomMatesPaginationState {
  loading: boolean;
  roomMatesList: roomMatesResponseWithPagination;
  error: string | null;
}

const initialOnlyExpensePaginationState: roomMatesPaginationState = {
  loading: false,
  roomMatesList: {
    results: [],
    page: 1,
    limit: 5,
    total: 0,
    totalPages: 1,
  },
  error: null,
};

export const roomMatesPaginationReducer = (
  state = initialOnlyExpensePaginationState,
  action: any
): roomMatesPaginationState => {
  switch (action.type) {
    case ROOM_MATES_PAGINATION_REQUEST:
      return { ...state, loading: true };
    case ROOM_MATES_PAGINATION_SUCCESS:
      return { ...state, loading: false, roomMatesList: action.payload };
    case ROOM_MATES_PAGINATION_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

interface roomMatesPostData {
  loading: boolean;
  data: onlyRoomMates | null;
  error: object | null;
}

const initialOnlyExpensePostState: roomMatesPostData = {
  loading: false,
  data: null,
  error: null,
};

export const roomMatesPostReducer = (
  state = initialOnlyExpensePostState,
  action: any
): roomMatesPostData => {
  switch (action.type) {
    case ROOM_MATES_POST_REQUEST:
      return { ...state, loading: true };
    case ROOM_MATES_POST_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case ROOM_MATES_POST_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

interface roomMatesPatchData {
  loading: boolean;
  data: onlyRoomMates | null;
  error: object | null;
}

const initialOnlyExpensePatchState: roomMatesPatchData = {
  loading: false,
  data: null,
  error: null,
};

export const roomMatesPatchReducer = (
  state = initialOnlyExpensePatchState,
  action: any
): roomMatesPatchData => {
  switch (action.type) {
    case ROOM_MATES_PATCH_REQUEST:
      return { ...state, loading: true };
    case ROOM_MATES_PATCH_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case ROOM_MATES_PATCH_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

interface SuccessData {
  message?: string;
  // Add any other properties that logindata might have
}

interface roomMatesDeleteData {
  loading: boolean;
  data: SuccessData | null;
  error: object | null;
}

const initialOnlyExpenseDeleteState: roomMatesDeleteData = {
  loading: false,
  data: null,
  error: null,
};

export const roomMatesDeleteReducer = (
  state = initialOnlyExpenseDeleteState,
  action: any
): roomMatesDeleteData => {
  switch (action.type) {
    case ROOM_MATES_DELETE_REQUEST:
      return { ...state, loading: true };
    case ROOM_MATES_DELETE_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case ROOM_MATES_DELETE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
