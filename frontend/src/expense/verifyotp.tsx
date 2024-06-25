// -----------------------------usecontext ---------------------------

// import React, { useRef, useState } from "react";

// import "../style/verifyotp.css";
// import { verifyApi } from "../api/loginapicalls";
// import { useNavigate } from "react-router-dom";

// type InputProps = {
//   length?: number;
// };
// type ErrorState = Record<string, any>;

// const VerifyOtp: React.FC<InputProps> = ({ length = 6 }) => {
//   const inputRef = useRef<HTMLInputElement[]>(Array(length).fill(null));
//   const [OTP, setOTP] = useState<string[]>(Array(length).fill(""));
//   const [loading,setLoading]=useState(false)
//   const [error, setError] = useState<ErrorState | null>(null);
//   const navigate = useNavigate()

//   const handleTextChange = (input: string, index: number) => {
//     const newPin = [...OTP];
//     newPin[index] = input;
//     setOTP(newPin);
//     setError((prev)=>({...prev,message:"",otp:""}))

//     if (input.length === 1 && index < length - 1) {
//       inputRef.current[index + 1]?.focus();
//     }

//     if (input.length === 0 && index > 0) {
//       inputRef.current[index - 1]?.focus();
//     }
//   };
//   console.log(OTP,"OTP")

//   const handleVerify = async() => {
//     setLoading(true)
//     try {
//       const singleString = OTP.join('');
//       const update_data = {otp:singleString}
//       const response = await verifyApi(update_data)
//       console.log(response)
//       if(response){
//         localStorage.setItem("data",JSON.stringify(response))
//         navigate("/home")
//       }
//       setLoading(false)

//     } catch (error:any) {
//       console.log(error,"error");
//       setLoading(false)
//       setError(error?.response?.data)
//     }
//   }

//   // return the inputs component

//   return (
//     <div className="container">
//       <div className="card">
//         <h4>Verify OTP</h4>
//         <div>
//           <label>
//             Enter Your OTP <span>*</span>
//           </label>
//           <div className="otp-field">
//             {Array.from({ length }, (_, index) => (
//               <input
//                 key={index}
//                 type="text"
//                 maxLength={1}
//                 value={OTP[index]}
//                 onChange={(e) => handleTextChange(e.target.value, index)}
//                 ref={(ref) =>
//                   (inputRef.current[index] = ref as HTMLInputElement)
//                 }
//                 required
//                 // className={`border border-solid border-border-slate-500 focus:border-blue-600  outline-none display:flex`}
//                 // style={{ marginRight: index === length - 1 ? "0" : "10px" }}
//               />
//             ))}
//           </div>
//           {error && error?.otp && <p className="error-message">{error?.otp}</p>}
//           {error && error?.message && <p className="error-message">{error?.message}</p>}
// 					<button onClick={handleVerify} disabled={loading}>{loading ? "Loading" :"Verify Otp"}</button>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default VerifyOtp;

// ------------------------------/usecontext ------------------------------------------------

// ------------------------------- redux --------------------------------------------

import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../redux/hooks/storehooks";
import { postOtpVerification } from "../redux/actions/expenseactions";

import "../style/verifyotp.css";

type InputProps = {
  length?: number;
};

interface ErrorData {
  [key: string]: string | null; // Dynamic keys for error messages
}

const VerifyOtp: React.FC<InputProps> = ({ length = 6 }) => {
  const inputRef = useRef<HTMLInputElement[]>(Array(length).fill(null));
  const [OTP, setOTP] = useState<string[]>(Array(length).fill(""));
  const [error, setError] = useState<ErrorData>({});
  const otp_data = useAppSelector((state) => state.otp);
  const { loading, otpdata, error: loginError } = otp_data;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleTextChange = (input: string, index: number) => {
    const newPin = [...OTP];
    newPin[index] = input;
    setOTP(newPin);
    setError({})

    if (input.length === 1 && index < length - 1) {
      inputRef.current[index + 1]?.focus();
    }

    if (input.length === 0 && index > 0) {
      inputRef.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const singleString = OTP.join("");
    const update_data = { otp: singleString };
    dispatch(postOtpVerification(update_data));
  };

  useEffect(() => {
    if (loginError) {
      setError(loginError as ErrorData); // Display the entire error object
    } else {
      setError({});
    }
  }, [loginError]);

  useEffect(() => {
    if (otpdata) {
      localStorage.setItem("data",JSON.stringify(otpdata))
      navigate("/home");
    }
  }, [otpdata, navigate]);
  
  return (
    <div className="otp-container">
      <div className="otp-card">
        <h4>Verify OTP</h4>
        <div>
          <label>
            Enter Your OTP <span>*</span>
          </label>
          <div className="otp-field">
            {Array.from({ length }, (_, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={OTP[index]}
                onChange={(e) => handleTextChange(e.target.value, index)}
                ref={(ref) => (inputRef.current[index] = ref as HTMLInputElement)}
                required
              />
            ))}
          </div>
          {Object.keys(error).map((key) => (
            <p key={key} className="error-message">{error[key]}</p>
          ))}
          <button onClick={handleVerify} disabled={loading}>
            {loading ? "Loading" : "Verify Otp"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
