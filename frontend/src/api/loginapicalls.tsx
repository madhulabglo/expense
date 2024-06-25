import { HTTP } from "./baseurl";

interface LoginData {
  email: string;
}

export const loginApi = async (data: LoginData): Promise<any> => {
  try {
    const response = await HTTP.post("/", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

interface VerifyData {
  otp:string
}

export const verifyApi = async(data:VerifyData):Promise<any> => {
  try{
    const response = await HTTP.post("/verify-otp",data)
    return response.data
  }catch(error){
    throw error
  }
}