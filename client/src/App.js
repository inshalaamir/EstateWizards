
import './App.css';
import {BrowserRouter as Router,Switch, Route, useHistory} from "react-router-dom"
import Nav from "./components/nav/nav.js"
import Signin from "./components/signin/signin.js"
import Signup from "./components/signup/signup.js"
import logout from "./components/logout/logout.js"
import homepage from "./components/homepage/homepage.js"
import postad from "./components/sell/postad.js"
import displayads from './components/displayads/displayads.js'
import viewad from './components/viewad/viewad.js'
import predict from './components/predict/predict'
import host from './components/host/host'
import displayhostings from './components/displayhostings/displayhostings'
import placestostay from './components/placestostay/placestostay'
import viewhosting from './components/viewhosting/viewhosting'
import Viewmap from './components/viewmap/viewmap.js'
import Notifications from "./components/notifications/notifications"
import Messenger from './components/messenger/Messenger'
import Admin from './components/admin/admin'
import React from 'react'
import {useSelector} from "react-redux"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap';
import 'bootstrap/dist/js/bootstrap.min.js';
import {connect} from "react-redux"
import $ from 'jquery';
import Popper from 'popper.js';
import addProject from "./components/admin/addproject/addproject"
import newProjects from "./components/newprojects/newproject"
import priceTrends from "./components/pricetrends/pricetrends"
import viewproject from "./components/viewproject/viewproject"




class App extends React.Component {
  constructor(props){
    super(props)

    this.state= {
      
      //admin : this.props.admin,
      
  }
  }


  render(){
    //console.log(this.props.admin) 
  return (
    <Router>
      <div className="App">
        {!this.state.admin? <Nav />: ""}
        <Switch>
        <Route exact path ="/admin"component={Admin} />
        <Route exact path="/" component={homepage} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/logout" component={logout} />
        <Route path="/viewad" component={viewad}/>
        <Route path="/predict" component={predict}/>
        <Route path="/createad" component={postad}/>
        <Route path="/displayhostings" component={displayhostings}/>
        <Route path="/placestostay" component={placestostay}/>
        <Route path="/host" component={host}/>
        <Route path="/displayads" component={displayads}/>
        <Route path="/viewhosting" component = {viewhosting}/>
        <Route path="/viewmap" component={Viewmap}/>
        <Route path="/notifications" component={Notifications}/>
        <Route path="/messenger" component={Messenger}/>
        <Route path="/addproject" component={addProject}/>
        <Route path="/newprojects" component={newProjects}/>
        <Route path="/pricetrends" component={priceTrends}/>
        <Route path="/viewproject" component = {viewproject}/>


        </Switch>

      </div>

    </Router>
    
  );
  }
}


const mapStateToProps=state=>({
  admin: state.authreducer.admin
})

export default connect(mapStateToProps, null)(App)