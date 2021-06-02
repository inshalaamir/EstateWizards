import React from 'react'
import RowElement from "./rowelement"
import "./row.css"

function row(props)

{

    const row = props.projects.map(project=>(
        <RowElement project={project}></RowElement>
    ))
    return (
        <div className="row__main">
            {row}
        </div>
    )
}

export default row
