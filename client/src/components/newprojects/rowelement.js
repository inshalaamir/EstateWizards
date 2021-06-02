import React from 'react'
import {useHistory} from 'react-router-dom'

function Rowelement(props) {
    const history = useHistory()
    return (
        <div className="rowelement">
            <h6>{props.project.title}</h6>
            <img onClick={()=>history.push({pathname:'/viewproject', state:{project: props.project} }) }
             className="rowelement__image" style={{width:'300px', height:"200px"}} src={props.project.pictures[0]}></img>
        </div>
    )
}

export default Rowelement
