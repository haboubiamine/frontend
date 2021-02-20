import React ,{useState , useEffect , useRef} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios'
import $ from 'jquery'
import lottie from 'lottie-web'
import { useHistory } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel'
import bow from './../images/bow.jpg'
import image from './../images/logo.png'
import logo from './../images/logo_transparent.png'
import image1 from './../images/jard.jpg'
import image2 from './../images/resep.jpg'
import image3 from './../images/resto.jpg'
import './../css/logoanimation.css'
import svg from './../images/anime/logo2.svg'
import { requirePropFactory } from '@material-ui/core';
function Home() {

    const container = useRef(null)
    const token = localStorage.getItem('token')
    const user =JSON.parse(localStorage.getItem('user')) ;
    const url_api = "http://localhost:3001/"
    const [Rooms, setRooms] = useState([]);
    const history = useHistory();
    useEffect(() => {

     
      const fetchrooms = async ()=>{
          const res = await axios({
              headers: {'Authorization': `Bearer ${token}`},
              method: 'get',
              url : `${url_api}Room/2` ,
              
              });
              
               setRooms(res.data.Rooms)
               
      }


      const anim = () =>{
        lottie.loadAnimation({
          container: container.current, // the dom element that will contain the animation
          renderer: 'svg',
          loop: true,
          autoplay: true,
         animationData : require('./../images/anime/31454-food-prepared-food-app.json') // the path to the animation json
        });
      }
      anim()
      fetchrooms()
  }, [])



 
    return (

      <div id="home">
      
      <div  className="justify-content-center" style={{backgroundColor:'#f6f5f7',width:'100%',height:'100%'}}>
     

      <Carousel className="shadow" style={{height:600 , margin : 0}}>
  <Carousel.Item interval={1000}>
    <img
      className="d-block w-100"
      style={{height:600}}
      src={image1}
      alt="First slide"
    />
     <Carousel.Caption>
      <img src={logo} style={{height : 90}} />
    </Carousel.Caption>


  </Carousel.Item>
  <Carousel.Item interval={1000}>
    <img
      className="d-block w-100"
      style={{height:600}}
      src={image2}
      alt="Second slide"
    />
     <Carousel.Caption>
      <img src={logo} style={{height : 90}} />
    </Carousel.Caption>
  </Carousel.Item>

  <Carousel.Item interval={1000}>
    <img
      className="d-block w-100"
      style={{height:600}}
      src={image3}
      alt="Second slide"
    />
     <Carousel.Caption>
      <img src={logo} style={{height : 90}} />
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>


      <div className="container mt-5" style={{}}>  
      <h2 className="mt-5 mb-5 text-center" >WHY CHOOSE US</h2>
        <div className="col-12 row justify-content-center mt-5">
        

        {/* Palmyra Club Nabeul */}
              <div className="col-lg-3 col-sm-5 col-5 onlygrow card shadow-sm rounded mr-2 ml-2  " style={{height:170}}>
                 <div className="card-body text-center">
                 <i class="fas fa-lock fa fa-3x" style={{color:"green"}}></i>
                    <p className="mt-3 small cardtext">safety is our Number one priority</p>
                 </div>
              </div>

              <div className="col-lg-3 col-sm-5 col-5 onlygrow card shadow-sm rounded mr-2 ml-2 " style={{height:170}}>
                 <div className="card-body text-center">
                 <i class="fas fa-moon fa fa-3x" style={{color:"green"}}></i>
                    <p className="mt-3 small cardtext">Good Night Sleep Tight </p>
                 </div>
              </div>

              <div id="thercard" className="col-lg-3 col-sm-5 col-5 onlygrow card shadow-sm rounded mr-2 ml-2 " style={{height:170}}>
                 <div className="card-body text-center">
                 <i class="fas fa-money-bill fa-3x" style={{color:"green"}}></i>
                    <p className="mt-3 small cardtext">Our price will surprise you</p>
                 </div>
              </div>

             
        </div>


      
              
      </div>


     <div id="chevron" className="mt-5" style={{height : 300}}>


     <img id="svglogo" src={svg} className="img-fluid"   alt="logo"/>
     </div>



  <div className="col-12 row justify-content-center mb-5">
    <div className="container mb-5 shadow-lg mx-5  mx-lg-1 mx-sm-1 mx-md-1 border border-info">
          <h2 className="mt-5 mb-5 text-center" >Discover Our Offer</h2>

          <div className="row justify-content-center mb-5">
          {
             Rooms.map((room,index) => 


             <div id="room" className="col-lg-4 col-sm-6 col-9 mt-2 mb-2 grow" key={index} >
             <div className="card shadow rounded" style={{height:470}}>
                 <div onClick={()=>{history.push('/Room/'+room._id)}}> <img src={room.image_url} style={{width:'100%',height:'100%'}} className="img-responsive image"/> </div>
                 <div className="card-body">
                     <h5 className=" align-middle " style={{color:'#5d23ba'}}>{room.Title} </h5>
                     <i class="fas fa-user-friends mr-2" style={{color:'#5d23ba'}}></i><span id="nbr">{room.nbr_pl}</span>
                     <p className="card-text">{room.description}</p>
                     <span style={{fontSize:15}} className="card-text mb-5"><i class="fas fa-money-bill-wave mr-2" style={{color:'#119117'}}></i>TND </span><span id="pricetag" style={{fontSize:15}} className="card-text mb-5">{room.Prix}</span>
                 </div>
             </div>
         </div>
                
            
             )
         }
         </div>
              <div className="row justify-content-center">
              <button onClick={()=>{history.push('/Rooms')}} className="mb-5 grow text-center">see more <i class="fas fa-arrow-right" style={{color:'white'}}></i></button>
              </div>
         
         </div>
        </div>


        
        
        {/* <div className="container mb-5">
            <div className="row justify-content-center mt-5 ">
                <h1>Activity</h1>

              <div className="col-12 row" style={{backgroundColor : "#1477AD" , width:'100%' , height:500}}>
               
                  <div className="col-4 shadow" style={{width:'100%', height:300}}>
                    <img src={bow} style={{width:'100%', height:'100%'}}  alt="1"/>
                  </div>
                  <div className="col-3">
                    b
                  </div>

                  <div className="col-4">
                    c
                  </div>

              </div>

          </div>
         </div> */}
        


      </div>
      </div>
      
    )
}

export default Home

