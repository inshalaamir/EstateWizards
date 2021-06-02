import React, { Component } from 'react'
import {connect} from "react-redux"
import {Link} from "react-router-dom";
import "./admin.css"


export class admin extends Component {
    constructor(props){
        super(props)
    
        this.state= {
          admin : this.props.admin,
      }
}


    render() {
        return (
            <div className="admin">
            {this.state.admin?
            <div className="admin__options">
                <Link className="admin__link" to="/addproject">
                    <div className="admin__option">
                        Add new Project
                    </div>
                </Link>
                <Link className="admin__link" to="/">
                    <div className="admin__option">
                        View all users
                    </div>
                </Link>
                <Link className="admin__link" to="/">
                    <div className="admin__option">
                        Remove users
                    </div>
                </Link>
            </div>:
            <h2>Not authorized</h2>
            }
            </div>

            

            

        )
    }
}



const mapStateToProps=state=>({
    admin: state.authreducer.admin
  })
  
  export default connect(mapStateToProps, null)(admin)