// useMyContext.ts
import { useContext } from 'react';
import MyContext from '../src/context';
import { MyContextType } from '../src/types/expenseTypes';

export const useMyContext = (): MyContextType => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyProvider');
  }
  return context;
};
