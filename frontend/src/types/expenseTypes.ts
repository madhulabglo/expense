// // types.ts

// // Define the HistoryEntry interface
// export interface HistoryEntry {
//     date: string;
//     description: string;
//     amount: number;
//   }
  
//   // Define the Balance interface
//   export interface Balance {
//     Available_Balance: number;
//     LastMonth_Income: number;
//     LastMonth_Expense: number;
//     History: HistoryEntry[];
//   }
  
//   // Define the HistoryProps interface
//   export interface HistoryProps {
//     balance_data: Balance;
//   }


//   export interface Expense {
//     date: string;
//     category:string;
//     description: string;
//     amount: string;
//     is_expense: boolean;
//     _id: string;
//   }

//   export interface ExpenseResponse {
//     results: Expense[];
//     page: number;
//     limit: number;
//     total: number;
//     totalPages: number;
//     fromdate:string;
//     todate:string;
//     availableBalance:number,
//     totalExpenses:number,
//     totalIncome:number
//   }
  
//  export interface EditExpenseProps {
//     expense: Expense;
//     setModal: React.Dispatch<React.SetStateAction<{ add: boolean; edit: boolean; delete: boolean }>>;
//     list: ExpenseResponse;
//     setList: React.Dispatch<React.SetStateAction<ExpenseResponse>>;
//     triggerapi: boolean;
//     setTriggerapi: React.Dispatch<React.SetStateAction<boolean>>;
//   }

//   export interface AddExpenseProps {
//     setModal: React.Dispatch<React.SetStateAction<{ add: boolean; edit: boolean; delete: boolean }>>;
//     list: ExpenseResponse;
//     setList: React.Dispatch<React.SetStateAction<ExpenseResponse>>;
//     triggerapi: boolean;
//     setTriggerapi: React.Dispatch<React.SetStateAction<boolean>>;
//   }


// types.ts
import React from 'react';

export interface Expense {
  date: string;
  category: string;
  description: string;
  amount: string;
  is_expense: boolean;
  _id: string;
}

export interface ExpenseResponse {
  results: Expense[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  fromdate: string;
  todate: string;
  availableBalance: number;
  totalExpenses: number;
  totalIncome: number;
}

export interface ExpenseResponseWithoutPagination {
  results: Expense[];
  availableBalance: number;
  totalExpenses: number;
  totalIncome: number;
}

export interface EditExpenseProps {
  expense: Expense;
  setModal: React.Dispatch<React.SetStateAction<{ add: boolean; edit: boolean; delete: boolean }>>;
  // list: ExpenseResponse;
  // setList: React.Dispatch<React.SetStateAction<ExpenseResponse>>;
  triggerapi: boolean;
  setTriggerapi: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface AddExpenseProps {
  setModal: React.Dispatch<React.SetStateAction<{ add: boolean; edit: boolean; delete: boolean }>>;
  // list: ExpenseResponse;
  // setList: React.Dispatch<React.SetStateAction<ExpenseResponse>>;
  triggerapi: boolean;
  setTriggerapi: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface MyContextType {
  list: ExpenseResponse;
  setList: React.Dispatch<React.SetStateAction<ExpenseResponse>>;
  // modal: { add: boolean; edit: boolean; delete: boolean };
  // setModal: React.Dispatch<React.SetStateAction<{ add: boolean; edit: boolean; delete: boolean }>>;
  triggerapi: boolean;
  setTriggerapi: React.Dispatch<React.SetStateAction<boolean>>;
  alllist:ExpenseResponseWithoutPagination
  setAlllist:React.Dispatch<React.SetStateAction<ExpenseResponseWithoutPagination>>;
  // Include other state and functions as needed
}


  