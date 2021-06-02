import React from 'react'
import {Link} from "react-router-dom";
import {useHistory} from 'react-router-dom'
import {useSelector,useDispatch} from "react-redux";


const Card = (props) => {

    const history = useHistory()
    const user= useSelector(state=>state.authreducer)

    return (
        <div className="p-1">
            
            <div className="card" style={{width:'18rem'}}>
                <img className="card-img-top" style={{height: "180px", }} src={props.picture} alt="Card image cap"/>
                <div className="card-body">
                    <h5 style={{color: "black"}}>{props.price}</h5>
                    <p className="card-text" style={{color: "black"}}>{props.title}</p>
                    <button className="btn btn-success" onClick={() => history.push({pathname:'/viewad', state:{postid: props.postid,user :user} })} >View ad</button>
                </div>
            </div>
        </div>
    )
}

export default Card
