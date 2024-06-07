import React, { createContext, useState } from 'react';

export const MyContext = createContext();

export const MyContextProvider = ({ children }) => {


  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log(isLoggedIn,"isLoggedIn");
  const Check_Validation = (event, fun_name, setstate) => {
    const form = event.currentTarget;
    event.preventDefault();
    setstate(true);
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return false;
    } else {
      fun_name();
      return true;
    }
  };




  return (
    <MyContext.Provider value={{  Check_Validation,isLoggedIn }}>
      {children}
    </MyContext.Provider>
  );
};