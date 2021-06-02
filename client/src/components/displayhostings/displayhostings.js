import React, { Component } from 'react'
import Hostings from './hostings/hostings'
import { useLocation } from "react-router-dom";
import Axios from 'axios'
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { Ellipsis} from 'react-spinners-css';
import "./displayhostings.css"


export default class displayhostings extends Component {
    
    constructor(props) {
        super(props);
    this.state= {
        location:"Rawalpindi", 
        startDate: null,
        endDate: null,
        dates:[],
        posts:[null]

    }
}

    async componentDidMount(){
        // const posts = await Axios.get(`http://localhost:5000/post/displayads/${this.props.location.state.location}/${this.props.location.state.propertytype}/${ this.props.location.state.location.type }`)
        // this.setState({posts:posts, 
        //     location: this.props.location.state.location, 
        //     propertytype: this.props.location.state.propertytype,  
        //     type: this.props.location.state.location.type })

        var getDates = function(startDate, endDate) {
            var dates = [],
                currentDate = startDate,
                addDays = function(days) {
                  var date = new Date(this.valueOf());
                  date.setDate(date.getDate() + days);
                  return date;
                };
            while (currentDate <= endDate) {
              dates.push(currentDate);
              currentDate = addDays.call(currentDate, 1);
            }
            for(var i=0; i<dates.length; i++){
                dates[i]=dates[i].toISOString().substring(0, 10)
            }
            return dates;
          };

          var dates = getDates(this.props.location.state.startDate, this.props.location.state.endDate);

        const post = await Axios.get(`http://localhost:5000/host/displayhostings/${dates}/${this.props.location.state.location}`)
        console.log(post.data.posts)
        this.setState({posts: post.data.posts, location:this.props.location.state.location, startDate: this.props.location.state.startDate, endDate: this.props.location.state.endDate, dates:dates})
        

    }

     handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
      }

    // filter=async()=>{
    //     const l = this.state.location
    //     const p = this.state.propertytype
    //     const t = this.state.type
    //     const post = await Axios.get(`http://localhost:5000/post/displayads/${l}/${p}/${t}`)
    //     this.setState({posts:post.data.posts})
    // }


    render() {
       console.log(this.state.posts)

        return (
            <div className="container displayhostings">
                {/* <div className="row justify-content-center mt-2">
                    

                    <select name="location" value={this.state.location} class="p-1 col-md-4 form-control form-control-sm" onChange={this.handleChange}>
                        <option value="Islamabad">Islamabad</option>
                        <option value="Lahore">Lahore</option>
                        <option value="Karachi">Karachi</option>
                        <option value="Peshawar">Peshawar</option>
                        <option value ="Rawalpindi">Rawalpindi</option>
                        <option value="Faisalabad">Faisalabad</option>
                    </select>
                    <button type="button" class=" p-1 col-md-2 btn btn-outline-danger btn-sm" onClick={this.filter}>Search</button>

                </div> */}
                
                {this.state.posts.includes(null) ? 
                <div className="viewHosting__loading">
                <Ellipsis color="white" style={{margin: 0, position: 'absolute', top: '50%'}}/>
                </div>
                 :<div>
                 <Hostings posts={this.state.posts} dates = {this.state.dates}/>
                 </div>}
                 
                 
            </div>
        )
    }
}

