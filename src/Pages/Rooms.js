import React , { useState , useEffect ,Fragment } from 'react'
import { useHistory } from "react-router-dom";
import $ from 'jquery'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import { MDBBtn } from "mdbreact";
import TextField from '@material-ui/core/TextField';

function Rooms() {
  
    // window.addEventListener('scroll', function(e) {
    //   const  Y = window.scrollY;
    //   $("#addbutton").animate({ 
    //     bottom:`-=${Y}px`,
    //   },.1 );
     
    //     console.log(Y)
    // })
    

    $("#minprice").on("keyup", function() {
        var min =parseInt($(this).val().toLowerCase(), 10); 
        var max =parseInt($("#maxprice").val().toLowerCase(), 10); 
        if($(this).val().toLowerCase() === "" && $("#maxprice").val().toLowerCase() ===""){
            $("#Room_box .room").filter(function() {
                $(this).toggle(true)
              });
            
        }else if($(this).val().toLowerCase() === ""){
            $("#Room_box .room").filter(function() {
                $(this).toggle(parseInt($(this).find('#pricetag').text().toLowerCase(), 10)  <= max)
              });
            
        }else if($("#maxprice").val().toLowerCase() ==="") {
            $("#Room_box .room").filter(function() {
                $(this).toggle(parseInt($(this).find('#pricetag').text().toLowerCase(), 10) >= min)
              });
        }else{
            $("#Room_box .room").filter(function() {
                $(this).toggle(parseInt($(this).find('#pricetag').text().toLowerCase(), 10)  >= min && parseInt($(this).find('#pricetag').text().toLowerCase(), 10)  <= max)
              });
        }
        
      });


      $("#maxprice").on("keyup", function() {
        var max =parseInt($(this).val().toLowerCase(), 10);
        var min =parseInt($("#minprice").val().toLowerCase(), 10); 
        if($(this).val().toLowerCase() === "" && $("#minprice").val().toLowerCase() ===""){
            $("#Room_box .room").filter(function() {
                $(this).toggle(true)
              });
            
        }
        else if($(this).val().toLowerCase() === ""){
            $("#Room_box .room").filter(function() {
                $(this).toggle(parseInt($(this).find('#pricetag').text().toLowerCase(), 10)  >= min)
              });
            
        }else if($("#minprice").val().toLowerCase() ==="") {
            $("#Room_box .room").filter(function() {
                $(this).toggle(parseInt($(this).find('#pricetag').text().toLowerCase(), 10) <= max)
              });
        }else{
            $("#Room_box .room").filter(function() {
                $(this).toggle(parseInt($(this).find('#pricetag').text().toLowerCase(), 10)  >= min && parseInt($(this).find('#pricetag').text().toLowerCase(), 10)  <= max)
              });
        } 
      });

      
      window.addEventListener('resize', ()=>{
        //   console.log(window.innerWidth)
          if(window.innerWidth <= 576){
              $('#Room_box').addClass('justify-content-around')
          }
          else{
            $('#Room_box').removeClass('justify-content-around')
          }
      });

    const [delcounter, setdelcounter] = useState(0)
    const [deltedroomname, setdeltedroomname] = useState("")
    const [deletedroomid, setdeletedroomid] = useState("")
    const [smShow, setSmShow] = useState(false);
    const [nbr_p, setnbr_p] = useState()
    const [pricemin, setpricemin] = useState(0)
    const [pricemax, setpricemax] = useState(1000)
    const history = useHistory();
    const [isadmin, setisadmin] = useState(false)
    const [Rooms, setRooms] = useState([]);
    const token = localStorage.getItem('token')
    const url_api = "http://localhost:3001/"
    useEffect(() => {

        const admin =()=>{
            const user =JSON.parse(localStorage.getItem('user')) ;
            if(user){
        if(user.role === "admin"){
            setisadmin(true)
        }
    }
        }

        const fetchrooms = async ()=>{
            const res = await axios({
                headers: {'Authorization': `Bearer ${token}`},
                method: 'get',
                url : url_api+"Room",
                
                });
                
                 setRooms(res.data.Rooms)
                 
        }
        admin()
        fetchrooms()
    }, [])

function sleep(ms) {
    return new Promise(
      resolve => setTimeout(resolve, ms)
    );
  }

const showmodal = async (name ,id)=>{
    setSmShow(true)
    setdeltedroomname(name)
    setdeletedroomid(id)
    // console.log(name)
    // console.log(id)
    for (let index = 5; index >=0; index--) {
        setdelcounter(index)
        await sleep(1000);
    }
    if(delcounter === 0 ){
        setSmShow(false)
    }
}


const deleteRoomhandler = async () =>{
    const res = await axios({
        headers: {'Authorization': `Bearer ${token}`},
        method: 'delete',
        url : `${url_api}Room/${deletedroomid}`,
        
        });
        console.log(res)
        setSmShow(false)
        if(res.status === 200){
            $("#"+res.data.Room_id).fadeOut(1500)
        }
        
}

    return (
        
        <div className="mt-5">
        <Modal
        size="md"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Body>
            <h4 className="text-center">are you sure you wonna delete</h4>
            <h4 className="text-center">{deltedroomname} </h4>
            <div className="row justify-content-around mt-5" >
            <Fragment>
            <MDBBtn onClick={deleteRoomhandler} color="danger">Delete</MDBBtn>
      </Fragment>
            <button onClick={()=>{setSmShow(false)}} type="button" className="btn btn-light">close ({delcounter})</button>
            </div>
        
        </Modal.Body>
      </Modal>
      
      {/* Filter */}
        <div className="col-12  justify-content-center flex-column mb-5"  >

        <div className="col-12 d-flex justify-content-center" >
                <div className="shadow card" style={{height:100}}>

                                <div className=" flex-row justify-content-center" style={{width:'100%'}} >
                                    <h3 className="text-center">Filter by Price</h3>
                                    {/* <h6 className="text-center">price range</h6> */}
                                    {/* <input type="text" id="minprice" className=" text-center"  value={pricemin} placeholder="min"  style={{width:'40%',marginRight:20 ,marginLeft:20}} onChange={(e)=>{setpricemin(e.target.value)}}/>-
                                    <input type="text" id="maxprice" className="text-center" value={pricemax} placeholder="max"  style={{width:'40%' ,marginLeft:30, marginRight:10}} onChange={(e)=>{setpricemax(e.target.value)}}/>
                                 */}
                                <TextField
                                    id="minprice"
                                    label="Min"
                                    variant="outlined"
                                    defaultValue={pricemin}
                                    
                                />
                                <TextField
                                    id="maxprice"
                                    label="Max"
                                    variant="outlined"
                                    defaultValue={pricemax}
                                    
                                />
                                </div>


                </div>
            </div>
            
        
     <div id="Room_box" className="row col-xl-12 col-lg-11 col-md-12 col-sm-12 col-12 ml-2 justify-content-center   mt-5 mb-5" style={{height:'100vh', marginBottom : 250}}>

         {
             Rooms.map((room,index) => 


             <div id={room._id} className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-10 mt-2 mb-4 grow room" key={index} >
                 {
                     isadmin ?(
                        <i onClick={()=>showmodal(room.Title,room._id)} className="fas fa-trash-alt fa-1x grow" style={{position:'absolute' , top:10, left:20 ,zIndex:1 , color:"red"}}></i>
                     ):(
                         null
                     )
                 }
                
             <div className="card shadow rounded" style={{height:450}}>
                 <div onClick={()=>{history.push('/Room/'+room._id)}}> <img src={room.image_url} style={{width:'100%',height:'100%'}} className="img-responsive image"/> </div>
                 <div className="card-body mt-2">
                     <h5 className=" align-middle " style={{color:'#5d23ba'}}>{room.Title} </h5>
                     <i className="fas fa-user-friends mr-2 mb-2" style={{color:'#5d23ba'}}></i><span id="nbr">{room.nbr_pl}</span>
                     <p className="card-text">{room.description}</p>
                     <span style={{fontSize:15}} className="card-text mt-5 "><i className="fas fa-money-bill-wave mr-2" style={{color:'#119117'}}></i>TND </span><span id="pricetag" style={{fontSize:15}} className="card-text mb-5">{room.Prix}</span>
                 </div>
             </div>
         </div>
                
            
             )
         }
        
         
     </div>



     {/* <div id="" className="row col-lg-2 col-md-2 col-sm-2  mt-5 large-filter" style={{height:'70vh'}}>
            <div className="card shadow" style={{width:'100%'}} >
                <h4 className="text-center">Filter by</h4>
            <hr/>
                <div className="price range">
                    <h6 className="text-center">price range</h6>
                    <input type="text" id="minprice" className=" text-center"  value={pricemin} placeholder="min"  style={{width:'40%' , height:"20" , marginRight:5,marginLeft:15}} onChange={(e)=>{setpricemin(e.target.value)}}/>-
                    <input type="text" id="maxprice" className="text-center" value={pricemax} placeholder="max"  style={{width:'40%' , height:"20",marginLeft:10}} onChange={(e)=>{setpricemax(e.target.value)}}/>
                </div>
                <hr/>


               
            
                <div className="price range justify-content-center">
                    <h6 className="text-center">number of personne</h6>
                    <input type="text"  id="nbr_p" className=" text-center"  value={nbr_p} placeholder="0"  style={{width:'40%' , height:"20" , marginLeft:'30%'}} onChange={(e)=>{setnbr_p(e.target.value)}}/>
                  
                </div>
                <hr/>
            </div>
     </div> */}
     




       

 </div>
 
  
</div>
    )
}

export default Rooms
