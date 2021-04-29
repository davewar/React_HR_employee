const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require('path')

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", async(req,res)=>{
    res.send("all gd")
})


const employeeRouter = require('./routes/employee');
app.use("/api/employees", employeeRouter )


if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server running ${port}`);
});
