import React from 'react'
import FileBase from 'react-file-base64'
import {connect} from "react-redux" 
import {Redirect} from "react-router-dom"
import axios from "axios"
import Viewer from './viewer/viewer.js'
import MapGL, {Marker, NavigationControl} from 'react-map-gl';
import ReactMapGL from 'react-map-gl'
import Geocoder from 'react-mapbox-gl-geocoder';
import { Container, Col, Row } from 'reactstrap';
import './styles.css'
import './addproject.css'
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


export class addproject extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
            admin : this.props.admin,
            type:'Sell',
            propertytype:'House',
            title:'',
            description:'',
            location:'Rawalpindi',
            pictures:[],
            created:false,
            sell:false,
            post:false,
            latlong:locations.Rawalpindi,
            viewport:{
              width:'100vw',
              height:'100vh',
              latitude:33.5914237,
              longitude:73.0535122,
              zoom:12
            },
            loc:false,
            mosque: false,
            parks:false,
            commercial:false,
            utility:false,
            schools: false,
            developer:'',
            email:'',
            phoneno:'',
            starting:''

        };
    }

    
    createpost=async()=>{
      
      const config = {
        headers: {
        "Content-Type": "application/json",
        "x-auth-token":this.state.token
        },
      };
      
      if (this.state.developer=="" ||
      this.state.phoneno=="" || 
      this.state.email=="" || 
      this.state.title=="" || 
      this.state.description=="" ||
      this.state.pictures.length<1){
        alert("Please fill all the required fields")
      }
      else{

        const features = []
        
      if (this.state.mosque){features.push("Mosque")}
      if (this.state.parks){features.push("Parks")}
      if (this.state.commercial){features.push("Commercial center")}
      if (this.state.utility){features.push("Utility Services")}
      if (this.state.schools){features.push("Schools")}


      const title=this.state.title
      const description=this.state.description
      const location= this.state.location
      const developer=this.state.developer
      const phoneno=this.state.phoneno
      const email=this.state.email
      const starting=this.state.starting
      const pictures=this.state.pictures
      var latlong=[]
      if(this.state.loc==true){
        latlong=this.state.latlong
      }
      const body={title, description, location,features, pictures,latlong, phoneno, developer, starting, email }
      this.setState({post:true})
    
      const res=await axios.post("http://localhost:5000/project/addproject",body,config)
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
          {!this.state.admin? <Redirect to="/signin"/>:''}
          {this.state.created? <Redirect to="/"/>:''}
          <div className="container main__post">
            

            <div className="container mt-3">
                <div className="form-row">
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
                
                <div className="container text-left mt-5 mb-5" >  
                  <div className="form-group">
                    <label for="exampleFormControlInput1">Title</label>
                    <input name="title" value={this.state.title} type="text" onChange={this.handleChange} className="form-control" id="exampleFormControlInput1" />
                  </div>
                  <div className="form-group">
                    <label for="exampleFormControlTextarea1">Description:</label>
                    <textarea name="description" value={this.state.description} onChange={this.handleChange} className="form-control" id="exampleFormControlTextarea1" rows="4"></textarea>
                  </div>

                  <div className="form-row">

                    <div class="form-check boxes mb-3">
                      <label class="form-check-label">
                        <input type="checkbox" class="form-check-input" name="mosque" onChange={(e) => this.handleCheck(e)}/>Mosque
                      </label>
                    </div>
                    <div class="form-check boxes">
                      <label class="form-check-label">
                        <input type="checkbox" class="form-check-input" name="parks" onChange={(e) => this.handleCheck(e)}/>Parks
                      </label>
                    </div>
                    <div class="form-check boxes">
                      <label class="form-check-label">
                        <input type="checkbox" class="form-check-input" name="commercial" onChange={(e) => this.handleCheck(e)}/>Commercial centers
                      </label>
                    </div>
                    <div class="form-check boxes">
                      <label class="form-check-label">
                        <input type="checkbox" class="form-check-input" name="utility" onChange={(e) => this.handleCheck(e)}/>Utility Services
                      </label>
                    </div>
                    <div class="form-check boxes">
                      <label class="form-check-label">
                        <input type="checkbox" class="form-check-input" name="schools" onChange={(e) => this.handleCheck(e)}/>Schools
                      </label>
                    </div>

                  </div>
                  


                  <FileBase type="files"  multiple={true} onDone={(files)=> this.addpics(files)  }> </FileBase>
                  {imgList}

                  <div className="form-group mt-4">
                    <label for="exampleFormControlInput1">Developer</label>
                    <input name="developer" value={this.state.developer} type="text" onChange={this.handleChange} className="form-control" id="exampleFormControlInput1"/>
                  </div>
                  <div className="form-group">
                    <label for="exampleFormControlInput1">Contact</label>
                    <input name="phoneno" value={this.state.phoneno} type="text" onChange={this.handleChange} className="form-control" id="exampleFormControlInput1"/>
                  </div>
                  <div className="form-group">
                    <label for="exampleFormControlInput1">Email</label>
                    <input name="email" value={this.state.email} type="text" onChange={this.handleChange} className="form-control" id="exampleFormControlInput1"/>
                  </div>
                  <div className="form-group">
                    <label for="exampleFormControlInput1">Booking starts from</label>
                    <input name="starting" value={this.state.starting} type="text" onChange={this.handleChange} className="form-control" id="exampleFormControlInput1"/>
                  </div>



                  <div>
                  <Row className="py-4">
                    
                      <label>Search Address:      </label>
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
                    <button type="button" class="btn btn-success" onClick={this.createpost}>Post ad</button>
                  </div>
                  
                </div> 
                  

                  
                  

            </div>
          </div>     
            
        </div>

        
        
      );
    }
  }



const mapStateToProps=state=>({
  admin: state.authreducer.admin
})

export default connect(mapStateToProps, null)(addproject)