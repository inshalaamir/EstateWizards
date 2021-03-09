import React from 'react'
import {Link} from "react-router-dom";
import {useHistory} from 'react-router-dom'

const Card = (props) => {

    const history = useHistory()

    return (
        <div className="p-1">
            <div className="card" style={{width:'18rem'}}>
            <img className="card-img-top" src={props.picture} alt="Card image cap"/>
            <div className="card-body">
                <h5 className="card-title">{props.price} Per night</h5>
                <p className="card-text">{props.title}</p>
                <button className="btn btn-success" onClick={() => history.push({pathname:'/viewhosting', state:{postid: props.postid} })} >View ad</button>
                
            </div>
            </div>
        </div>
    )
}

export default Card
