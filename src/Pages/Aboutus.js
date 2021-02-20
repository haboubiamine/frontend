import React from 'react'

window.addEventListener('resize', ()=>{
    console.log(window.innerWidth)

});


function Aboutus() {
    return (
        <div className="mb-5" style={{height:"100vh" }} >
            <div className="container mb-5 mt-5">
                    <h1 className="display-4 mb-5 text-center">Palmyra Club Nabeul</h1>
                    <div className="row col-12">

                        <div className="col-lg-6 col-md-12 col-sm-12 col-12"><ul className=" list-style mb-2">
                            <li className="mt-5">Located in Nabeul,features a restaurant, seasonal outdoor swimming pool, bar and garden. All rooms include satellite TV and a private bathroom. Evening entertainment is organized</li>
                            <li className="mt-3">All rooms at this hotel have a balcony with a view of the garden. They also include air conditioning and a wardrobe</li>
                            <li className="mt-3">Every morning you can enjoy a buffet breakfast.</li>
                            <li className="mt-3">Palmyra Club Nabeul is 1.2 km from Neapolis Museum. The nearest Enfidha-Hammamet International Airport is 50 km away</li>
                            <li className="mt-3">Guests can enjoy a children's playground during their stay. Car rental service is provided. You can play darts and table tennis on site</li>
                        </ul>
                        </div>


                        <div className="col-lg-6 col-md-12 col-sm-12 col-12 mt-5 mb-5">
                        <iframe id="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3209.5794794020967!2d10.748115115354523!3d36.44354988002349!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1302999da7d0c03f%3A0xda3c7c12c50bb702!2sPalmyra%20Club%20Nabeul!5e0!3m2!1sfr!2stn!4v1613781779645!5m2!1sfr!2stn" width="500" height="450"  allowfullscreen="" loading="lazy"></iframe>

                        </div>
                        
                        </div>

                    <h1 className="display-4 mb-5">Our Services</h1>
                    <div className = "  justify-content-center"> 
                            <div className="col-xl-12 row" >



                                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 mb-5">
                                <p className="h6"><i className="fas fa-utensils fa-1x mr-3"></i>Restauration</p>
                                <ul className="list-unstyled">
                                    <li><i class="fas fa-check-circle mr-2" style={{color:"#789FD2"}}></i><span>Snack-bar</span></li>
                                    <li><i class="fas fa-check-circle mr-2" style={{color:"#789FD2"}}></i><span>Bar</span></li>
                                    <li><i class="fas fa-check-circle mr-2" style={{color:"#789FD2"}}></i><span>Restaurant</span></li>
                                </ul>
                                </div>

                                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 mb-5">
                                <p className="h6"><i className="fas  fa-lock fa-1x mr-3"></i>Security</p>
                                <ul className="list-unstyled">
                                    <li><i class="fas fa-check-circle mr-2" style={{color:"#789FD2"}}></i><span>Fire extinguishers</span></li>
                                    <li><i class="fas fa-check-circle mr-2" style={{color:"#789FD2"}}></i><span>Security alarm</span></li>
                                    <li><i class="fas fa-check-circle mr-2" style={{color:"#789FD2"}}></i><span>24 hour security</span></li>
                                </ul>
                                </div>

                                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 mb-5">
                                <p className="h6"><i className="fas fa-concierge-bell fa-1x mr-3"></i>Services</p>
                                <ul className="list-unstyled">
                                    <li><i class="fas fa-check-circle mr-2" style={{color:"#789FD2"}}></i><span>Daily maid service</span></li>
                                    <li><i class="fas fa-check-circle mr-2" style={{color:"#789FD2"}}></i><span>Car rental</span></li>
                                    <li><i class="fas fa-check-circle mr-2" style={{color:"#789FD2"}}></i><span>Souvenir / gift shop</span></li>
                                    <li><i class="fas fa-check-circle mr-2" style={{color:"#789FD2"}}></i><span>Currency exchange service</span></li>
                                </ul>
                                </div>


                                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                                <p className="h6"><i className="fas fa-spa fa-1x mr-3"></i>Well-being</p>
                                <ul className="list-unstyled">
                                    <li><i class="fas fa-check-circle mr-2" style={{color:"#789FD2"}}></i><span>Spa</span></li>
                                    <li><i class="fas fa-check-circle mr-2" style={{color:"#789FD2"}}></i><span>Sun loungers or beach chairs</span></li>
                                    <li><i class="fas fa-check-circle mr-2" style={{color:"#789FD2"}}></i><span>Sauna</span></li>
                                    <li><i class="fas fa-check-circle mr-2" style={{color:"#789FD2"}}></i><span>Fitness classes</span></li>
                                    <li><i class="fas fa-check-circle mr-2" style={{color:"#789FD2"}}></i><span>Hot tub / jacuzzi</span></li>
                                </ul>
                                </div>

                                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                                <p className="h6"><i className="fas fa-concierge-bell fa-1x mr-3"></i>Activities</p>
                                <ul className="list-unstyled">
                                    <li><i class="fas fa-check-circle mr-2" style={{color:"#789FD2"}}></i><span>Beach</span></li>
                                    <li><i class="fas fa-check-circle mr-2" style={{color:"#789FD2"}}></i><span>Tennis equipment</span></li>
                                    <li><i class="fas fa-check-circle mr-2" style={{color:"#789FD2"}}></i><span>Evening entertainment</span></li>
                                    <li><i class="fas fa-check-circle mr-2" style={{color:"#789FD2"}}></i><span>Kids club</span></li>
                                    <li><i class="fas fa-check-circle mr-2" style={{color:"#789FD2"}}></i><span>Disco / DJ</span></li>
                                    <li><i class="fas fa-check-circle mr-2" style={{color:"#789FD2"}}></i><span>Horse riding Outside the establishment</span></li>
                                    <li><i class="fas fa-check-circle mr-2" style={{color:"#789FD2"}}></i><span>Table tennis</span></li>
                                    <li><i class="fas fa-check-circle mr-2" style={{color:"#789FD2"}}></i><span>Golf course (less than 3 km)</span></li>
                                </ul>
                                </div>

                                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                                <p className="h6"><i className="fas fa-leaf fa-1x mr-3"></i>Outdoors</p>
                                <ul className="list-unstyled">
                                    <li><i class="fas fa-check-circle mr-2" style={{color:"#789FD2"}}></i><span>Outdoor furniture</span></li>
                                    <li><i class="fas fa-check-circle mr-2" style={{color:"#789FD2"}}></i><span>Private beach</span></li>
                                    <li><i class="fas fa-check-circle mr-2" style={{color:"#789FD2"}}></i><span>Garden</span></li>
                                </ul>
                                </div>


                               

                                

                                












                                
                            </div>
                    </div>
            </div>
        </div>
    )
}

export default Aboutus
