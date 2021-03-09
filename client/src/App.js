
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

import React from 'react'
import {useSelector} from "react-redux"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap';
import 'bootstrap/dist/js/bootstrap.min.js';


import $ from 'jquery';
import Popper from 'popper.js';




class App extends React.Component {
  constructor(){
    super()
  }

  render(){
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
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
        </Switch>

      </div>

    </Router>
    
  );
  }
}



export default App;
