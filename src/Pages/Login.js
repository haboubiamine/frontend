import React,{useState} from 'react'
import $ from 'jquery'
import {useDispatch} from 'react-redux';
import {setLoginStatus} from './../redux/actions/authAction';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from './../images/logo_transparent.png'



function Login() {
	
  
    const singIN = () =>{
			$('#container').removeClass('right-panel-active');		
    }
    const singUP = () =>{
			$('#container').addClass('right-panel-active');		
    }


	const dispatch = useDispatch();
 	const dispatchState = (token,user) => dispatch(setLoginStatus(token, user));

 const [logininfo, setlogininfo] = useState({
	 email :"",
	 password : ""
 })

 const [singupinfo, setsingupinfo] = useState({
	name :"",
	lastname:"",
	email:"",
	password:"",
	phone : ""
 })



// sing_in_form
const setemail = e => {
	setlogininfo(prevState => ({
		...prevState,
		email: e.target.value
	}));
};
const setpassword = e => {
	setlogininfo(prevState => ({
		...prevState,
		password: e.target.value
	}));
};

// sing_up_form

const setname = e => {
	setsingupinfo(prevState => ({
		...prevState,
		name: e.target.value
	}));
};

const setlastname = e => {
	setsingupinfo(prevState => ({
		...prevState,
		lastname: e.target.value
	}));
};

const setphone = e => {
	setsingupinfo(prevState => ({
		...prevState,
		phone: e.target.value
	}));
};

const setsingup_email = e => {
	setsingupinfo(prevState => ({
		...prevState,
		email: e.target.value
	}));
};

const setsingup_password = e => {
	setsingupinfo(prevState => ({
		...prevState,
		password: e.target.value
	}));
};

 const handellogin = e =>{
	e.preventDefault();
	     axios.post('http://localhost:3001/Auth/login',logininfo)
    .then(function (response) {
	  // handle success 
	//   console.log(response)
	  if(response.status === 201){
		toast.error(response.data.message, {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			})
	  }
      
    if (response.status === 200) {
        dispatchState(response.data.token,JSON.stringify(response.data.user));
        window.setTimeout(() => {
            window.location.replace("/");
          }, 1500);
    }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
 }

 const handelsingup = e =>{
	e.preventDefault();
	 console.log(singupinfo)
	     axios.post('http://localhost:3001/user/singup',singupinfo)
    .then(function (response) {
      // handle success
      console.log(response);

    if (response.status === 200) {
		toast('your account has been created try the sing in', {
			position: "top-right",
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: false,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			});

			setTimeout(() => {
				$('#container').removeClass('right-panel-active')
			}, 1500);
	}
	else{
		toast.error(response.data.message, {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			})
	}
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
 }



    return (
		<body>
        <div >
     <ToastContainer
		position="top-right"
		autoClose={2000}
		hideProgressBar={false}
		newestOnTop={true}
		closeOnClick={false}
		rtl={false}
		pauseOnFocusLoss
		draggable
		pauseOnHover
		/>
<div className="login-container" id="container">
	<div className="form-container sign-up-container">
		<form >
			<h1>Create Account</h1>
			<input className="mb-3" type="text" placeholder="Name"
			value={singupinfo.name}
			onChange={setname}
			required
			 />
			<input className="mb-3" type="text" placeholder="LastName" 
			value={singupinfo.lastname}
			onChange={setlastname}
			required
			/>
			<input className="mb-3" type="text" placeholder="phone"
			value={singupinfo.phone}
			onChange={setphone}
			required
			 />
			<input className="mb-3" type="email" placeholder="Email" 
			value={singupinfo.email}
			onChange={setsingup_email}
			required
			/>
			<input className="mb-3" type="password" placeholder="Password" 
			value={singupinfo.password}
			onChange={setsingup_password}
			required
			/>
			<button className="grow" onClick={handelsingup}>Sign Up</button>
		</form>
	</div>
	<div className="form-container sign-in-container">
		<form >
			<h1>Sign in</h1>
			<input className="mb-3" type="email" placeholder="Email"
				value={logininfo.email}
				onChange={setemail}
				required={true}
			/>
			<input type="password" placeholder="Password"
				value={logininfo.password} 
				onChange={setpassword}
				required={true}
			 />
			<button className="grow mt-3" onClick={handellogin}>Sign In</button>
		</form>
	</div>
	<div className="overlay-container">
		<div className="overlay">
			<div className="overlay-panel overlay-left">
				{/* <h1>Welcome Back!</h1> */}
				<img src={logo} style={{width : 250 , height :100 , marginBottom :25}}/>
				<p>To keep connected with us please login with your personal info</p>
				<button className="ghost grow" id="signIn" onClick={singIN}>Sign In</button>
			</div>
			<div className="overlay-panel overlay-right">
				{/* <h1>Palmyra Hotel</h1> */}
					<img src={logo} style={{width : 250 , height :100 , marginBottom :25}}/>	
				<p>Enter your personal details and start journey with us</p>
				<button className="ghost grow"  id="signUp" onClick={singUP}>Sign Up</button>
			</div>
		</div>
	</div>
</div>

</div>
</body>
    )
}

export default Login
