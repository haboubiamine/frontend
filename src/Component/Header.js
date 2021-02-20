import React , { useState , useEffect } from 'react'
import { useHistory } from "react-router-dom";
import {useDispatch } from 'react-redux';
import {Logout} from './../redux/actions/authAction';
import logo from './../images/logo_transparent.png'
import $ from 'jquery'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import { Navbar,Nav,NavDropdown,Form,FormControl,Button ,  } from 'react-bootstrap'
import Avatar from '@material-ui/core/Avatar';


function Header() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [isadmin, setisadmin] = useState(false)
    const [isauth, setisauth] = useState(false)
    const user =JSON.parse(localStorage.getItem('user')) ;

    useEffect(() => {

        const admin =()=>{
        const user =JSON.parse(localStorage.getItem('user')) ;
            if(user){
        if(user.role === "admin"){
            setisadmin(true)
        }
    }
        }

        const auth = () => {
            const token = localStorage.getItem('token')
            if(token){setisauth(true)}
        }

        admin()
        auth()
    }, [])

    const [isOpen, setisOpen] = useState(false)
  const toggleCollapse = () => {
      setisOpen(!isOpen);
    }

    
    const handellogout = (e)=>{
        dispatch(Logout());
        window.location.replace('/login');
    }

    const handelprofile = (e)=>{
        window.location.replace('/profile');
    }

    window.addEventListener("load", function(event) {
        if(window.location.pathname === '/'){
            $('#Home').addClass('active border rounded')
        }else if(window.location.pathname === '/Rooms'){
            $('#Rooms').addClass('active border rounded')
        }else if(window.location.pathname === '/about'){
            $('#about').addClass('active border rounded')
        }
        else if(window.location.pathname === '/admin'){
            $('#admin').addClass('active border rounded')
        }
        else if(window.location.pathname === '/addroom'){
            $('#addroom').addClass('active border rounded')
        }
        else if(window.location.pathname === '/Reservation'){
            $('#Reservation').addClass('active')
        }
      });


      const navigate = (link) =>{
        history.push(link)
        if(link === '/'){

            $('#Home').addClass('active border rounded')
            $('#Rooms').removeClass('active border rounded')
            $('#about').removeClass('active border rounded')
            $('#admin').removeClass('active border rounded')
            $('#Reservation').removeClass('active')
            $('#addroom').removeClass('active border rounded')

        }else if(link === '/Rooms'){

            $('#Home').removeClass('active border rounded')
            $('#Rooms').addClass('active border rounded')
            $('#about').removeClass('active border rounded')
            $('#admin').removeClass('active border rounded')
            $('#addroom').removeClass('active border rounded')
            $('#Reservation').removeClass('active')

        }else if(link === '/about'){
            $('#Home').removeClass('active border rounded')
            $('#Rooms').removeClass('active border rounded')
            $('#about').addClass('active border rounded')
            $('#admin').removeClass('active border rounded')
            $('#addroom').removeClass('active border rounded')
            $('#Reservation').removeClass('active ')
        }
        else if(link === '/admin'){

            $('#Home').removeClass('active border rounded')
            $('#Rooms').removeClass('active border rounded')
            $('#about').removeClass('active border rounded')
            $('#admin').addClass('active border rounded')
            $('#addroom').removeClass('active border rounded')
            $('#Reservation').removeClass('active ')
        }
        else if(link === '/addroom'){

            $('#Home').removeClass('active border rounded')
            $('#Rooms').removeClass('active border rounded')
            $('#about').removeClass('active border rounded')
            $('#admin').removeClass('active border rounded')
            $('#Reservation').removeClass('active')
            $('#addroom').addClass('active border rounded')
        }

        else if(link === '/Reservation'){

            $('#Home').removeClass('active border rounded')
            $('#Rooms').removeClass('active border rounded')
            $('#about').removeClass('active border rounded')
            $('#admin').removeClass('active border rounded')
            $('#addroom').removeClass('active border rounded')
            $('#Reservation').addClass('active')
        }
      }
   
        
    
    return (
        

      <div id="header" style={{height:107}}  className="">
                    <div  style={{width:"100%" ,height:'100%'}}>
                        <Router>
                            <Navbar className="shadow "  style={{backgroundColor:"#1477ad" }}  variant="dark" expand="lg" sticky="top">
                                <Navbar.Brand href="/" style={{width:150}}><img src={logo} style={{height:'100%',width:'100%'}}/></Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav " />
                                <Navbar.Collapse id="basic-navbar-nav ">
                                    <Nav className="mx-auto">
                                    <Nav.Link id="Home" className="mr-3 ml-3" onClick={()=>{navigate('/')}}  style={{fontSize:16}} ><span className="link">Home</span></Nav.Link>
                                    <Nav.Link id="Rooms" className="mr-3 ml-3" onClick={()=>{navigate('/Rooms')}} style={{fontSize:16}} ><span className="link">Room</span></Nav.Link>
                                    <Nav.Link id="about" className="mr-3 ml-3" onClick={()=>{navigate('/about')}} style={{fontSize:16}}><span className="link">About US</span></Nav.Link>

                                    {
                                        isadmin ?(
                                            <Nav.Link id="admin"  className="mr-3 ml-3" onClick={()=>{navigate('/admin')}} style={{fontSize:16}}><span className="link">Admin</span></Nav.Link>
                                            
                                        ):(
                                            null
                                        )
                                    }
                                     {
                                        isadmin ?(
                                            <Nav.Link id="addroom"  className="mr-3 ml-3" onClick={()=>{navigate('/addroom')}}  style={{fontSize:16}} ><span className="link">Add Room</span></Nav.Link>
                                            
                                        ):(
                                            null
                                        )
                                    }
                                   


                        
                                    </Nav>

                                   
                                    {
                                        isauth ?(
                                            <Nav className="ml-3"style={{width:150}}>
                                                <NavDropdown className="mr-3 link"  title={user.name}  id="basic-nav-dropdown">
                                                <NavDropdown.Item onClick={handelprofile}  className="text-center" >profile <i className="fas fa-user-circle ml-2" style={{color:'blue'}}></i></NavDropdown.Item>
                                                <NavDropdown.Item onClick={handellogout}  className="text-center" >logout <i className="fas fa-sign-out-alt ml-2" style={{color:'red'}}></i></NavDropdown.Item>
                                             </NavDropdown>
                                            <Nav.Link className="mr-3 ml-3 justify-content-end link" id="Reservation" onClick={()=>{navigate('/Reservation')}} ><i className="fas fa-bookmark fa-2x	"></i></Nav.Link>
                                            
                                             {/* <Avatar className='text-black' style={{backgroundColor:'black' ,alignSelf:'center'}} alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
                                            </Nav>
                                        ):(
                                            <Nav style={{width:150}}>
                                                <button onClick={()=>{history.push('/login')}} className="ghost grow" id="signIn" >Sign In</button>
                                           </Nav>
                                        )
                                    }
                                   
                                    
                                </Navbar.Collapse>
                            </Navbar>
                            <br />
                            
                        </Router>
                    </div>
                </div>
    )
}

export default Header
