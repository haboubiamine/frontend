import React , { useState , useEffect } from 'react'
import $ from 'jquery'
import axios from 'axios'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBContainer } from "mdbreact";


function Oneroom(props) {

    const [Title, setTitle] = useState("");
    const [prix, setprix] = useState(0);
    const [description, setdescription] = useState("");
    const [nbr_place, setnbr_place] = useState(0);




    const [isauth, setisauth] = useState(false)
    const [isadmin, setisadmin] = useState(false)
    const [modal, setmodal] = useState(false)
    const history = useHistory();
    const [startDate, setStartDate] = useState(Date.now());
    const [endDate, setendDate] = useState(Date.now());
    const room_id = props.match.params.id
    const [room, setroom] = useState({})
    const token = localStorage.getItem('token')
    const url_api = "http://localhost:3001/"

    useEffect(() => {
        const fetchroom = async ()=>{
            const res = await axios({
                headers: {'Authorization': `Bearer ${token}`},
                method: 'get',
                url : url_api+"Room/"+room_id,
                
                });
                console.log(res)
                if(res.status === 201){
                    window.location.replace("/Rooms");
                }
                else{
                    setroom(res.data.Room)
                }
                
        }
        const admin =()=>{
            const user =JSON.parse(localStorage.getItem('user')) ;
            if(user){
        if(user.role === "admin"){
            setisadmin(true)
        }
    }
        }

        const auth =()=>{
            const user =JSON.parse(localStorage.getItem('user')) ;
            if(user){setisauth(true) }
        }
       
        fetchroom()
        auth()
        admin()
        
    }, [])


    const  toggle = () => {
        setmodal(!modal)
      }


    const handelbooking = async (e) => {

        $('.bookingbtn').attr("disabled",true);
        setTimeout(() => {
            $('.bookingbtn').attr("disabled",false);
        }, 5000);
        e.preventDefault();
        const data = {
            startDate :startDate,
            endDate : endDate,
            room_id : room_id,
        }
        const res = await axios({
            headers: {'Authorization': `Bearer ${token}`},
            method: 'post',
            url : url_api+"Reservation_h/add",
            data
            });
             console.log(res)
             if (res.status === 200) {
                toast.success('Room Booked ', {
                  position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: false,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  });
              }
           
    }

      const handelupdateroom =  async (e) =>{
        e.preventDefault();
        const data = {}
    if(Title !== ""){
        data.Title = Title
    }
    else{
        data.Title = room.Title
    }

    if(prix !== 0){
        data.Prix = prix
    }
    else{
        data.Prix = room.Prix
    }

    if(description !== ""){
        data.description = description
    }
    else{
        data.description = room.description
    }

    if(nbr_place !== 0){
        data.nbr_pl = nbr_place
    }
    else{
        data.nbr_pl = room.nbr_pl
    }
    const res = await axios({
        headers: {'Authorization': `Bearer ${token}`},
        method: 'put',
        url : url_api+"Room/update/"+room_id,
        data
        });
        if (res.status === 200) {
            toast.success(res.data.message, {
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
              
          }else{
            toast.error(res.data.message, {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
          }
        
    
    }


    const handelupdateimg = async (e) =>{
        e.preventDefault();
        const file =  document.getElementById('image').files
        const formData = new FormData();
        formData.append('myImage',document.getElementById('image').files[0]);
        const res = await axios({
            headers: {'Authorization': `Bearer ${token}`},
            method: 'put',
            url : url_api+"Room/update/images/"+room_id,
            data : formData
            });
            if (res.status === 200) {
                toast.success(res.data.message, {
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
                  
              }else{
                toast.error(res.data.message, {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
              }
    }

    return (
        <div>

<div>
        <MDBContainer>
        
        
        {/* MODAL */}
        <MDBModal isOpen={modal}   backdrop={false} fullHeight  side position="right">
          <MDBModalBody>
          <form   id="addroom" style={{width:'100%' ,  backgroundColor:"white" }}  >
        <p>update image only</p>
         <div className="form-group ml-2">
                <input type="file" name="myImage" id="image" className="form-control text-center" multiple />
                </div>
                <MDBBtn  onClick={handelupdateimg} color="primary">update image</MDBBtn>
                <div className="mt-3 mb-3" style={{width:'100%' ,backgroundColor:'#6b6a6a' , height :1}}></div>

              <div className="row justify-content-center " style={{width:'100%'}}>

                  <hr></hr>
              <div className="form-group">
                  <label>Titre</label>
                  <input type="text" placeholder={room.Title} className="form-control text-center" value={Title} id="title" onChange={(e)=>{setTitle(e.target.value)}} required/>
                </div>
                <div className="form-group">
                  <label >Prix</label>
                  <input type="text" placeholder={room.Prix} className="form-control text-center" id="prix"    onChange={(e)=>{setprix(e.target.value)}}/>
                </div>
                <div className="form-group">
                  <label >number de place</label>
                  <input type="number" placeholder={room.nbr_pl}  className="form-control text-center" id="number"   onChange={(e)=>{setnbr_place(e.target.value)}}/>
                </div>
               
              
              </div>
              <label >description</label>
                <textarea id="w3review" className="border text-center" placeholder={room.description} name="w3review" rows="4" cols="38"  value={description} onChange={(e)=>{setdescription(e.target.value)}}></textarea>
                
             
            </form>
          </MDBModalBody>
          <MDBModalFooter className="justify-content-around">
            <MDBBtn  onClick={handelupdateroom} color="primary">update</MDBBtn>
            <MDBBtn color="danger" onClick={toggle}>Close</MDBBtn>
            
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
      </div>
       
        
             <div className="col-lg-12 d-flex mt-3 justify-content-center">



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
                <div className="row col-lg-6 ">
                    {
                        isadmin ?(
                            <i onClick={toggle} class="far fa-edit fa-1x grow" style={{position:'absolute', zIndex:1,top:10,right:20,color:"blue"}}></i>
                        ):(
                            null
                        )
                    }
                
                <div className="card shadow rounded">
                 <div> <img src={room.image_url} style={{width:'100%',height:'100%'}} alt="" className="img-responsive image"/> </div>
                 <div className="card-body">
                     <h5 className=" align-middle"style={{color:'#5d23ba'}}>{room.Title} </h5>
                     <i class="fas fa-user-friends mr-2" style={{color:'#5d23ba'}}></i><span>{room.nbr_pl}</span>
                     <p className="card-text">{room.description}</p>
                     <p className="card-text"><i class="fas fa-money-bill-wave mr-2" style={{color:'#119117'}}></i>TND {room.Prix}</p>
                 </div>
                    </div>

            <div className="card shadow rounded align-items-center col-lg-12 mt-3 mb-5" style={{width : '100%'}}>
        
                
              
                {
                        isauth ?(
                            <div className="row ">
                            <h6 className="text-center align-self-center mr-3">from</h6>
                            <DatePicker   selected={startDate} onChange={date => setStartDate(date)} />
            
                            <h6 className="text-center align-self-center ml-3 mr-3">to</h6>
                            <DatePicker   selected={endDate} onChange={date => setendDate(date)} />
            

                            <MDBBtn className="bookingbtn" onClick={handelbooking}  color="primary">Book</MDBBtn>
                            </div>
                            
                        ):(
                            <MDBBtn onClick={()=>{history.push('/login')}}  color="primary">Sing in</MDBBtn>
                            
                        )
                    }
                    
               
                
             

               
              
               
                
                
              
                    </div>
                </div>


               

                </div>
            </div>
    )
}

export default Oneroom
