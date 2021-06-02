import React, { Component } from 'react'
import Axios from 'axios'
import {connect} from "react-redux" 
import {Redirect} from "react-router-dom"
import '@brainhubeu/react-carousel/lib/style.css';
import { Ellipsis} from 'react-spinners-css';
import {Carousel} from '3d-react-carousal'
import "./viewad.css"


export class viewad extends Component {

    constructor(props) {
        super(props);

    this.state= {
        post:{pictures:[]},
        user:{},
        rendered: false,
        currentuser:this.props.location.state.user,
        button1: true,
        bid: 0,
        placed: false,
        bids: []
        }
    }
    
    async componentDidMount(){
        const post = await Axios.get(`http://localhost:5000/post/viewpost/${this.props.location.state.postid}`)
        const user = await Axios.get(`http://localhost:5000/user/getuserbyid/${post.data.user}`)
        var temp = false

        var bids = post.data.bids.map(bid=> {
            return parseInt(bid.bid, 10)
        })

        bids.sort((a, b) => b - a)

        if(this.state.currentuser.user_id){
        const cuser = await Axios.get(`http://localhost:5000/user/getuserbyid/${this.state.currentuser.user_id}`)
        
        
        
        for (var i=0; i<cuser.data.bids.length; i++){
            if (cuser.data.bids[i].post == post.data._id){temp=true}
        }
        }
    
        this.setState({post:post.data, rendered:true, user: user.data, placed:temp, bids: bids})
    }

    addBid = async () => {
        console.log(("1"))
        const res = await Axios.get(`http://localhost:5000/user/addbid/${this.state.currentuser.user_id}/${this.state.post._id}/${this.state.bid.toString()}`)
        console.log(res.data)
        this.setState({placed:true})
    }

    handleChange = (e) =>{
      
      
        this.setState({[e.target.name] : e.target.value});
    }


    handleMessage=async()=>{



        console.log("ok1")
        const member1=this.state.currentuser.user_id
        const member2=this.state.user._id
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
        const title=this.state.post.type?"For "+this.state.post.type+": "+this.state.post.title:"For Stay: "+this.state.post.title
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
                <img src={this.state.post.pictures[0]} style={{width:'500px', height:"300px"}}/>
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
            {this.state.rendered ?
            <div className="viewad">
            <div className="viewad__carousel">
                    <Carousel slides={slides} autoplay={true} interval={5000}/>
            </div>
            <div className="viewad__info">
                <div className="viewad__title">{this.state.post.title} </div>
                <div className="viewad__price"> RS {this.state.post.price}</div> 

                <div className="viewad__toggle">

                    <button className={this.state.button1? "viewad__button1on": "viewHosting__button1"}
                    onClick={() => this.setState({button1:true}) }>Description</button>

                    <button className={this.state.button1?  "viewad__button2": "viewHosting__button2on"}
                    onClick={() => this.setState({button1:false}) }>Details</button>
                </div>

                <div className="viewad__text">
                    {this.state.button1? 
                        <div className="viewad__description">
                            {this.state.post.description}
                        </div>:
                        <div className="viewad__details">
                            <p>Location: {this.state.post.location}</p>
                            <p>Area: {this.state.post.area} marla</p>
                            {!(this.state.post.propertytype=="Commercial Plot" || this.state.post.propertytype=="Residencial Plot")? 
                            <>
                            <p>Portions: {this.state.post.portions}</p>
                            <p>Number of Rooms: {this.state.post.rooms}</p>
                            <p>Number of Bathrooms: {this.state.post.bathrooms}</p>
                            </>:""
                            }
                        </div>
                    }
                </div>

                <div className="viewad__buttons">
                    {this.state.currentuser.islogged?
                    <button className="viewad__message">Message user</button>:""}
                </div>

                <div className="viewad__footer">

                <div className="viewad__bids">
                    <div className="bids__title">CURRENT BIDS FOR THE AD</div>
                    <div className="viewad__bid">{this.state.bids.map(bid=> <p>{bid}</p> )}</div>
                </div>
                    
                {!this.state.placed && this.state.currentuser.islogged? 
                <div className="placebid">
                    <div className="footer__label">Place your bid</div>

                    <div className="bid__inputsection">
                    <div className="bid__input">
                        <input name="bid" value={this.state.bid} type="number" onChange={this.handleChange} className="bid__inputfield" id="exampleFormControlInput1" />
                    </div>
                    </div>

                    <div className="bid__buttonsection">
                    <button className="bid__button" onClick={()=>this.addBid()}>Submit</button>
                    </div>
                </div>
                :
                <div>Your bid has been placed! The user will contact you if he's interested</div>
                }
                
                </div>



            </div>    
        </div>:
            <div className="viewHosting__loading">
                <Ellipsis color="white" style={{margin: 0, position: 'absolute', top: '50%'}}/>
            </div>
        }
            </div>
        )
    }
}



export default viewad
