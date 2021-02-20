import React,{useState} from 'react'
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import image from './../images/homebackground.png'







function AddRoom() {

  const [Title, setTitle] = useState("");
  const [prix, setprix] = useState();
  const [description, setdescription] = useState("");
  const [nbr_place, setnbr_place] = useState(0);
  const token = localStorage.getItem('token')
  const url_api = "http://localhost:3001/"


  

  const handeladdroom =  async (e) =>{
    e.preventDefault();
    const file =  document.getElementById('image').files
    const formData = new FormData();
    formData.append('myImage',document.getElementById('image').files[0]);
    formData.append('Title',Title);
    formData.append('Prix',prix);
    formData.append('nbr_pl',nbr_place);
    formData.append('description',description);
  // formData.append('name',"haboubi")
  // console.log(formData.get('name'))
  // console.log(formData.get('myImage'))
    setTitle("")
    setdescription("")
    setprix()
    setnbr_place()

    const data ={
      Title  : formData.get('Title'),
      Prix  : formData.get('Prix'),
      nbr_pl : formData.get('nbr_pl'),
      description : formData.get('description'),
      file : formData.get('myImage'),
    }


    // console.log(data)

    const res = await axios({
      headers: {'Authorization': `Bearer ${token}`},
      method: 'post',
      url : url_api+"Room/add",
      data : formData
      
      });
       console.log(res)
       if (res.status === 200) {
        toast('Room created ', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
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
     
    
   }

  


    return (
        <div className="col-12 d-flex justify-content-center" style={{height:'100%' , backgroundImage : `url(${image})` , width:'100%' , backgroundRepeat : 'no-repeat', backgroundSize:'100%'}} >
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
            <div className="row col-8 mt-5  shadow border" style={{height:'60vh',backgroundColor:"#f6f5f7"}}>
              <form   id="addroom" style={{width:'100%' ,  backgroundColor:"#f6f5f7" }}  >
              <div className="row ">
              <div className="form-group mr-2">
                  <label>Titre</label>
                  <input type="text" placeholder="titre" className="form-control text-center" value={Title} id="title" onChange={(e)=>{setTitle(e.target.value)}} required/>
                </div>
                <div className="form-group ml-2">
                  <label >Prix</label>
                  <input type="text" placeholder="prix" className="form-control text-center" id="prix"  value={prix}  onChange={(e)=>{setprix(e.target.value)}}/>
                </div>
              </div>

              <div className="row ">
              <div className="form-group mr-2">
                  <label >number de place</label>
                  <input type="number" value={nbr_place} min={0} className="form-control text-center" id="number"  value={nbr_place}  onChange={(e)=>{setnbr_place(e.target.value)}}/>
                </div>
                <div className="form-group ml-2">
                <label >Choose photo</label>
                <input type="file" name="myImage" id="image" className="form-control text-center" multiple />
                </div>
              </div>
              <label >description</label>
                <textarea id="w3review" className="border text-center" placeholder="description" name="w3review" rows="4" cols="80"  value={description} onChange={(e)=>{setdescription(e.target.value)}}></textarea>
                <button onClick={handeladdroom}  className="mt-3">add</button>
            </form>
            </div>
        </div>
        
       
      
    )
}

export default AddRoom
