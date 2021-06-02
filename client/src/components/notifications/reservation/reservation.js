import Axios from 'axios'
import React from 'react'
import "./reservation.css"
import {useHistory} from 'react-router-dom'
 
function Reservation(props) {
    const history=useHistory()
    const accept = async () => {
        const res = await Axios.get(`http://localhost:5000/host/reserve/${props.hostingid}/${props.dates}/${props.userid}`)
        const res2 = await Axios.get(`http://localhost:5000/host/removerequest/${props.userid}/${props.hostingid}/${props.user}`)
        
        const text = `Your reservation request for "${props.title}" in ${props.location} has been accepted `
        const res3 = await Axios.get(`http://localhost:5000/host/sendnotification/${props.userid}/${text}`)
    }

   const  handleMessage=async()=>{

        

        console.log("ok1")
        const member1=props.userid
        const member2=props.user
        const postid=props.hostingid
        //console.log(this.state.post)
        const findconv=await Axios.get(`http://localhost:5000/conversations/find/${member1}/${member2}/${postid}`)
        console.log(findconv.data)


        if(findconv.data){
            console.log('1')
            history.push({
                pathname: '/messenger',
                state:{conversation:findconv.data}
            })
            
        }
        else{
        const title="For Stay: "+props.title
        console.log(member1,member2)
        console.log("2")
        const newconv=await Axios.post('http://localhost:5000/conversations/',{senderId:member1,receiverId:member2,title:title,postid:props.hostingid})
        history.push({
            pathname: '/messenger',
        })
        }
       
        
        
    }


    return (
        <div className="reservation">
            <p>
            {props.username} has requested a reservation from {props.startDate.substring(0,10)} to {props.endDate.substring(0,10)}
             at your property {props.title} in {props.location}
            </p>

            <button onClick={()=>handleMessage()}>Message</button>
            <button onClick={() => accept() }>Accept</button>
            <button>Decline</button>
            
        </div>
    )
}

export default Reservation
 