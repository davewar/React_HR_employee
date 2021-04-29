import React, { useEffect, useContext, useState} from 'react'
import {EmployeesContext} from '../context/EmployeesContext'
import { useHistory } from 'react-router-dom';
import Loading from './Loading';


const EmployeesList = ({filtered}) => {
        // console.log("filtered", filtered);

    const {employees, setEmployees} = useContext(EmployeesContext) //global
    const [loading, setLoading] = useState(true)

    //orderby
    const [direction, setDirection] = useState();
    const [value, setValue] = useState();

    const history = useHistory()

    useEffect(() => {
        
        const getData = async ()=>{
            
            
            try{
                const res =  await fetch("/api/employees/")
                
                const resData = await res.json()               
                setEmployees(resData.data.employees)
                setLoading(false)

            }
            catch(err){
                console.log("DW",err.message)
            }

        }

        
        getData()
        // eslint-disable-next-line
    }, [])            

const handleEdit = (e, id) =>{
    // console.log("EDIT",id);
    history.push("/update_employee/" + id)

}

const handleDelete = async (e, id) =>{
    // console.log("DELETE",id);

    try{
            
            // eslint-disable-next-line
            const res = await fetch('/api/employees/' + id, { 
                    method: 'DELETE', 
                    body: JSON.stringify({id}),
                    headers: {'Content-Type': 'application/json'},                                
                    
                });
            
            // const resData = await res.json()                 
            const newList = employees.filter(item => item.id !== id) 
            // console.log(newList)                  
            setEmployees(newList)

    }
    catch(err){
        console.log("DW",err.message)
    }

}

const orderBy = (employees, value, direction) => {
  if (direction === "asc") {
    return [...employees].sort((a, b) => (a[value] > b[value] ? 1 : -1));
  }

  if (direction === "desc") {
    return [...employees].sort((a, b) => (a[value] > b[value] ? -1 : 1));
  }

  return employees;
};

 const switchDirection = () => {
        if(direction===""){
            setDirection("desc")
        }else if(direction==="desc"){
            setDirection("asc")
        }else{
              setDirection("") 
        }         
   
  };

  const setValueAndDirection = (value) => {
    switchDirection();
    setValue(value);
  };

   
    let peopleList = filtered ? filtered : employees
    let new_employees = orderBy(peopleList,value,direction)   

    return (
        <>
        {
            loading && <Loading /> 
        }

    <div className="table_data">


        <table>

        <thead>
            <tr >
                           
              <th  className="table_header" onClick={()=>{setValueAndDirection("id");}}>Id </th>
              <th  className="table_header" onClick={()=>{setValueAndDirection("name");}}>Name </th>
              <th  className="table_header" onClick={()=>{setValueAndDirection("email");}}>Email</th>
              <th  className="table_header" onClick={()=>{setValueAndDirection("gender");}}>Gender</th>
              <th  className="table_header" onClick={()=>{setValueAndDirection("status");}}>Status</th>
              <th  className="table_header disabled" >Action</th>
                  
            </tr>
        </thead>

        <tbody>
        {
            new_employees?.map((item)=>{

                const {id, name , email, gender, status} = item

                return <tr className="table_row" key={id}>
        
                <td>{id}</td>
                <td>{name}</td>
                <td>{email}</td>
                <td>{gender}</td>
                <td>{status}</td>
                <td><button className="btn btn-edit" onClick={(e)=>handleEdit(e, id)}>Edit</button></td>
                <td><button className="btn btn-delete" onClick={(e)=>handleDelete(e, id)}>Delete</button></td>

                    </tr>
            }) 
        }
            
        </tbody>
                    
        </table>
        
    </div>

         {

          !new_employees.length && (  <div className="no_items">No Records found</div> )   
         }   

       

    </>
    )
}

export default EmployeesList
