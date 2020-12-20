import React, { Component } from 'react'
import Ads from './ads/ads'
import { useLocation } from "react-router-dom";
import Axios from 'axios'

export default class displayads extends Component {
    
    constructor(props) {
        super(props);

    this.state= {
        location:"Rawalpindi", 
        propertytype:"House",
        type:"sell",
        posts:[]
    }
}

    async componentDidMount(){
        // const posts = await Axios.get(`http://localhost:5000/post/displayads/${this.props.location.state.location}/${this.props.location.state.propertytype}/${ this.props.location.state.location.type }`)
        // this.setState({posts:posts, 
        //     location: this.props.location.state.location, 
        //     propertytype: this.props.location.state.propertytype,  
        //     type: this.props.location.state.location.type })

        const post = await Axios.get(`http://localhost:5000/post/displayads/${this.props.location.state.location}/${this.props.location.state.propertytype}/${ this.props.location.state.type }`)
        
        this.setState({posts:post.data.posts, location:this.props.location.state.location, propertytype:this.props.location.state.propertytype, type: this.props.location.state.type})

    }

     handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
      }

    filter=async()=>{
        const l = this.state.location
        const p = this.state.propertytype
        const t = this.state.type
        const post = await Axios.get(`http://localhost:5000/post/displayads/${l}/${p}/${t}`)
        this.setState({posts:post.data.posts})
    }


    render() {

       

        return (
            <div className="container">
                <div className="row justify-content-center mt-2">
                    <select name="propertytype" value={this.state.propertytype} class="p-1 col-md-4 form-control form-control-sm" onChange={this.handleChange}>
                        <option value="House">House</option>
                        <option value="Residential Plot">Residential Plot</option>
                        <option value="Commercial Plot">Commercial Plot</option>
                        <option value="Office">Office</option>
                        <option value ="Flat/Apartment">Flat/Apartment</option>
                        <option value="Shop">Shop</option>
                    </select>

                    <select name="location" value={this.state.location} class="p-1 col-md-4 form-control form-control-sm" onChange={this.handleChange}>
                        <option value="Islamabad">Islamabad</option>
                        <option value="Lahore">Lahore</option>
                        <option value="Karachi">Karachi</option>
                        <option value="Peshawar">Peshawar</option>
                        <option value ="Rawalpindi">Rawalpindi</option>
                        <option value="Faisalabad">Faisalabad</option>
                    </select>
                    <button type="button" class=" p-1 col-md-2 btn btn-outline-danger btn-sm" onClick={this.filter}>Search</button>

                </div>
                
                {this.state.posts.length> 0 ? 
                <div>
                <Ads posts={this.state.posts}/>
                </div>
                 :''}
                 {console.log(this.state.posts)}
            </div>
        )
    }
}

