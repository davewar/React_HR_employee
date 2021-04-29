
import EmployeesList from '../components/EmployeesList'
import React, {useState,  useContext} from 'react'
import {EmployeesContext} from '../context/EmployeesContext'



const Home = () => {

    const {employees} = useContext(EmployeesContext) //global

    const [search, setSearch] = useState("")
    const [filtered, setFiltered] = useState("")

    const handleChange = (e)=>{           
            setSearch(e.target.value)    
    }

    const handleSubmit = (e)=>{
        e.preventDefault()       

        const list1 = employees?.filter(item=> item.id.toLowerCase().includes(search.toLowerCase()))
        const list2 = employees?.filter(item=> item.name.toLowerCase().includes(search.toLowerCase()))      
        const list3 = employees?.filter(item=> item.email.toLowerCase().includes(search.toLowerCase()))
        const list4 = employees?.filter(item=> item.gender === search.toLowerCase())
        const list5 = employees?.filter(item=> item.status === search.toLowerCase())

        let list = [...list1,...list2,...list3,...list4,...list5]
        let unique = [...new Set(list)]
        // console.log(list);
        // console.log(unique);
                  
        setFiltered(unique)    

    }


    return (
        <>

        <div className="search">

            <form  onSubmit={(e)=>handleSubmit(e)}>

                <input type="text"
                        value={search}
                        onChange={(e)=>handleChange(e)}
                        placeholder="Search....." 
                        autoComplete="off"       
                />

                <button className="btn" type="submit">Search</button>
                <button className="btn" type="submit"onClick={()=>{
                    setSearch("");
                    setFiltered(employees);
                }}
                >Reset</button>

            </form>
           
        </div>

          
            <EmployeesList filtered={filtered}/>         
                 

         </>
    )
}

export default Home
