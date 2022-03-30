import './App.css';
import Registration from './components/Registration'
import Autorization from './components/Autorization'
import PhotoOperations from './components/PhotoOperations'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">

        <body>
          <Switch>
            <Route path="/photo">
              <PhotoOperations />
            </Route>
            <Route path="/register">
              <Registration />
            </Route>
            <Route path="/auth">
              <Autorization />
            </Route>
            <Redirect to="/auth"/>
          </Switch>

        </body>
      </div>
    </Router>
  );
}

export default App;
