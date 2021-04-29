import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { EmployeesContextProvider } from './context/EmployeesContext';


ReactDOM.render(  
              <EmployeesContextProvider>
                    <App />
            </EmployeesContextProvider> ,document.getElementById('root')
        
);


