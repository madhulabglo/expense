import { Dispatch } from "redux";
import { CALCULATION_FAILURE, CALCULATION_REQUEST, CALCULATION_SUCCESS } from "../constant/calculationconstant";
import { calculationResponse } from "../../types/onlyexpenseTypes";


const baseURL = "http://127.0.0.1:4000";

const localstorage_data = JSON.parse(localStorage.getItem("data") as string);

export const fetchCalculationRequest = ()=>({
    type:CALCULATION_REQUEST
})

export const fetchCalculationSuccess = (list:calculationResponse)=>({
    type:CALCULATION_SUCCESS,
    payload:list
})

export const fetchCalculationFailure = (error: string)=>({
type:CALCULATION_FAILURE,
payload:error
})

export const getCalculation = (fromdate:string,todate:string,name:string,split:string)=> {
    return async (dispatch: Dispatch) => {
        dispatch(fetchCalculationRequest());
    
        try {
          const token = localstorage_data?.token; // Replace with your actual token    
          const response = await fetch(`${baseURL}/specificcalculation?fromdate=${fromdate}&todate=${todate}&name=${name}&split=${split}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include your token here
            },
          });
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const allexpense = await response.json();
    
          dispatch(fetchCalculationSuccess(allexpense));
        } catch (error) {
          // Type assertion to specify that error is an instance of Error
          dispatch(fetchCalculationFailure((error as Error).message));
        }
      };
}