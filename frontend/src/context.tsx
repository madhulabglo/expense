// MyContext.tsx
import React, { createContext, useState, ReactNode } from 'react';
import { Expense, ExpenseResponse, ExpenseResponseWithoutPagination, MyContextType } from '../src/types/expenseTypes';

const MyContext = createContext<MyContextType | undefined>(undefined);

interface MyProviderProps {
  children: ReactNode;
}

export const MyProvider: React.FC<MyProviderProps> = ({ children }) => {
    const [triggerapi, setTriggerapi] = useState<boolean>(false);
    const [list, setList] = useState<ExpenseResponse>({
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
    });
    const [alllist,setAlllist]=useState<ExpenseResponseWithoutPagination>({
      results: [],
      availableBalance: 0,
      totalExpenses: 0,
      totalIncome: 0,
    })

  return (
    <MyContext.Provider value={{triggerapi,setTriggerapi,list,setList,alllist,setAlllist }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContext;
