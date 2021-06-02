import React, { Component } from 'react'
import { Ellipsis} from 'react-spinners-css';
import Axios from 'axios'
import Row from "./row"

import "./newproject.css"
import { loggedout } from '../../actions';



export class newproject extends Component {
    constructor(props) {
        super(props);

    this.state= {
        location: "Karachi",
        projects:[{pictures:[]}],
        loading: true
    }
}

async componentDidMount(){
   
    const project = await Axios.get(`http://localhost:5000/project/displayproject/${this.state.location}`)
    
    this.setState({projects:project.data.projects, loading: false})

}
filter=async()=>{
    this.setState({loading:true})
    const project = await Axios.get(`http://localhost:5000/project/displayproject/${this.state.location}`)
    this.setState({projects:project.data.projects, loading: false})

}

truncate(string, n) {
    return string?.length > n ? string.substr(0,n-1) + '...' :  string;
}
handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
}

    render() {
        

       
        // const slideImages =
        // [
        //     <img src={this.state.projects[0].pictures[0]} style={{width:'900px', height:"400px"}} />,
        //     <img src={this.state.projects[0].pictures[0]} style={{width:'900px', height:"400px"}} />,
        //     <img src={this.state.projects[0].pictures[0]} style={{width:'900px', height:"400px"}}/>
        //   ];
          

       

        return (
            <>
            <div className="newproject__bar">
            <select name="location"  value={this.state.location} class="p-1 col-md-4 form-control form-control-sm" onChange={this.handleChange}>
                        <option value="Islamabad">Islamabad</option>
                        <option value="Lahore">Lahore</option>
                        <option value="Karachi">Karachi</option>
                        <option value="Peshawar">Peshawar</option>
                        <option value ="Rawalpindi">Rawalpindi</option>
                        <option value="Faisalabad">Faisalabad</option>
                    </select>
                    <button type="button" class=" p-1 col-md-2 btn btn-outline-danger btn-sm" onClick={this.filter}>Search</button>
            </div>
            {this.state.loading && this.state.projects?.length>0? 
                <div className="viewHosting__loading">
                    <Ellipsis color="white" style={{margin: 0, position: 'absolute', top: '50%'}}/>
                </div>:
                <div>
                   <header className='banner' style={{
                        backgroundImage: `url(${this.state.projects[0].pictures[0]})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center center"
                        }}>

                            <div className="banner__contents">
                                <h1 className="banner__title">
                                    {this.state.projects[0].title}
                                </h1>
                                <h1 className="banner__description">
                                    {this.truncate(this.state.projects[0].description,150)}
                                    
                                </h1>
                            </div>


                        
                    </header>

                   
                    <Row projects={this.state.projects}></Row>
                    
       
                </div>
            }
            </>
        )
    }
}

export default newproject
