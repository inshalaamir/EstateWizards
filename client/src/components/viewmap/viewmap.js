import React, { Component } from 'react'
import { Spinner } from 'reactstrap';
import "./viewmap.css"

import { useLocation } from "react-router-dom";
import Axios from 'axios'
import Map from './map/map.js'

const locations={
    Islamabad:[33.6938118,73.0651511],
    Rawalpindi:[33.5914237,73.0535122],
    Karachi:[24.860735,67.001137],
    Lahore:[31.520370,74.358749],
    Faisalabad:[31.450365,73.134964],
    Peshawar:[34.0123846,71.5787458]
  }
export default class Viewmap extends Component {
    
    constructor(props) {
        super(props);

    this.state= {
        location:"Rawalpindi", 
        propertytype:"House",
        type:"sell",
        sell:true,
        loc:locations.Rawalpindi,
        posts:[],
        loading:true
    }
}

    async componentDidMount(){
        
        const post = await Axios.get(`http://localhost:5000/post/viewmap/${this.state.propertytype}/${ this.state.type }`)
        console.log(post.data.posts.length)
        
        //this.setState({posts:post.data.posts, location:this.props.location.state.location, propertytype:this.props.location.state.propertytype, type: this.props.location.state.type})
        this.setState({posts:post.data.posts})
        this.setState({loading:false})
    }

    handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})

    if(e.target.name=='location'){

        console.log('location change')
        const city=e.target.value
        this.setState({loc:locations[city]})
        console.log('yeaksdyagd')
    }
    if(e.target.name=='type'){
        if(e.target.value=='sell'){
            this.setState({sell:true})
        }
        else{
            this.setState({sell:false})
        }
    }
   
    }

    filter=async()=>{
        this.setState({loading:true})
        const l = this.state.location
        const p = this.state.propertytype
        const t = this.state.type
        const post = await Axios.get(`http://localhost:5000/post/viewmap/${p}/${t}`)
        this.setState({posts:post.data.posts})
        this.setState({loading:false})
    }


    render() {

       

        return (
            <div className="back">
            <div className="container">
                <div className="row justify-content-center mt-4">
                <select className="p-1 col-md-3 form-control form-control-sm" value={this.state.type} name='type' onChange={this.handleChange}>
                            <option value="sell">For Sale</option>
                            <option value="rent">For Rent</option>
                </select>
                {this.state.sell? 
                        <select className="p-1 ml-1 col-md-3 form-control form-control-sm" value={this.state.propertytype} name='propertytype' onChange={this.handleChange}>
                            <option value="House">House</option>
                            <option value="Flat/Apartment">Flat/Apartment</option>
                            <option value="Commercial Plot">Commercial Plot</option>
                            <option value="Residencial Plot">Residencial Plot</option>
                            <option value="Office">Office</option>
                            <option value="Shop">Shop</option>
                        </select>: 
                        <select className="p-1 ml-1 col-md-3 form-control form-control-sm" value={this.state.propertytype} name='propertytype' onChange={this.handleChange}>
                            <option value="House">House</option>
                            <option value="Flat/Apartment">Flat/Apartment</option>
                            <option value="Office">Office</option>
                            <option value="Shop">Shop</option>
                        </select>
                        

                    }
                     <select name="location" value={this.state.location} class="p-1 ml-1 col-md-3 form-control form-control-sm" onChange={this.handleChange}>
                        <option value="Islamabad">Islamabad</option>
                        <option value="Lahore">Lahore</option>
                        <option value="Karachi">Karachi</option>
                        <option value="Peshawar">Peshawar</option>
                        <option value ="Rawalpindi">Rawalpindi</option>
                        <option value="Faisalabad">Faisalabad</option>
                    </select>
                    <button type="button" class=" p-1 ml-1 col-md-2 btn btn-danger btn-sm" onClick={this.filter}>Search</button>

                    </div>
                        
                {this.state.loading?
                
                <div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <Spinner style={{ width: '6rem', height: '6rem'}} color="success"  />
                </div>
                :
                <div className="map">
                <Map posts={this.state.posts} loc={this.state.loc}/>
                </div>
                
                }
                
            </div>
            </div>
        )
    }
}