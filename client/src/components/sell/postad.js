import React from 'react'
import FileBase from 'react-file-base64'
import {connect} from "react-redux" 
import {Redirect} from "react-router-dom"
import axios from "axios"
import './postad.css'
import Viewer from './viewer/viewer.js'
import MapGL, {Marker, NavigationControl} from 'react-map-gl';
import ReactMapGL from 'react-map-gl'
import Geocoder from 'react-mapbox-gl-geocoder';
import { Container, Col, Row } from 'reactstrap';
import './styles.css'
import a from './pinn.svg'
import Pin from './map/pin.js'
import myPin from './mappin/pin.js'


const locations={
  Islamabad:[33.6938118,73.0651511],
  Rawalpindi:[33.5914237,73.0535122],
  Karachi:[24.860735,67.001137],
  Lahore:[31.520370,74.358749],
  Faisalabad:[31.450365,73.134964],
  Peshawar:[34.0123846,71.5787458]
}
const rawalpindi=[33.5651,73.0169]



const params = {
  country: "pk"
}

const TOKEN = 'pk.eyJ1Ijoic2hhcmplZWwxNDciLCJhIjoiY2tscDEzc3hkMG9odTJwcW1qNWprYmRpcSJ9.MizejsxjX0IQfEqBlBO9mg'; // Set your mapbox token here

const mapStyle = {
  width: '100%',
  height: 400,
}


export class Postad extends React.Component {

    constructor(props) {
      super(props);
      console.log(this.props)
      this.state = {
            type:'Sell',
            propertytype:'House',
            title:'',
            description:'',
            location:'Rawalpindi',
            area:'',
            rooms:0,
            bathrooms:0,
            price:'',
            pictures:[],
            token: this.props.token,
            loggedin:this.props.loggedin,
            created:false,
            sell:false,
            portions : 1,
            post:false,
            latlong:locations.Rawalpindi,
            viewport:{
              width:'100vw',
              height:'100vh',
              latitude:33.5914237,
              longitude:73.0535122,
              zoom:12
            },
            loc:false
        };
    }

    
    componentDidUpdate(prevState){
      if (this.state.area!=="" && 
      this.state.price!=="" && 
      this.state.title!=="" && 
      this.state.description!=="" &&
      this.state.pictures.length>0 &&
      this.state.post ==true
      ){
        this.setState({post:false})
      }

      if ( (this.state.area=="" || 
      this.state.price=="" || 
      this.state.title=="" || 
      this.state.description=="" ||
      this.state.pictures.length<1) && this.state.post==false ){
        this.setState({post:true})
      }
    }
    
    createpost=async()=>{
      
      const config = {
        headers: {
        "Content-Type": "application/json",
        "x-auth-token":this.state.token
        },
      };
      
      if (this.state.area=="" || 
      this.state.price=="" || 
      this.state.title=="" || 
      this.state.description=="" ||
      this.state.pictures.length<1){
        alert("Please fill all the required fields")
      }
      else{
        
      var type = ""
      if (this.state.sell){
        type='rent'
      }
      else{
        type='sell'
      }
      const propertytype=this.state.propertytype
      const portions = this.state.portions.toString()
      const title=this.state.title
      const description=this.state.description
      const location= this.state.location
      const area=this.state.area.toString()
      const rooms=this.state.rooms.toString()
      const bathrooms=this.state.bathrooms.toString()
      const price=this.state.price.toString()
      const pictures=this.state.pictures
      var latlong=[]
      if(this.state.loc==true){
        latlong=this.state.latlong
      }
      const body={type,propertytype,portions,title,description,location,area,rooms,bathrooms,price,pictures,latlong}
      this.setState({post:true})
    
      const res=await axios.post("http://localhost:5000/post/postad",body,config)
      if(res.data.success){
        this.setState({created: true})
      }
      else{
        console.log("Error")
      }
    
    }

      
      

    }


  
    handleChange = (e) =>{
      
      
        this.setState({[e.target.name] : e.target.value});

        if(e.target.name=='location'){

          console.log('location change')
          const city=e.target.value
          this.setState({latlong:locations[city]})
          this.setState({viewport:{
            width:'100vw',
            height:'100vh',
            latitude:locations[city][0],
            longitude:locations[city][1],
            zoom:12
          }})
          this.setState({loc:false})
        }
      

    }

