// -----------------------------------usecontext------------------------------------
// import React, { useState } from "react";

// import "../style/login.css";
// import {  loginApi } from "../api/loginapicalls";
// import { useNavigate } from "react-router-dom";

// interface formData {
//   email: string;
// }

// interface errorData {
//   email: string
// }

// const Login: React.FC = () => {
//   const [data, setData] = useState<formData>({ email: "" });
//   const [error,setError] =useState<errorData>({email:""})
//   const [loading,setLoading]=useState(false)

//   const navigate = useNavigate()

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setData((prev) => ({ ...prev, [name]: value }));
//     setError((prev)=>({...prev,[name]:""}))
//   };

// 	const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
// 		e.preventDefault()
//     setLoading(true)
//     console.log(data,"dataaa");
//       try {
//       const response = await loginApi(data)
//       navigate("/verify-otp")
//       console.log(response)

//       setLoading(false)
//     } catch (error) {
//       console.log(error,"error");
//       setLoading(false)

//     }
// 	}
//   console.log(error,"errrorrr")
//   return (
//     <div className="container">
//       <div className="card">
// 				<form onSubmit={handleSubmit}>
//         <h4>Expense Tracker</h4>
//         <div>
//           <label>
//             Enter email address <span>*</span>
//           </label>
//           <input
//             name="email"
//             id="email"
//             placeholder="enter email address"
//             type="email"
//             onChange={handleChange}
//             value={data?.email}
//             required
//           />
//           {error && error?.email && <p className="error-message">{error?.email}</p>}
//           <button type="submit" disabled={loading || !error}>{loading ? "loding..." :"go"}</button>
//         </div>
// 				</form>
//       </div>
//     </div>
//   );
// };
// export default Login;

// ----------------------------------------/usecontext----------------------------------

// --------------------------------------- redux ----------------------------------

import React, { useEffect, useState } from "react";

import "../style/login.css";

import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks/storehooks";
import { postEmailAddress } from "../redux/actions/expenseactions";

interface formData {
  email: string;
}

interface errorData {
  email: string;
}

const Login: React.FC = () => {
  const [data, setData] = useState<formData>({ email: "" });
  const [error, setError] = useState<errorData>({ email: "" });
  // const [loading,setLoading]=useState(false)
  const login_data = useAppSelector((state) => state.login);
  const { error: loginError, loading, logindata } = login_data;
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(postEmailAddress(data));
    // setLoading(true)
    // console.log(data,"dataaa");
    //   try {
    //   const response = await loginApi(data)
    //   navigate("/verify-otp")
    //   console.log(response)

    //   setLoading(false)
    // } catch (error) {
    //   console.log(error,"error");
    //   setLoading(false)

    // }
  };

  useEffect(() => {
    if (logindata?.message) {
      navigate("/verify-otp");
    }
  }, [logindata]);
  return (
    <div className="login-container">
      <div className="login-card">
        <form onSubmit={handleSubmit}>
          <h4>Expense Tracker</h4>
          <div>
            <label>
              Enter email address <span>*</span>
            </label>
            <input
              name="email"
              id="email"
              placeholder="enter email address"
              type="email"
              onChange={handleChange}
              value={data?.email}
              required
            />
            {/* {loginError && loginError?.email && <p className="error-message">{error?.email}</p>} */}
            <button type="submit" disabled={loading || !error}>
              {loading ? "loding..." : "go"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
