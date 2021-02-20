import React , { useState , useEffect } from 'react'
import { useHistory } from "react-router-dom";
import $ from 'jquery'
import axios from 'axios'
import TextField from '@material-ui/core/TextField';
import image from './../images/homebackground.png'
function Adminres() {





    $("#myInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#table tr").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });










    const [search, setsearch] = useState("")
    const [reserv, setreserv] = useState([])
    const token = localStorage.getItem('token')
    const url_api = "http://localhost:3001/"
    const user =JSON.parse(localStorage.getItem('user')) ;

    useEffect(() => {

        const fetchreser = async ()=>{
            const res = await axios({
                headers: {'Authorization': `Bearer ${token}`},
                method: 'get',
                url : `${url_api}Reservation_h/admin`,
                
                });
                // console.log(res.data.Reservations)
                  setreserv(res.data.Reservations)
                 
        }
        
        fetchreser()
    }, [])

const handeldeleteres = async (id) =>{
    const res = await axios({
        headers: {'Authorization': `Bearer ${token}`},
        method: 'delete',
        url : `${url_api}Reservation_h/${id}`,
        
        });
        console.log(res.data.Reservation_id)
        if(res.status === 200){
            $("#"+res.data.Reservation_id).fadeOut(1500)
        }
         
    
}

    return (
        <div >
             <div className="row col-12 mt-5 justify-content-center" >
                
                <TextField value={search} id="myInput" onChange={(e)=>{setsearch(e.target.value)}} label="search" /> 
                            </div>
       
        <div className="col-12 d-flex justify-content-center" style={{height:'100vh'}}>
           
        <div  className="col-10" >
        <table className="table mt-5 border">
<thead style={{backgroundColor:"#1477AD"}}>
    <tr>
       
        <th className="text-center "style={{color:'white'}}>client</th>
        <th className="text-center "style={{color:'white'}}>phone number</th>
        <th className="text-center "style={{color:'white'}}>Room</th>
        <th className="text-center" style={{color:'white'}}>Prix</th>
        <th className="text-center" style={{color:'white'}}>nbr-nuit</th>
        <th className="text-center" style={{color:'white'}}>Start</th>
        <th className="text-center" style={{color:'white'}}>End</th>
        <th className="text-center" style={{color:'white'}}>prix total</th>
        <th className="text-center" style={{color:'white'}}>state</th>
        <th className="text-center" style={{color:'white'}}>action</th>
    </tr>
</thead>
<tbody id="table">
    
        
{
             reserv.map((res,index) => (
            <tr id={res._id} key={index} className="grow">
            <td className="text-center">{res.user.name} {res.user.lastname}</td>
            <td className="text-center">{res.user.phone}</td>
            <td className="text-center">{res.Room.Title}</td>
            <td className="text-center">{res.Room.Prix}</td>
            <td className="text-center">{res.nbr_nuit}</td>
            <td className="text-center">{res.startDate}</td>
            <td className="text-center">{res.endDate}</td>
            <td className="text-center">{res.prix_total}</td>
            {
                res.state === "active" ?(
                        <td className="text-center" style={{color:'green'}}>{res.state}</td>
                ):(
                    <td className="text-center" style={{color:'red'}}>{res.state}</td>
                )
            }
            
            <td className="text-center" onClick={()=>handeldeleteres(res._id)}><i className="fas fa-trash-alt" style={{color:'red'}}></i></td>
        </tr>
             ) )
 }
    
               
    </tbody>
</table>
</div>
</div>
</div>
    )
}

export default Adminres
