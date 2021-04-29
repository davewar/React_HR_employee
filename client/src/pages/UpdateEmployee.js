import React, { useState, useContext, useEffect,  } from 'react';
import { useParams } from 'react-router-dom';
import {EmployeesContext} from '../context/EmployeesContext'




const UpdateEmployee = () => {

  const {employees,setEmployees} = useContext(EmployeesContext) //global

  const { id } = useParams();
    // console.log(id)
  

  //employee
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [gender, setGender] = useState('male');
  const [status, setStatus] = useState('active');
  //err messages
  const [nameErr, setnameErr] = useState('');
  const [emailErr, setemailErr] = useState(''); 
  // add employee fail/pass
  const [success,setSuccess] = useState('')
  const [signUpErr, setSignUpErr] = useState("")


  useEffect(() => {
   
      const person = employees.filter(item=> item.id === id)
          
          setname(person[0].name)
          setemail(person[0].email)
          setGender(person[0].gender)
          setStatus(person[0].status)
         

  }, []) 
  
  const handleChange = (e, name) => {

      //clear
    setSignUpErr("")

    const user = {};
    const emailRegEx = RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    user[name] = e.target.value;
    // validations
    switch (name) {
      case 'name':
       
        setname(user.name);
        user.name.length < 3 ? setnameErr('Name must be at least 3 characters!') : setnameErr('');
        break;
      case 'email':
        
        setemail(user.email);
        !emailRegEx.test(user.email) ? setemailErr('Invalid Email!') : setemailErr('');
        break;

      default:
        break;
    }
  }

  const addEmployee = async (e) => {

      e.preventDefault();

    
    
    if (name && email && !nameErr && !emailErr) {

          //    //clear
          setSignUpErr("")
          setSuccess("")
            
    try {

      const res = await fetch("/api/employees/" + id, { 
            method: 'PUT', 
            body: JSON.stringify({ id, name, email, status, gender }),
            headers: {'Content-Type': 'application/json'}
                 
            },          
        
      );

      const resData = await res.json();

      // console.log(resData);

      if (resData.status ==="fail") {
           
            setSignUpErr(resData.errors)
          
        return
      } else{

         setSuccess("Employee record updated")

         const newList = employees.map(item=>{
            if(item.id === id){

              return {
                        name: name,
                        email: email,
                        gender: gender,
                        status : status,  
                    }
              

            }
            return item

         })
         setEmployees([newList])

      }
    

    }
    catch (err) {
      console.log(err.message);
      setSignUpErr(err.message)
    }


    }
  }
  
  return (
      
        <div className="container">

          

            <div className="col-xs-12 sign-in " >
                <h2 className="text-center">Update Employee</h2>
                {signUpErr && <div className="alert alert-danger text-center">
                    <span className="text-danger text-capitalize">{signUpErr}</span>
                    </div>
                }   

                {success && <div className="alert alert-success text-center">
                                  <span className="text-success text-capitalize">{success}</span>
                            </div>}

                <form className="form_add_employee" onSubmit={addEmployee}>

                    <div className="form-group">
                    <label >Enter Full Name</label>
                    <input
                        type="text"
                        name="name"
                        // className={nameErr ? "form-control is-invalid":
                        //     (!nameErr && name.length) ? "form-control is-valid": "form-control"
                        //       }
                        value={name}
                        id="name"
                        // placeholder="Full Name"
                        onChange={(e) => handleChange(e, 'name')}
                    />
                    {nameErr && <small className="text-danger">{nameErr}</small>}
                    </div>

                    <div className="form-group">
                    <label >Enter Email Address</label>
                    <input
                        type="email"
                        name="email"
                        // className={ emailErr ? "form-control is-invalid":
                        //       !emailErr && email.length ? "form-control is-valid":"form-control"
                        //   }
                        
                        value={email}
                        id="email"
                        // placeholder="Email Address"
                        onChange={(e) => handleChange(e, 'email')}
                    />
                    {emailErr && <small className="text-danger">{emailErr}</small>}
                    </div>

                      {/* value={gender} onChange={(e)=>setGender(e.target.value)} */}
                    <div className="form-check" >

                            <div className="radio">

                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="gender"
                                    id="flexRadioDefault1"
                                    value="male"
                                    checked={gender==="male"}
                                    onChange={(e)=>setGender(e.target.value)}
                                    
                                />
                                <label className="form-check-label" >Male</label>
                            </div>

                             <div className="radio">

                                <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                id="flexRadioDefault2"
                                value="female"
                                checked={gender==="female"}
                                onChange={(e)=>setGender(e.target.value)}                                
                                  />
                                  <label className="form-check-label" >Female</label>

                            </div>
                        </div>

              
                    <div className="form-check" >

                       <div className="radio">

                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="status"
                                    id="flexRadioDefault1"
                                    value="active"
                                       checked={status==="active"}
                                    onChange={(e)=>setStatus(e.target.value)}
                                                              
                                   
                                />
                                <label className="form-check-label" >Active</label>

                                
                        </div>

                             <div className="radio">
                                      <input
                                      className="form-check-input"
                                      type="radio"
                                      name="status"
                                      id="flexRadioDefault2"
                                      value="inactive"
                                        checked={status==="inactive"}
                                          onChange={(e)=>setStatus(e.target.value)}
                                      
                                  />
                                  <label className="form-check-label" >InActive</label>

                            </div>

                        </div>

                
                    <button type="submit" className="btn" id="btn-save">Save</button>

                </form>
                   
                    
                
        
                </div>
            </div>
  
    
  )
}


export default UpdateEmployee
