import React, { Component } from 'react'
import Axios from 'axios'
// import Carousel, { Dots } from '@brainhubeu/react-carousel';
// import '@brainhubeu/react-carousel/lib/style.css';
// import { arrowsPlugin } from '@brainhubeu/react-carousel';
// import Icon from 'react-fa';
import {Carousel} from '3d-react-carousal'
import {connect} from "react-redux" 
import {Redirect} from "react-router-dom"
import "./viewhosting.css"
import { Ellipsis} from 'react-spinners-css';

export class viewad extends Component {

    constructor(props) {
        super(props);

    this.state= {
        post:{pictures:[]},
        user:{},
        rendered: false,
        sent: false,
        loggedin : this.props.loggedin,
        token: this.props.token,
        user_id: this.props.user_id,
        cancel_reservation: false,
        button1: true,
    }
}
    
    async componentDidMount(){
        const post = await Axios.get(`http://localhost:5000/host/viewhosting/${this.props.location.state.postid}`)
        const user = await Axios.get(`http://localhost:5000/user/getuserbyid/${post.data.user}`)
        const logged_user = await Axios.get(`http://localhost:5000/user/getuserbyid/${this.state.user_id}`)

        if (logged_user.data.requests.includes(post.data._id)){
            this.setState({post:post.data, rendered:true, user: user.data, cancel_reservation:true})
        }
        

        this.setState({post:post.data, rendered:true, user: user.data})
        
    }

    async reservation(){
        
        const rev = await Axios.get(`http://localhost:5000/host/addrequest/${this.state.user._id}/${this.state.user_id}/${this.state.post._id}/${this.props.location.state.dates}`)
        this.setState({cancel_reservation:true})
        
    } 

    async cancel(){
        const res = await Axios.get(`http://localhost:5000/host/removerequest/${this.state.user_id}/${this.state.post._id}/${this.state.user._id}`)
        this.setState({cancel_reservation:false})
    }

    handleMessage=async()=>{



        console.log("ok1")
        const member1=this.state.user_id
        const member2=this.state.post.user
        const postid=this.state.post._id
        //console.log(this.state.post)
        const findconv=await Axios.get(`http://localhost:5000/conversations/find/${member1}/${member2}/${postid}`)
        console.log(findconv.data)


        if(findconv.data){
            console.log('1')
            this.props.history.push({
                pathname: '/messenger',
                state:{conversation:findconv.data}
            })
            
        }
        else{
        const title="For Stay: "+this.state.post.title
        console.log(member1,member2)
        console.log("2")
        const newconv=await Axios.post('http://localhost:5000/conversations/',{senderId:member1,receiverId:member2,title:title,postid:this.state.post._id})
        this.props.history.push({
            pathname: '/messenger',
        })
        }
       
        
        
    }

    render() {

        let slides=[]


        if (this.state.post.pictures.length <2){
            slides = [
                <img src={this.state.post.pictures[0]} style={{width:'500px', height:"300px"}} />,
                <img src={this.state.post.pictures[0]} style={{width:'500px', height:"300px"}} />,
                <img src={this.state.project.pictures[0]} style={{width:'500px', height:"300px"}}/>
            ]
        }
        else if(this.state.post.pictures.length <3){
            slides = [
                <img src={this.state.post.pictures[0]} style={{width:'500px', height:"300px"}} />,
                <img src={this.state.post.pictures[1]} style={{width:'500px', height:"300px"}} />,
                <img src={this.state.post.pictures[1]} style={{width:'500px', height:"300px"}}/>
            ]
        }
        else{
            slides = this.state.post.pictures.map(picture => {
               return <img src={picture} style={{width:'500px', height:"300px"}} />
            })
        }
     
        return (
            <div>
            {!this.state.loggedin? <Redirect to="/signin"/>:''}
            {this.state.rendered ?
            <div className="viewHosting">
                <div className="viewHosting__carousel">
                    
                        {/* <Carousel  
                        plugins={[
                           'arrows'
                          ]}>
                            <img src={this.state.post.pictures[0]} style={{width:'400px ', height:"300px"}}/>
                            <img src={this.state.post.pictures[0]} style={{width:'400px', height:"300px"}}/>
                            <img src={this.state.post.pictures[0]} style={{width:'400px', height:"300px"}}/>
                        </Carousel> */}
                        <Carousel slides={slides} autoplay={true} interval={5000}/>
                </div>
                <div className="viewHosting__info">
                    <div className="viewHosting__title">{this.state.post.title} </div>
                    <div className="viewHosting__price"> RS {this.state.post.price} per night </div> 

                    <div className="viewHosting__toggle">

                        <button className={this.state.button1? "viewHosting__button1on": "viewHosting__button1"}
                        onClick={() => this.setState({button1:true}) }>Description</button>

                        <button className={this.state.button1?  "viewHosting__button2": "viewHosting__button2on"}
                        onClick={() => this.setState({button1:false}) }>Details</button>
                    </div>

                    <div className="viewHosting__text">
                        {this.state.button1? 
                            <div className="viewHosting__description">
                                {this.state.post.description}
                            </div>:
                            <div className="viewHosting__details">
                                <p>Location: {this.state.post.location}</p>
                                <p>Portions: {this.state.post.portions}</p>
                                <p>Number of Rooms: {this.state.post.rooms}</p>
                                <p>Number of Bathrooms: {this.state.post.bathrooms}</p>
                            </div>
                        }
                    </div>
                    <div>
                    {this.state.post.user && this.state.post.user!=this.state.user_id?
                    <div className="viewHosting__buttons">
                        
                        <button className="viewHosting__message" onClick={()=>this.handleMessage()}>Message user</button>
                        {this.state.cancel_reservation? 
                        <button className="viewHosting__cancel" onClick={()=> this.cancel()}>Cancel Reservation</button>:
                        <button className="viewHosting__reservation" onClick={()=> this.reservation()}>Send Reservation</button>
                        }
                    </div>:""}
                    </div>

                    <div className="viewHosting__footer">
                        
                    </div>


  
                </div>    
            </div>:
            <div className="viewHosting__loading">
                <Ellipsis color="white" style={{margin: 0, position: 'absolute', top: '50%'}}/>
            </div>}
            </div>
        )
    }
}


const mapStateToProps=state=>({
    user_id: state.authreducer.user_id,
    token:state.authreducer.token,
    loggedin:state.authreducer.islogged
  })
  
  export default connect(mapStateToProps, null)(viewad)
