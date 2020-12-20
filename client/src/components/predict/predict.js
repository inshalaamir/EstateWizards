import React from 'react';
import axios from 'axios';

export default class Prediction extends React.Component{
    constructor(props){
        super(props)
        this.state={type:'House',location:'1',rooms:0,bathrooms:0,area:0,price:"0"}

    }

    fetchprice=async()=>{
      
        const config = {
          headers: {
          "Content-Type": "application/json"
          },
        };
        var type=''
        if(this.state.type=='House'){
            type='1'
        }
        else{
            type='0'
        }
        

        



        const location=this.state.location
        const rooms=this.state.rooms
        const bathrooms=this.state.bathrooms
        const area=this.state.area
        
        const body={inputt:[type,location,rooms,bathrooms,area]}
       
  
        const res=await axios.post("http://localhost:5000/predict",body,config)
        console.log(res.data);
        if(res.data.success){
          this.setState({price: res.data.price})
          
          
        }
        
  
      }

    handleChange = (e) =>{
      

        this.setState({[e.target.name] : e.target.value});
        
  
    }
  
    handleSubmit = (e) => {
        console.log(this.state)
        
        e.preventDefault();
        this.fetchprice()
  
    }
    increment = (e) => {
        const newCount = this.state.portions + 1 
        this.setState({portions: newCount })
      }
  
      incrementRoom = (e) => {
        const newCount = this.state.rooms + 1 
        this.setState({rooms: newCount })
      }
      incrementBathroom = (e) => {
        const newCount = this.state.bathrooms + 1 
        this.setState({bathrooms: newCount })
      }
  
      decrement = (e) => {
        if (this.state.portions>1){
          const newCount = this.state.portions - 1
          this.setState({portions: newCount})
        }
      }
      decrementRoom = (e) => {
        if (this.state.rooms>0){
          const newCount = this.state.rooms - 1
          this.setState({rooms: newCount})
        }
      }
      decrementBathroom = (e) => {
        if (this.state.bathrooms>0){
          const newCount = this.state.bathrooms - 1
          this.setState({bathrooms: newCount})
        }
      }

    render(){
        return(
            <div>
                
                <form onSubmit={this.handleSubmit}>

                   <div className="container mt-3">
                    <div className="form-group">
                        <label for="type">Choose property type: </label>
                        <select className="col-md-4"  name='type' value={this.state.type} onChange={this.handleChange}>
                            <option value="House">House</option>
                            <option value="Flat">Flat</option>
                        </select>
                       
                    </div>
                  
                    <div className="form-group">
                        <label for="type">Choose city: </label>
                        <select className="col-md-4" name='location' value={this.state.location} onChange={this.handleChange}>
                            <option value="1">Islamabad</option>
                            <option value="2">Rawalpindi</option>
                            <option value="3">Lahore</option>
                            <option value="4">Karachi</option>
                        
                         </select>
                       
                    </div>
                    <div className="container text-center mt-2">
                  <div className="row justify-content-center">
                    <label for="counter">Number of Rooms: </label>
                    <div className="input-group col-md-6" name="counter">
                    <input type="text" id="disabledTextInput" className="form-control" placeholder={this.state.rooms} disabled/>
                      <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" onClick={this.decrementRoom}>-</button>
                        <button className="btn btn-outline-secondary" type="button" onClick={this.incrementRoom}>+</button>
                      </div>
                    </div>
                  </div>
                
                
                  <div className="row justify-content-center mt-2">
                    <label for="counter">Number of Bathrooms: </label>
                    <div className="input-group col-md-6" name="counter">
                    <input type="text" id="disabledTextInput" className="form-control" placeholder={this.state.bathrooms} disabled/>
                      <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" onClick={this.decrementBathroom}>-</button>
                        <button className="btn btn-outline-secondary" type="button" onClick={this.incrementBathroom}>+</button>
                      </div>
                    </div>
                  </div>
                </div>

   
                <div className="row justify-content-center mt-2">
                  <label for="area">Area (In marla): </label>
                    <div className="input-group col-md-6" name="area">
                      <input className="form-control form-control-sm" name="area" value={this.state.area} type="number" placeholder="" onChange={this.handleChange}></input>
                    </div>
                  </div> 

                    <input type="submit" value="Submit" />


                    </div>

                </form>
                <div className="container">
                    <h1 className="text-success">Rs. {this.state.price}</h1>
                </div>
            </div>

          );


      }


}
