import React,{Component, useState} from 'react'
import { url } from "gravatar"
import { type } from "jquery";
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import "./placestostay.css"
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import {Link} from "react-router-dom";

export default class placestostay extends Component{
  
  constructor(props) {
    super(props);

    this.state= {
        location:"Islamabad", 
        startDate: null,
        endDate: null,
    }
    }
 
   onChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  nextPage = () => {
    
    this.props.history.push({pathname:"/displayhostings", 
    state:{
      location: this.state.location,
      startDate: this.state.startDate.toDate(),
      endDate: this.state.endDate.toDate()
    }  
  })
  }

  

  
render(){
    
    return(
      <div className="back">

       <div className="content" style={{width: '70%', height:'100%', margin:'auto', marginTop:'200px', justifyContent:'center', alignItems:'center'}} >
         <h2 className="title">Estate Wizards</h2>
         <div className="d-flex row justify-content-center" style={{width:"90%", margin:"auto"}}>
           <div className="col-md-3">
           <DateRangePicker
            startDate={this.state.startDate} // momentPropTypes.momentObj or null,
            startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
            endDate={this.state.endDate} // momentPropTypes.momentObj or null,
            endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
            small= {true}
            onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
            focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
            onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
            />
           </div>
            
            
           <div className="col-md-6">
           <select name="location" value={this.state.location} id="inputState" className="form-control placestostay__city" onChange={this.onChange}>
              <option value="Islamabad">Islamabad</option>
              <option value="Lahore">Lahore</option>
              <option value="Karachi">Karachi</option>
              <option value="Peshawar">Peshawar</option>
              <option value ="Rawalpindi">Rawalpindi</option>
              <option value="Faisalabad">Faisalabad</option>
            </select>
           </div>

           <div className="col-md-3">
            {/* <Link to={{ pathname:"/displayhostings", 
            state:{
              location: this.state.location,
              startDate: this.state.startDate,
              endDate: this.state.endDate
            }  
            }}> */}
           <button className="btn btn-danger text-white search placestostay__button" onClick={this.nextPage} >&nbsp;<i className="fas fa-search"></i></button>
           
           </div>
          </div>


         </div>
         
       </div>
       
    )
  }
}
