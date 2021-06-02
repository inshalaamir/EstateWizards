import React from 'react'
import "./notification.css"

function notification(props) {
    return (
        <div className="notification">
            {props.text}
        </div>
    )
}

export default notification
