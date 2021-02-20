import React , { useState , useEffect ,Fragment } from 'react'
import { useHistory } from "react-router-dom";
import $ from 'jquery'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import { MDBBtn } from "mdbreact";




function Reservation() {

    const [reserv, setreserv] = useState([])
    const token = localStorage.getItem('token')
    const url_api = "http://localhost:3001/"
    const user =JSON.parse(localStorage.getItem('user')) ;

    const [canceledres, setcanceledres] = useState("")
    const [delcounter, setdelcounter] = useState(0)
    const [smShow, setSmShow] = useState(false);
    useEffect(() => {

        const fetchreser = async ()=>{
            const res = await axios({
                headers: {'Authorization': `Bearer ${token}`},
                method: 'get',
                url : `${url_api}Reservation_h/${user._id}`,
                
                });
                if(res.status === 200 ){
                    setreserv(res.data.Reservations)
                }
                 
                 
        }
        
        fetchreser()
    }, [])

    const handelcancelres = async () =>{
        const res = await axios({
            headers: {'Authorization': `Bearer ${token}`},
            method: 'PUT',
            url : `${url_api}Reservation_h/cancel/${canceledres}`,
            });
            console.log(res.data.updatedres.state)
            if(res.status === 200){
               $(`#${res.data.updatedres._id} #state`).text(res.data.updatedres.state).css('color','red')
               $(`#${res.data.updatedres._id} #del`).css('display','none')
               setSmShow(false)
            }
             
    }



    function sleep(ms) {
        return new Promise(
          resolve => setTimeout(resolve, ms)
        );
      }


      const showmodal = async (id)=>{
        setSmShow(true)
        setcanceledres(id)
        console.log(id)
        for (let index = 5; index >=0; index--) {
            setdelcounter(index)
            await sleep(1000);
        }
        if(delcounter === 0 ){
            setSmShow(false)
        }
    }

    return (
        
        <div className="col-12 d-flex justify-content-center" style={{height:'100vh'}} >
             <Modal
        size="md"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Body>
            <h4 className="text-center">are you sure you wonna cancel this reservation ?</h4>
            <div className="row justify-content-around mt-5" >
            <Fragment>
            <MDBBtn  onClick={()=>handelcancelres()} color="danger">cancel</MDBBtn>
      </Fragment>
            <button onClick={()=>{setSmShow(false)}} type="button" className="btn btn-light">close ({delcounter})</button>
            </div>
        
        </Modal.Body>
      </Modal>
            <div  className="col-10" >
            <table className="table mt-5 border">
    <thead style={{backgroundColor:"#1477AD"}}>
        <tr>
           
            
            <th className="text-center "style={{color:'white'}}>Room name</th>
            <th className="text-center" style={{color:'white'}}>Prix</th>
            <th className="text-center" style={{color:'white'}}>nbr-nuit</th>
            <th className="text-center" style={{color:'white'}}>Start</th>
            <th className="text-center" style={{color:'white'}}>End</th>
            <th className="text-center" style={{color:'white'}}>prix total</th>
            <th className="text-center" style={{color:'white'}}>state</th>
            <th className="text-center" style={{color:'white'}}>action</th>
        </tr>
    </thead>
    <tbody>
        
            
        {
             reserv.map((res,index) => (
                <tr id={res._id} key={index} className="grow border">
            <td className="text-center">{res.Room.Title}</td>
            <td className="text-center">{res.Room.Prix}</td>
            <td className="text-center">{res.nbr_nuit}</td>
            <td className="text-center">{res.startDate}</td>
            <td className="text-center">{res.endDate}</td>
            <td className="text-center">{res.prix_total}</td>
            {
                res.state === "active" ?(
                    <>
                        <td id="state" className="text-center" style={{color:'green'}}>{res.state}</td>
                        <td id="del" className="text-center" onClick={()=>showmodal(res._id)}><i className="fas fa-times" style={{color:'red'}}></i></td>
                        </>
                ):(
                    <td className="text-center" style={{color:'red'}}>{res.state}</td>
                )
            }
           
            </tr>
             )
             
             )
        }
            
        
                   
        </tbody>
    </table>
    </div>
</div>
    )
}

export default Reservation
