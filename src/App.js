import './App.css';
import Employeelist from './Employeelist';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ViewUser from './ViewUser';

function App() {
  return (
    <Router>
      {/* //<div className="App">     */}
        <Switch>          
          <Route path="/users/:id" exact>
            <ViewUser/>
          </Route>
          <Route path="/" exact>
            <Employeelist/>
          </Route>
        </Switch>
      {/* </div> */}
    </Router>
  );
}

export default App;
