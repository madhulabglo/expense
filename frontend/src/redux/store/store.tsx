// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import {thunk} from "redux-thunk"
import { expensePaginationReducer, expenseReducer, loginReducer, otpReducer } from '../reducer/expensereducer';
import { onlyExpenseDeleteReducer, onlyExpensePatchReducer, onlyExpensePostReducer, onlyexpensePaginationReducer, onlyexpenseReducer } from '../reducer/onlyexpensereducer';
import { roomMatesDeleteReducer, roomMatesPaginationReducer, roomMatesPatchReducer, roomMatesPostReducer, roomMatesReducer } from '../reducer/roommatesreducer';
import { calculationReducer } from '../reducer/calculationreducer';

export const store = configureStore({
  reducer: {
    login:loginReducer,
    otp:otpReducer,
    expense: expenseReducer,
    expensePagination :expensePaginationReducer,
    onlyexpense : onlyexpenseReducer,
    onlyexpensePagination : onlyexpensePaginationReducer,
    onlyexpensePost : onlyExpensePostReducer,
    onlyexpensePatch : onlyExpensePatchReducer,
    onlyexpenseDelete : onlyExpenseDeleteReducer,
    roomMates:roomMatesReducer,
    roomMatesPagination : roomMatesPaginationReducer,
    roomMatesPost:roomMatesPostReducer,
    roomMatesPatch:roomMatesPatchReducer,
    roomMatesDelete:roomMatesDeleteReducer,
    calculation:calculationReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
 
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
