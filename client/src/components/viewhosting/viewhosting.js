import React, { Component } from 'react'
import Axios from 'axios'
import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

export class viewad extends Component {

    constructor(props) {
        super(props);

    this.state= {
        post:{},
        user:{},
        rendered: false
    }
}
    
    async componentDidMount(){
        console.log("Kane williamson")
        const post = await Axios.get(`http://localhost:5000/host/viewhosting/${this.props.location.state.postid}`)
        const user = await Axios.get(`http://localhost:5000/user/getuserbyid/${post.data.user}`)

        this.setState({post:post.data, rendered:true, user: user.data})
        
    }

    async reservation(){
        
    } 

    render() {

     
        return (
            <div>
            {this.state.rendered ?
            <div className="container mt-3">
                {console.log(this.state.post)}
                <div className="row">
                    <div className="container justify-content-center col-md-8 border">
                        <Carousel>
                            <img src={this.state.post.pictures[0]} style={{width:'400px', height:"300px"}}/>
                            <img src={this.state.post.pictures[0]} style={{width:'400px', height:"300px"}}/>
                            <img src={this.state.post.pictures[0]} style={{width:'400px', height:"300px"}}/>
                        </Carousel>
                    </div>

                    <div className="col-md-4 border border-success container justify-content-center">
                        <h1 className="mt-3">Rs. {this.state.post.price} per night</h1>
                        <p>Posted by: {this.state.user.name.toUpperCase()} </p>
                        <button type="button" class="btn btn-success btn-lg mt-5">Message user</button>
                        <button type="button" class="btn btn-success btn-lg mt-5">Send reservation</button>

                    </div>
                </div>

                <div className="container mt-2">
                <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true" style={{backgroundColor: '#28A745'}}>Description</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false" style={{backgroundColor: '#28A745'}}>Details</a>
                    </li>
                    </ul>
                    <div class="tab-content" id="pills-tabContent">
                        <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">{this.state.post.description}</div>
                        <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                            <div className="row">
                            
                            </div>
                            
                                <div>
                                    

                                    <div className="row">
                                    <p className="text-success">Rooms:</p> &nbsp;   {this.state.post.rooms} 
                                    </div>

                                    <div className="row">
                                    <p className="text-success">Bathrooms:</p> &nbsp;   {this.state.post.bathrooms}
                                    </div>
                                </div>
                                
                            
                        </div>
                    </div>
                </div>
            </div>:
            ""}
            </div>
        )
    }
}

export default viewad
