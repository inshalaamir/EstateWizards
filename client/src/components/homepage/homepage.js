import React,{useState} from 'react'
import { url } from "gravatar"
import "./homepage.css"
import { useHistory } from 'react-router-dom';
import { type } from "jquery";

const Homepage=()=>{
  const history = useHistory()

  const [fields, setfields] = useState({
    location:"Islamabad",
    type:"House"
});

  const onChange = (e) => {
    setfields({...fields, [e.target.name] : e.target.value})
  }

  const {location, type} = fields

    return(
      <div className="back">

       <div className="content">
         <h2 className="title">Estate Wizards</h2>
         <div className="row">
           <div className="col-md-5">
            <select name="type" value={type} id="inputState" className="form-control" onChange={(e) => onChange(e)}>
              <option value="House">House</option>
              <option value="Residential Plot">Residential Plot</option>
              <option value="Commercial Plot">Commercial Plot</option>
              <option value="Office">Office</option>
              <option value ="Flat/Apartment">Flat/Apartment</option>
              <option value="Shop">Shop</option>
            </select>
           </div>
            
            
           <div className="col-md-5">
           <select name="location" value={location} id="inputState" className="form-control" onChange={(e) => onChange(e)}>
              <option value="Islamabad">Islamabad</option>
              <option value="Lahore">Lahore</option>
              <option value="Karachi">Karachi</option>
              <option value="Peshawar">Peshawar</option>
              <option value ="Rawalpindi">Rawalpindi</option>
              <option value="Faisalabad">Faisalabad</option>
            </select>
           </div>

           <div className="col-md-2">
           <button className="btn btn-danger text-white search" onClick={() => history.push({pathname:'/displayads', state:{location: location, propertytype: type, type: "sell"  }})} >&nbsp;<i className="fas fa-search"></i></button>
           </div>
          </div>


         </div>
         
       </div>
       
    )
  }

export default Homepage