import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Pages/Home'
import Login from './Pages/Login'
import Privateroute from './Pages/Privateroute'
import './App.css';
// import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
   
      <Router>
        <Switch>
          <Route path='/' component={Login} exact/>
          <Privateroute path='/Home' component={Home} />
        </Switch>
    </Router>
    
  );
}

export default App;
