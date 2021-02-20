import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Pages/Home'
import Login from './Pages/Login'
import Header from './Component/Header'
import Footer from './Component/Footer'
import Rooms from './Pages/Rooms'
import AddRoom from './Pages/AddRoom'
import Aboutus from './Pages/Aboutus'
import Oneroom from './Pages/Oneroom'
import profile from './Pages/Profile'
import Reservation from './Pages/Reservation'
import Privateroute from './Pages/Privateroute'
import Adminres from './Pages/Adminres'
import LoginprotectedRoute from './Pages/LoginprotectedRoute'
import AdminRout from './Pages/AdminRout'
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

function App() {
  return (
      
      <Router>
        <Header />
        <Switch>
          <Route path='/' component={Home} exact/>
          <Route path='/about' component={Aboutus} exact/>
          <Route path='/addroom' component={AddRoom} exact/>
          <Route path='/Rooms' component={Rooms} exact/>
          <Route path='/Room/:id' component={Oneroom} exact/>
          <AdminRout path='/admin' component={Adminres} exact/>
          <LoginprotectedRoute path='/Login' component={Login} exact/>
          <Privateroute path='/Reservation' component={Reservation} exact/>
          <Privateroute path='/profile' component={profile} exact/>

          
          {/* <Route path='/' component={Adminres} exact/> */}
          {/* <Route path='/Reservation' component={Reservation} exact/> */}
          {/* <Route path='/Login' component={Login} exact/> */}
        </Switch>
        {/* <Footer /> */}
    </Router>
    
  );
}

export default App;
