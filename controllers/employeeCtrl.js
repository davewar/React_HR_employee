const db = require("../db/index.js");

module.exports.getEmployees_get = async  (req,res) =>{

        try {

        const results = await db.query("select * from employees");
    
        res.status(200).json({
          status: "success",
          results: results.rows.length,
          data: {
              employees: results.rows,
          },
        });


        } catch (err) {
            console.log(err.message);
             return res.status(400).json({errors: err.message})
        }

}   

module.exports.getEmployee_get = async  (req,res) =>{

        //  console.log(req.params.id);

        try {
            
            const results = await db.query("SELECT * FROM employees WHERE id = $1", [req.params.id])

            // console.log(results.rows[0]);

            if(results.rows.length===0){

              return res.status(400).json({errors: "No record found"})

            }
            
            
            res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                employees: results.rows[0],             
            },
            });
         } catch (err) {

             console.log(err.message);
             return res.status(400).json({errors: err.message})



        }

} 
module.exports.createEmployee_post = async  (req,res) =>{

            
            try {

                  if(!req.body.name || !req.body.email || !req.body.gender || !req.body.status){

                    return res.status(400).json({errors: "Missing fields. Please try again"})
                  } 
                 
              
            const results = await db.query(
            "INSERT INTO employees (name, email, gender,status) values ($1, $2, $3, $4) returning * ",
            [req.body.name, req.body.email, req.body.gender,req.body.status ]
            );
            // console.log(results);

            res.status(201).json({
            status: "success",
            results: results.rows.length,
            data: {
                employees: results.rows[0].id,
            },
            });
          } catch (err) {
                console.log(err.message);          
              return res.status(400).json({errors: err.message})

          }
          
} 

module.exports.amendEmployee_put = async  (req,res) =>{

            // console.log(req.body, req.params.id);

          try {

                if(!req.body.name || !req.body.email || !req.body.gender || !req.body.status){

                    return res.status(400).json({errors: "Missing fields. Please try again"})
                  } 


          const results = await db.query(
            "UPDATE employees SET name = $1, email = $2, gender = $3, status = $4 where id = $5 returning *",
            [req.body.name, req.body.email, req.body.gender,req.body.status, req.params.id]
          );
        // console.log(results.rows);

          if(results.rows.length===0){

              return res.status(400).json({errors: "No record found"})

           }
    
        res.status(200).json({
          status: "success",
          results: results.rows.length,
          data: {
            employees: results.rows[0],
            // employees: 555,
          },
        });

        } catch (err) {
            console.log(err.message);
                return res.status(400).json({errors: err.message})
        }

} 
module.exports.deleteEmployees_delete = async  (req,res) =>{

          // console.log(req.params.id)
      try {
      const results = await db.query("DELETE FROM employees where id = $1", [ req.params.id]);
       
      res.status(200).json({
        status: "success",
      });

      } catch (err) {
                console.log(err.message);
                return res.status(400).json({status: "fail", errors: err.message})
      }

} 



