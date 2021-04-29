
// https://www.youtube.com/watch?v=W1Kttu53qTg

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddEmployee from './pages/AddEmployee'
import Header from "./components/Header";
import UpdateEmployee from "./pages/UpdateEmployee";
import Error from "./components/Error";


function App() {
  return (
    <div className="App">

           

      <Router>

               <Header />
               
           <Switch>

              <Route exact path="/" component={Home} />
              <Route exact path="/create_employee" component={AddEmployee} />
              <Route exact path="/update_employee/:id" component={UpdateEmployee} />
              <Route path="*"><Error /></Route>
                

          </Switch>


      </Router>
     
    </div>
  );
}

export default App;
