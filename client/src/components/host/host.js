import React from 'react'
import FileBase from 'react-file-base64'
import {connect} from "react-redux" 
import {Redirect} from "react-router-dom"
import axios from "axios"
import './host.css'
import Viewer from '../sell/viewer/viewer'





export class Host extends React.Component {

    constructor(props) {
      super(props);
      console.log(this.props)
      this.state = {
            title:'',
            description:'',
            location:'Rawalpindi',
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
        };
    }

    
    componentDidUpdate(prevState){
      if (
      this.state.price!=="" && 
      this.state.title!=="" && 
      this.state.description!=="" &&
      this.state.pictures.length>0 &&
      this.state.post ==true
      ){
        this.setState({post:false})
      }

      if ( ( 
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
      
      if ( 
      this.state.price=="" || 
      this.state.title=="" || 
      this.state.description=="" ||
      this.state.pictures.length<1){
        alert("Please fill all the required fields")
      }
      else{
        
      
      
      const portions = this.state.portions.toString()
      const title=this.state.title
      const description=this.state.description
      const location= this.state.location
      
      const rooms=this.state.rooms.toString()
      const bathrooms=this.state.bathrooms.toString()
      const price=this.state.price.toString()
      const pictures=this.state.pictures
      const body={portions,title,description,location,rooms,bathrooms,price,pictures}
      this.setState({post:true})
    
      const res=await axios.post("http://localhost:5000/host/posthosting",body,config)
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
  
    render() {

      const imgList = this.state.pictures.map(img =>(
        <div key={img}>
        <Viewer source= {img}/>
        <button className="cross" onClick={this.removeImg.bind(this, img)}>X</button>
        </div>
      
      ))

      return (
        <div>
          {!this.state.loggedin? <Redirect to="/signin"/>:''}
          {this.state.created? <Redirect to="/"/>:''}

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

                
                <div className="container text-center">
                  <div className="row justify-content-center">
                    <label for="counter">Number of portions: </label>
                    <div className="input-group col-md-6" name="counter">
                    <input type="text" id="disabledTextInput" className="form-control" placeholder={this.state.portions} disabled/>
                      <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" onClick={this.decrement}>-</button>
                        <button className="btn btn-outline-secondary" type="button" onClick={this.increment}>+</button>
                      </div>
                    </div>
                  </div>
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
                  <label for="area">Rent (Rupees per night): </label>
                    <div className="input-group col-md-6" name="price">
                      <input className="form-control form-control-sm" name="price" value={this.state.price} type="number" placeholder="" onChange={this.handleChange}></input>
                    </div>
                  </div>
                   
                <div className="container text-left mt-5" >  
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

                  <div className="form-group mt-3">
                    <button type="button" class="btn btn-success" onClick={this.createpost} disabled={this.state.post}>Post ad</button>
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

export default connect(mapStateToProps, null)(Host)