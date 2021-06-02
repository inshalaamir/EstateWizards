import Axios from 'axios';
import React, { Component } from 'react'
import "./notifications.css"
import {connect} from "react-redux" 
import {Redirect} from "react-router-dom"
import Notification from "./notification/notification"
import Reservation from "./reservation/reservation"

export class notifications extends Component {

    constructor(props) {
        super(props);

    this.state= {
        loading: true,
        loggedin : this.props.loggedin,
        token: this.props.token,
        user_id: this.props.user_id,
        reservations:[],
        notifications:[],
        notificationDisabled: false,
        requestDisabled: true,

    }
}

    async componentDidMount(){
        
        const user = await Axios.get(`http://localhost:5000/user/getuserbyid/${this.state.user_id}`)
        this.setState({reservations: user.data.reservations, notifications: user.data.notifications, loading: false})
        
        
    }


    

    render() {

        const nots = this.state.notifications.map(notification => (
            <Notification text={notification}/>
        ))

        const reqs = this.state.reservations.map(resv => (
            
            <Reservation 
            username={resv.name} 
            title={resv.title} 
            location={resv.location}
            startDate={resv.dates[0]}
            endDate = {resv.dates[resv.dates.length - 1]}
            key = {resv._id}
            hostingid = {resv.hosting}
            userid = {resv.user}
            dates= {resv.dates}
            user = {this.state.user_id}
            />
        ))
        


        return (
            <div>
            {this.state.loading? <div> 
                                <h2>Loading</h2> 
                                
                                </div> : 
                <div>
                <div className="bar__notifications">
                    <h5 
                    onClick={() => this.setState({notificationDisabled:false, requestDisabled:true})}
                    className={!this.state.notificationDisabled? "activated": null}
                    >Notifications</h5>

                    <h5 onClick={() => this.setState({notificationDisabled:true, requestDisabled:false})}
                    className={!this.state.requestDisabled? "activated": null}
                    >Requests</h5>
                </div>

                {this.state.notificationDisabled?
                    <div>
                      {reqs}
                    </div>:
                    <div>
                        {nots}
                    </div> 
                }

                </div>
                
            
            }
            </div>
        )
    }
}

const mapStateToProps=state=>({
    user_id: state.authreducer.user_id,
    token:state.authreducer.token,
    loggedin:state.authreducer.islogged
  })

export default connect(mapStateToProps, null)(notifications)
