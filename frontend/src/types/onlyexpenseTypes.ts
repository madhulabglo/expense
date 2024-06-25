// Define a type for the form data which doesn't include `_id`
interface ExtraField {
  name: string;
  amount: string;
}

interface Calculation {
  [key: string]: number;
}

export interface FormData {
  name: string;
  date: string;
  description: string;
  amount: string;
  amount_details:ExtraField[]
}

// onlyExpense type (if needed)
export interface onlyExpense {
  name: string;
  date: string;
  description: string;
  amount: string;
  amount_details:ExtraField[]
  _id: string;
}

export interface onlyExpenseResponseWithPagination {
  results: onlyExpense[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  fromdate: string;
  todate: string;
  totalExpenses: number;
}

export interface onlyExpenseResponseWithoutPagination {
  results: onlyExpense[];
  totalExpenses: number;
}

export interface calculationResponse {
  results: onlyExpense[];
  total_expense_amount: number;
  person_own_expense: Calculation[];
  other_person_expense:Calculation[];
  person_spliting_amount: number;
  person_expense_total:number;
  buy_expense_amount:number;
  fromdate: string;
  todate: string;
  name:string;
  split:string

}

export interface onlyExpenseEditProps {
  expense: onlyExpense;
  setModal: React.Dispatch<
    React.SetStateAction<{ add: boolean; edit: boolean; delete: boolean }>
  >;
  // list: ExpenseResponse;
  // setList: React.Dispatch<React.SetStateAction<ExpenseResponse>>;
  triggerapi: boolean;
  setTriggerapi: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface onlyExpenseAddProps {
  setModal: React.Dispatch<
    React.SetStateAction<{ add: boolean; edit: boolean; delete: boolean}>
  >;
  // list: ExpenseResponse;
  // setList: React.Dispatch<React.SetStateAction<ExpenseResponse>>;
  triggerapi: boolean;
  setTriggerapi: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface onlyExpenseCalenderProps {
  setModal: React.Dispatch<
    React.SetStateAction<{ add: boolean; edit: boolean; delete: boolean }>
  >;
  // list: ExpenseResponse;
  // setList: React.Dispatch<React.SetStateAction<ExpenseResponse>>;
  triggerapi: boolean;
  setTriggerapi: React.Dispatch<React.SetStateAction<boolean>>;
}
