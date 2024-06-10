// import React, { useContext, useState } from 'react'
// import { Form } from 'react-bootstrap'
// import { MyContext } from '../../Services/Context'
// import { ApiCall } from '../../Services/Api'
// import { login_url } from '../../../Utils/Constants'
// import { useNavigate } from 'react-router-dom'
// import toast from 'react-hot-toast'

// function Login() {
//   const navigate =useNavigate();
//     const [validated, setValidated] = useState(false)
//     const { Check_Validation } = useContext(MyContext)
//     const  [loginData,setLoginData]=useState('')
//     const [showPassword, setShowPassword] = useState(false);
//     const [message, setMessage] = useState();

//     const handlePasswordToggle = () => {
//       setShowPassword(!showPassword);
//     };


//     const login = async () => {
//       try {
//         const response = await ApiCall("post", login_url, loginData);
//         if (response.status === 200) {
//           toast.success("Login successfull");
//           localStorage.setItem('loggedIn',true)
//           localStorage.setItem("User", response?.data?.token)
//           navigate("/dashboard");
//         } else {
//           toast.error(response?.response?.data?.message);
//           setMessage(response?.response?.data?.message)
//         }
//       } catch (error) {
//         console.log(error,"msg");
//         // toast.error(error, false);
//       }
//     };
  

// const handleLogin = (e) => {
//   console.log("works");
//   e.preventDefault();
//   Check_Validation(e, login, setValidated);
// };
//   return (
//     <>
// <div className="account-pages" style={{backgroundImage: 'url(/assets/images/background.png)', backgroundSize: 'cover', height: '100vh'}}>
//          <div className="container">
//             <div className="row justify-content-center">
//             <div className="col-md-8 col-lg-6 col-xl-4">
//                 <div className="text-center">   
//                     <img src="/assets/images/kalyan logo-01.png" alt height={250} className="mx-auto" />
//                 </div>
//                 <div className="card">
//                 <div className="card-body p-4">
//                     <div className="text-center mb-4">
//                     <h4 className="text-uppercase mt-0">Log in </h4>
//                     </div>
//                     <Form 
//                      noValidate
//                       validated={validated}
//                       onSubmit={handleLogin}>
//                     <div className="mb-3">
//                         <label htmlFor="emailaddress" className="form-label">Email address</label>
//                         <input className="form-control" type="email" id="emailaddress" required placeholder="Enter your email" 
//                        onChange={(e) => {
//                         setLoginData({
//                           ...loginData,
//                           email: e.target.value,
//                         });
//                         setMessage('');
//                       }}
                      
//                         />
//                         <Form.Control.Feedback type='invalid'>
//                             Please Provide a email
//                         </Form.Control.Feedback>
//                     </div>
//                     <div className="mb-3">
//                           <label className="form-label">Password</label>
//                           <div className="input-group auth-pass-inputgroup">
//                             <input
//                               className="form-control"
//                               placeholder="Enter password"
//                               aria-label="Password"
//                               aria-describedby="password-addon"
//                               required
//                               value={loginData?.password}
//                               type={showPassword ? "text" : "password"}
//                               onChange={(e) =>{
//                                 setLoginData({
//                                   ...loginData,
//                                   password: e.target.value,
//                                 });
//                                 setMessage('');
//                               }}
//                             />
//                             <button
//                               className="btn btn-light "
//                               type="button"
//                               id="password-addon"
//                               onClick={handlePasswordToggle}
//                             >
//                               {showPassword ? (
//                                 <i className="fa-solid fa-eye-slash"></i>
//                               ) : (
//                                 <i className="fa-sharp fa-solid fa-eye"></i>
//                               )}
//                             </button>
//                             <Form.Control.Feedback type="invalid">
//                               Please enter the password
//                             </Form.Control.Feedback>
//                           </div>
//                         </div>
//                     <div className="mb-3 d-grid text-center">
//                     <span style={{color:"red"}}>{message?.toUpperCase()}</span>

//                         <button className="btn btn-primary mt-2" type="submit"> Log In </button>
//                     </div>
//                     </Form>
//                 </div>
//                 </div>
                

                
//             </div> 
//             </div> 
            
//         </div>
        
      
        
//         </div>
        
//     </>
//   )
// }

// export default Login



import React, { useContext, useState } from 'react';
import { Form } from 'react-bootstrap';
import { MyContext } from '../../Services/Context';
import { ApiCall } from '../../Services/Api';
import { login_url } from '../../../Utils/Constants';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
// import './login.css';

function Login() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const { Check_Validation } = useContext(MyContext);
  const [loginData, setLoginData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState();

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const login = async () => {
    try {
      const response = await ApiCall("post", login_url, loginData);
      if (response.status === 200) {
        toast.success("Login successful");
        localStorage.setItem('loggedIn', true);
        localStorage.setItem("User", response?.data?.token);
        navigate("/dashboard");
      } else {
        toast.error(response?.response?.data?.message);
        setMessage(response?.response?.data?.message);
      }
    } catch (error) {
      console.log(error, "msg");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    Check_Validation(e, login, setValidated);
  };

  return (
    <div className="account-pages">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-4">
            <div className="text-center mb-4">
              <img src="/assets/images/kalyan logo-01.png" alt="logo" height={250} className="mx-auto" />
            </div>
            <div className="card">
              <div className="card-body p-4">
                <div className="text-center mb-4">
                  <h4 className="text-uppercase mt-0">Log in</h4>
                </div>
                <Form noValidate validated={validated} onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label htmlFor="emailaddress" className="form-label">Email address</label>
                    <input
                      className="form-control"
                      type="email"
                      id="emailaddress"
                      required
                      placeholder="Enter your email"
                      onChange={(e) => {
                        setLoginData({
                          ...loginData,
                          email: e.target.value,
                        });
                        setMessage('');
                      }}
                    />
                    <Form.Control.Feedback type='invalid'>
                      Please Provide an email
                    </Form.Control.Feedback>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <div className="input-group auth-pass-inputgroup">
                      <input
                        className="form-control"
                        placeholder="Enter password"
                        aria-label="Password"
                        aria-describedby="password-addon"
                        required
                        type={showPassword ? "text" : "password"}
                        onChange={(e) => {
                          setLoginData({
                            ...loginData,
                            password: e.target.value,
                          });
                          setMessage('');
                        }}
                      />
                      <button
                        className="btn btn-light"
                        type="button"
                        id="password-addon"
                        onClick={handlePasswordToggle}
                      >
                        {showPassword ? (
                          <i className="fa-solid fa-eye-slash"></i>
                        ) : (
                          <i className="fa-sharp fa-solid fa-eye"></i>
                        )}
                      </button>
                      <Form.Control.Feedback type="invalid">
                        Please enter the password
                      </Form.Control.Feedback>
                    </div>
                  </div>
                  <div className="mb-3 d-grid text-center">
                    <span style={{ color: "red" }}>{message?.toUpperCase()}</span>
                    <button className="btn btn-primary mt-2" type="submit">Log In</button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
