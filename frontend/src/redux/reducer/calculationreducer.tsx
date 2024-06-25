import { calculationResponse } from "../../types/onlyexpenseTypes";
import { CALCULATION_FAILURE, CALCULATION_REQUEST, CALCULATION_SUCCESS } from "../constant/calculationconstant";



interface calculationState {
    loading: boolean;
    list: calculationResponse;
    error: string | null;
  }
  
  const initialOnlyExpensePaginationState: calculationState = {
    loading: false,
    list: {
      results: [],
      total_expense_amount:0,
      person_own_expense:[],
      other_person_expense:[],
      person_spliting_amount:0,
      person_expense_total:0,
      buy_expense_amount:0,
      fromdate: "",
      todate: "",
      name:"",
      split:""
    },
    error: null,
  };
  
  export const calculationReducer = (
    state = initialOnlyExpensePaginationState,
    action: any
  ): calculationState => {
    switch (action.type) {
      case CALCULATION_REQUEST:
        return { ...state, loading: true };
      case CALCULATION_SUCCESS:
        return { ...state, loading: false, list: action.payload };
      case CALCULATION_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  