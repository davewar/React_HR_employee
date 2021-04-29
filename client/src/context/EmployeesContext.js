import React, { useState, createContext } from "react";

export const EmployeesContext = createContext();

export const EmployeesContextProvider = (props) => {

  const [employees, setEmployees] = useState([]);
 
  
  return (
    <EmployeesContext.Provider
      value={{
       employees,
       setEmployees
      }}
    >
      {props.children}
    </EmployeesContext.Provider>
  );
};
