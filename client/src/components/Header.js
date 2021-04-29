import React from 'react'
import { Link,  useLocation } from 'react-router-dom';

const Header = () => {

        const location = useLocation(null)

    return (

        <>
        <div className="header">

            <h4 className="header_h4">HR Management System</h4>        

        {
            location.pathname === "/" ? <button  className="btn" ><Link className="link" to="/create_employee">Add Employee</Link></button> :
            location.pathname === "/create_employee" ?  <button className="btn" ><Link className="link" to="/">Home</Link></button> :
            location.pathname.includes("/update_employee") ? <button className="btn" ><Link className="link" to="/">Home</Link></button> :  null
           
        }

        <div className="build">

            <ul>
                <li>PostgreSQL</li>
                <li>Express</li>
                <li>React</li>
                <li>Node</li>
            </ul>

        </div>
            
        </div>
       
       

        </>
    )
}

export default Header
