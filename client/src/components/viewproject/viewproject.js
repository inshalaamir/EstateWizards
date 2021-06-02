import React, { Component } from 'react'
import { Ellipsis} from 'react-spinners-css';
import {Carousel} from '3d-react-carousal'
import "./viewproject.css"
import RoomServiceIcon from '@material-ui/icons/RoomService';
import NaturePeopleIcon from '@material-ui/icons/NaturePeople';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import SchoolIcon from '@material-ui/icons/School';
import BuildIcon from '@material-ui/icons/Build';
import PhoneIcon from '@material-ui/icons/Phone';


export class viewproject extends Component {
    constructor(props) {
        super(props);

    this.state= {
        post:{pictures:[]},
        user:{},
        rendered: false,
        project:this.props.location.state.project,
        button1: true,
        slides:[]
    }
}


    render() {

        // let lpc = []

        let slides=[]


        if (this.state.project.pictures.length <2){
            slides = [
                <img src={this.state.project.pictures[0]} style={{width:'500px', height:"300px"}} />,
                <img src={this.state.project.pictures[0]} style={{width:'500px', height:"300px"}} />,
                <img src={this.state.project.pictures[0]} style={{width:'500px', height:"300px"}}/>
            ]
        }
        else if(this.state.project.pictures.length <3){
            slides = [
                <img src={this.state.project.pictures[0]} style={{width:'500px', height:"300px"}} />,
                <img src={this.state.project.pictures[1]} style={{width:'500px', height:"300px"}} />,
                <img src={this.state.project.pictures[1]} style={{width:'500px', height:"300px"}}/>
            ]
        }
        else{
            slides = this.state.project.pictures.map(picture => {
               return <img src={picture} style={{width:'500px', height:"300px"}} />
            })
        }

        
        return (
            <>
            <div className="viewProject">
                <Carousel slides={slides} autoplay={true} interval={5000}/>
                <div className="viewProject__info">
                    <div className="viewProject__title">{this.state.project.title}</div>
                    <div className="viewProject__description">{this.state.project.description}</div>
                    
                    <div className="viewProject__footer">

                        <div className="viewProject__featuresection">
                            <div className="viewProject__featurestitle">FEATURES</div>
                            <div className="viewProject__features">
                                {this.state.project.features.includes("Mosque")? 
                                <div className="viewProject__feature">
                                    <RoomServiceIcon/> Mosque
                                </div>: ""}
                                {this.state.project.features.includes("Parks")? 
                                <div className="viewProject__feature">
                                    <NaturePeopleIcon/> Parks
                                </div>: ""}
                                {this.state.project.features.includes("Commercial center")? 
                                <div className="viewProject__feature">
                                <LocalMallIcon/> Commercial 
                                </div>: ""}
                                {this.state.project.features.includes("Utility Services")? 
                                <div className="viewProject__feature">
                                <BuildIcon/> Utility 
                                </div>: ""}
                                {this.state.project.features.includes("Schools")? 
                                <div className="viewProject__feature">
                                <SchoolIcon/> Schools
                                </div>: ""}
                            </div>
                        </div>

                        <div className="viewProject__developersection">
                            <div className="viewProject__developertitle">Developers</div>
                            <div className="viewProjects__developertext">
                                <div className="viewProjects__developertextitem">{this.state.project.developer}</div>
                                <div className="viewProjects__developertextitem"><PhoneIcon/>{this.state.project.phoneno}</div>
                                <div className="viewProjects__developertextitem"></div>
                            </div>
                        </div>
                         
                    </div>
                </div>
            </div>
            
            </>
        )
    }
}

export default viewproject