    handleCheck = (e) =>{
      
        
        this.setState({[e.target.name] : e.target.checked});
         
  
      }

    handleSubmit = (e) => {
      console.log(this.state)
      
      e.preventDefault();
      
      if(this.state.pictures.length>0){
        this.createpost()

      }
      else{
        alert("Please attach atleast one picture")
      }

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

    addpics=(files)=>{
      console.log("running")
      var base=[]
      for(var i=0;i<files.length;i++){
        base.push(files[i].base64)
        
      }
      this.setState({pictures:base})
    }

    removeImg(key){
      const newImgs = this.state.pictures.filter(img => img!== key)
      this.setState({pictures: newImgs})
    }
   

    

    setboth=(e)=>{
    console.log(e)
    console.log(this.state.latlong)
    const loc=[e.lngLat[1],e.lngLat[0]]
    this.setState({latlong:loc,loc:true})
  
    }
  
  
    onSelected = (viewport) => {
        this.setState({viewport:viewport})
    }

    
  
    render() {

      const imgList = this.state.pictures.map(img =>(
        <div key={img}>
        <Viewer source= {img}/>
        <button className="cross" onClick={this.removeImg.bind(this, img)}>X</button>
        </div>
      
      ))

      return (
        <div className="post__back">
          {!this.state.loggedin? <Redirect to="/signin"/>:''}
          {this.state.created? <Redirect to="/"/>:''}
          <div className="container main__post">
            <div className="container mt-2">
              <div className="row">
                    <div className="col-sm text-right">Sell</div> 
                    <label className="switch">
                        <input type="checkbox" name="sell" checked={this.state.sell} onChange={(e) => this.handleCheck(e)}/>
                        <span className="slider round"></span>
                    </label>
                    <div className="col-sm text-left">Rent</div> 
              </div>
            </div>

            <div className="container mt-3">
                <div className="form-row">
                    <div className="form-group col-md-6">
                    <label for="propertytype">Choose Property type</label>
                    {!this.state.sell? 
                        <select className="form-control" value={this.state.propertytype} name='propertytype' onChange={this.handleChange}>
                            <option value="House">House</option>
                            <option value="Flat/Apartment">Flat/Apartment</option>
                            <option value="Commercial Plot">Commercial Plot</option>
                            <option value="Residencial Plot">Residencial Plot</option>
                            <option value="Office">Office</option>
                            <option value="Shop">Shop</option>
                        </select>: 
                        <select className="form-control" value={this.state.propertytype} name='propertytype' onChange={this.handleChange}>
                            <option value="House">House</option>
                            <option value="Flat/Apartment">Flat/Apartment</option>
                            <option value="Office">Office</option>
                            <option value="Shop">Shop</option>
                        </select>

                        }
                        
                    </div>
                    <div className="form-group col-md-6">
                        <label for="location">Choose Location</label>
                        <select className="form-control" value={this.state.location} name='location' onChange={this.handleChange}>
                            <option value="Faisalabad">Faisalabad</option>
                            <option value="Islamabad">Islamabad</option>
                            <option value="Karachi">Karachi</option>
                            <option value="Lahore">Lahore</option>
                            <option value="Peshawar">Peshawar</option>
                            <option value="Rawalpindi">Rawalpindi</option>
                        </select>
                    </div>
                </div>
                {this.state.propertytype=="House" || this.state.propertytype=="Office" || this.state.propertytype=="Shop" ? 
                <div className="container text-center col-md-8">
                  <div className="row justify-content-between">
                    <label for="counter" style={{color:"black"}}>Number of portions: </label>
                    <div className="input-group col-md-6" name="counter">
                    <input type="text" id="disabledTextInput" className="form-control" placeholder={this.state.portions} disabled/>
                      <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" onClick={this.decrement}>-</button>
                        <button className="btn btn-outline-secondary" type="button" onClick={this.increment}>+</button>
                      </div>
                    </div>
                  </div>
                  </div>:
                  ""
                }

                {this.state.propertytype=="House" || this.state.propertytype=="Office" || this.state.propertytype=="Shop" || this.state.propertytype=="Flat/Apartment"? 
                
                <div className="container text-center mt-2 col-md-8">
                  <div className="row justify-content-between">
                    <label for="counter" style={{color:"black"}}>Number of Rooms: </label>
                    <div className="input-group col-md-6" name="counter">
                    <input type="text" id="disabledTextInput" className="form-control" placeholder={this.state.rooms} disabled/>
                      <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" onClick={this.decrementRoom}>-</button>
                        <button className="btn btn-outline-secondary" type="button" onClick={this.incrementRoom}>+</button>
                      </div>
                    </div>
                  </div>
                
                
                  <div className="row justify-content-between mt-2">
                    <label for="counter" style={{color:"black"}}>Number of Bathrooms: </label>
                    <div className="input-group col-md-6" name="counter">
                    <input type="text" id="disabledTextInput" className="form-control" placeholder={this.state.bathrooms} disabled/>
                      <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" onClick={this.decrementBathroom}>-</button>
                        <button className="btn btn-outline-secondary" type="button" onClick={this.incrementBathroom}>+</button>
                      </div>
                    </div>
                  </div>
                </div>:
                  ""
                }

                  <div className="row justify-content-center mt-2">
                  <label for="area" style={{color:"black"}}>Area (In marla): </label>
                    <div className="input-group col-md-6" name="area">
                      <input className="form-control form-control-sm" name="area" value={this.state.area} type="number" placeholder="" onChange={this.handleChange}></input>
                    </div>
                  </div>
                {this.state.sell? 
                  <div className="row justify-content-center mt-2">
                  <label for="area" style={{color:"black"}}>Rent (Rupees per month): </label>
                    <div className="input-group col-md-6" name="price">
                      <input className="form-control form-control-sm" name="price" value={this.state.price} type="number" placeholder="" onChange={this.handleChange}></input>
                    </div>
                  </div>:
                  <div className="row justify-content-center mt-2">
                  <label for="area" style={{color:"black"}}>Price (Rupees): </label>
                    <div className="input-group col-md-6" name="price">
                      <input className="form-control form-control-sm" name="price" value={this.state.price} type="number" placeholder="" onChange={this.handleChange}></input>
                    </div>
                  </div>
                   }
                <div className="container text-left mt-5 mb-5" >  
                  <div className="form-group">
                    <label for="exampleFormControlInput1">Title</label>
                    <input name="title" value={this.state.title} type="text" onChange={this.handleChange} className="form-control" id="exampleFormControlInput1" placeholder="A short but informative title e.g Recently built, spacious 2 story house for sale in Bahria Town"/>
                  </div>
                  <div className="form-group">
                    <label for="exampleFormControlTextarea1">Description:</label>
                    <textarea name="description" value={this.state.description} onChange={this.handleChange} className="form-control" id="exampleFormControlTextarea1" rows="4" placeholder="A description of the property. Include as many details as you can"></textarea>
                  </div>


                  <FileBase type="files"  multiple={true} onDone={(files)=> this.addpics(files)  }> </FileBase>
                  {imgList}

                  <div>
                  <Row className="py-4">
                    
                      <label style={{color:"black"}}>Search Address:      </label>
                      <Geocoder
                        
                        mapboxApiAccessToken={TOKEN}
                        onSelected={this.onSelected}
                        viewport={this.state.viewport}
                        hideOnSelect={true}
                        value=""
                        queryParams={params}
                                  
                      />
                    
                  </Row>

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
                        
                        latitude={Number(this.state.latlong[0])}
                        longitude={Number(this.state.latlong[1])}>
                      
                        <Pin size={30}/>
                        <myPin size={30}/>
                        
                      </Marker>
                      <NavigationControl/>

                    </ReactMapGL>
                    
                    </Col>
                  </Row>
                    
                  </div>

                  <div className="form-group mt-3">
                    <button type="button" class="btn btn-success" onClick={this.createpost} disabled={this.state.post}>Post ad</button>
                  </div>
                  
                </div> 
                  

                  
                  

            </div>
          </div>     
            
        </div>

        
        
      );
    }
  }



const mapStateToProps=state=>({
  token:state.authreducer.token,
  loggedin:state.authreducer.islogged
})

export default connect(mapStateToProps, null)(Postad)