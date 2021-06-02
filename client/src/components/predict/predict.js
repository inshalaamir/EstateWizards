import React from 'react';
import axios from 'axios';
import MapGL, {Marker, NavigationControl} from 'react-map-gl';
import ReactMapGL from 'react-map-gl'
import Geocoder from 'react-mapbox-gl-geocoder';
import Pin from '../sell/map/pin.js'
import { Container, Col, Row } from 'reactstrap';
import { Alert } from 'reactstrap';
import "./predict.css"
import { BlockLoading } from 'react-loadingg';


const locations={
  Islamabad:[33.6938118,73.0651511],
  Rawalpindi:[33.5914237,73.0535122],
  Lahore:[31.520370,74.358749],
  Lahore:[31.520370,74.358749],
 
}



const params = {
  country: "pk"
}

const TOKEN = 'pk.eyJ1Ijoic2hhcmplZWwxNDciLCJhIjoiY2tscDEzc3hkMG9odTJwcW1qNWprYmRpcSJ9.MizejsxjX0IQfEqBlBO9mg'; // Set your mapbox token here

const mapStyle = {
  width: '100%',
  height: 400,
}

export default class Prediction extends React.Component{
    constructor(props){
        super(props)
        this.state={type:'House',location:'1',rooms:0,bathrooms:0,area:0,latitude:locations.Islamabad[0],longitude:locations.Islamabad[1],viewport:{
          width:'100vw',
          height:'100vh',
          latitude:locations.Islamabad[0],
          longitude:locations.Islamabad[1],
          zoom:12
        },
        price:"0",
        success:false,
        calculating: false,
      }

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
        const latitude=this.state.latitude
        const longitude=this.state.longitude
        
        const body={inputt:[Number(type),Number(location),rooms,bathrooms,Number(area),latitude,longitude]}
        console.log(body.inputt)
       
  
        const res=await axios.post("http://localhost:5000/predict",body,config)
        if(res.data.success){
          this.setState({price: res.data.price,success:true, calculating:false})
          
          
          
        }
        
  
      }

    handleChange = (e) =>{

        if(this.state.success!=false){
          this.setState({success:false})
        }

        this.setState({[e.target.name] : e.target.value});
        
        if(e.target.name=='location'){
          var index = e.nativeEvent.target.selectedIndex;
          const city=e.nativeEvent.target[index].text
          this.setState({latitude:locations[city][0]})
          this.setState({longitude:locations[city][1]})
          this.setState({viewport:{
            width:'100vw',
            height:'100vh',
            latitude:locations[city][0],
            longitude:locations[city][1],
            zoom:12
          }})
          
        }
        
  
    }
  
    handleSubmit = (e) => {    
        e.preventDefault();
        this.setState({calculating:true})
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

      setboth=(e)=>{
        console.log(e)
        
        const loc=[e.lngLat[1],e.lngLat[0]]
        this.setState({latitude:loc[0],longitude:loc[1]})
      
      }
      
      
      onSelected = (viewport) => {
          this.setState({viewport:viewport})
          
      }

    render(){
        return(
            <div className="predict">
                
                <form onSubmit={this.handleSubmit}>

                   <div className="container mt-2" style={{padding:"30px"}}>
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
                    <label for="counter" style={{color: "white"}}>Number of Rooms: </label>
                    <div className="input-group col-md-6" name="counter">
                    <input type="text" id="disabledTextInput" className="form-control" placeholder={this.state.rooms} disabled/>
                      <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" onClick={this.decrementRoom}>-</button>
                        <button className="btn btn-outline-secondary" type="button" onClick={this.incrementRoom}>+</button>
                      </div>
                    </div>
                  </div>
                
                
                  <div className="row justify-content-center mt-2">
                    <label for="counter" style={{color: "white"}}>Number of Bathrooms: </label>
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
                  <label for="area" style={{color: "white"}}>Area (In marla): </label>
                    <div className="input-group col-md-6" name="area">
                      <input className="form-control form-control-sm" name="area" value={this.state.area} type="number" placeholder="" onChange={this.handleChange}></input>
                    </div>
                </div> 

                <div>
                <br></br>
                <br></br>                
                <div className="row justify-content-center mt-2">
                    <label style={{color:"white"}}>Search Address:      </label>
                    <Geocoder
                      
                      mapboxApiAccessToken={TOKEN}
                      onSelected={this.onSelected}
                      viewport={this.state.viewport}
                      hideOnSelect={true}
                      value=""
                      queryParams={params}
                                
                    />
                  
                  </div>

                <Row>
                  <Col>
                    <label></label>
                    <ReactMapGL
                    {...this.state.viewport}
                    {...mapStyle}
                    onViewportChange={(viewport=>{this.setState({viewport:viewport})})}
                    mapStyle="mapbox://styles/sharjeel147/cklzer9lo25y417o8sit2sll0"
                    mapboxApiAccessToken={TOKEN} 
                    onClick={this.setboth}
                    
                    >

                    <Marker
                      
                      latitude={Number(this.state.latitude)}
                      longitude={Number(this.state.longitude)}>
                    
                      <Pin size={30}/>
                      <myPin size={30}/>
                      
                    </Marker>
                    <NavigationControl/>

                  </ReactMapGL>
                  
                  </Col>
                </Row>

                


                </div>

                  <input type="submit" value="Submit" style={{"margin-bottom":"20px", "margin-top": "20px" }} />
                  {this.state.calculating?
                  <BlockLoading style={{"position": "none", 
                                        "margin-left": "auto", 
                                        "margin-right": "auto"} } />:
                        ""}

                </div>

                </form> 
                
                
                
                {this.state.success?
                <Alert color="info">
                  <div className="container">
                    <h1 className="text-success">Rs. {this.state.price}</h1>
                </div>
              </Alert>:''}
            </div>

          );


      }


}