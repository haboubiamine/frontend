import React , {useEffect , useState} from 'react'
import axios from 'axios'
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { ToastContainer, toast } from 'react-toastify';


function Profile() {

    const user =JSON.parse(localStorage.getItem('user')) ;
    const url_api = "http://localhost:3001/"
    const token = localStorage.getItem('token')
    
    const [usser, setusser] = useState("")
    const [name, setname] = useState("")
    const [lastname, setlastname] = useState("")
    const [email, setemail] = useState("")
    const [phone, setphone] = useState()

    const [password, setpassword] = useState("")

    useEffect(() => {


        const getuser = async ()=>{
            const res = await axios({
                headers: {'Authorization': `Bearer ${token}`},
                method: 'get',
                url : url_api+"User/"+user._id,
                });
                if(res.status === 200 ){
                    setname(res.data.user.name)
                    setlastname(res.data.user.lastname)
                    setemail(res.data.user.email)
                    setphone(res.data.user.phone)
                }

                setTimeout(() => {
                     console.log(usser.name)
                }, 2000);
        }
        getuser()
    }, [])


    const handelupdate = async (e) =>{
        e.preventDefault();
        const data = {
            name : name,
            lastname : lastname ,
            email : email ,
            phone : phone ,
            password :password
        }
        
        const res = await axios({
            headers: {'Authorization': `Bearer ${token}`},
            method: 'put',
            url : url_api+"Auth/update/"+user._id,
            data 
            
            });
             if (res.status === 200) {
                toast(res.data.message, {
                  position: "top-right",
                  autoClose: 1500,
                  hideProgressBar: false,
                  closeOnClick: false,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  });
                  setTimeout(() => {
                    window.location.reload();
                  }, 1500);
              }
              else{
                toast.error(res.data.message, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  })
              }


              setpassword("")

    }


    return (
        <div style={{height:'80vh'}}>
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
            <div className="row col-12 justify-content-center">
                <div className="col-8 shadow mt-3">
                    <div className="row justify-content-center mt-3">
                            <Avatar alt={name} src="/static/images/avatar/1.jpg"  style={{width:120 , height:120}}/>
                    </div>

                    <div className="row justify-content-center">

                        <div className="col-7 align-items-center">
                        <TextField
                            placeholder={user.name}
                            value={name}
                            onChange={(e)=>{setname(e.target.value)}}
                            helperText="name"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            />
                        </div>

                        <div className="col-7 align-items-center">
                        <TextField
                            placeholder={user.lastname}
                            onChange={(e)=>{setlastname(e.target.value)}}
                            value={lastname}
                            helperText="lastname"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            />
                        </div>

                        <div className="col-7 align-items-center">
                        <TextField
                            placeholder={user.email}
                            onChange={(e)=>{setemail(e.target.value)}}
                            value={email}
                            helperText="email"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            />
                        </div>

                        <div className="col-7 align-items-center">
                         <TextField
                            placeholder={user.phone}
                            value={phone}
                            onChange={(e)=>{setphone(e.target.value)}}
                            helperText="phone"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            />
                            
                        </div>

                        <div className="col-7 align-items-center">
                         <TextField
                            placeholder="**********"
                            type="password"
                            helperText="password"
                            onChange={(e)=>{setpassword(e.target.value)}}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            />
                            
                        </div>

                        <div className="row col-12 justify-content-center mb-5">
                        <Button onClick={handelupdate} variant="contained" color="primary">Update</Button>
                        </div>
                    
                  
                    </div>
                   
                   
                </div>
            </div>
        </div>
    )
}

export default Profile
