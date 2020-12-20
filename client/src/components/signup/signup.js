

import React, { useState } from "react";
import axios from "axios";
import {Redirect} from "react-router-dom"
import {useDispatch} from "react-redux";
import {signedin} from "../../actions"

export default function Signup(){
    const dispatch=useDispatch();
    

    const [signupdata, setsignupdata] = useState({
        name:"",
        email: "",
        password: "",
        password2: "",
        phoneno:"",
        location:"Rawalpindi",
        disable: true,
        redirect:false,
        alert:false,
        alertMessage: ""
    });

    async function signup(name,phoneno,location,email, password){
      const config = {
          headers: {
          "Content-Type": "application/json",
        },
      };
    
      const body = {name,phoneno,location,email, password}
      console.log(body);
    
      const res=await axios.post("http://localhost:5000/user/signup",body,config)
      console.log(res.data);
    
      if(res.data.exists){
        alert("User already exists with this email.")
      }


      else if(res.data.success){
        
        console.log("user created")
        const recieveddata={id:res.data.userid,name:res.data.name,location:res.data.location,token:res.data.token}
        dispatch(signedin(recieveddata))
        alert("Account created sucessfully")
        if(recieveddata){
          setsignupdata({ ...signupdata, redirect:true});
        }

      }
      else{
        alert("Error creating user")
      }
      
      
    }

    
    
    const {name, phoneno,location, email, password, password2 } = signupdata;
  
    const onChange = (e) => {
      if (signupdata.name !=="" && 
      signupdata.email !=="" && 
      signupdata.password !=="" && 
      signupdata.password2 !=="" && 
      signupdata.phoneno !=="" 
      ){
        setsignupdata({ ...signupdata, [e.target.name]: e.target.value, disable: false });
      }
      else{
        setsignupdata({ ...signupdata, [e.target.name]: e.target.value, disable:true });
      }
    }
    const onSubmit = (e) => {
      e.preventDefault();
      if(password !== password2){
        setsignupdata({...signupdata,alert:true, alertMessage:"Passwords donnot match"})
      }
      
      else{
        console.log(email, password);
        signup(name,phoneno,location,email, password)
      }
      
      };
  
    

    
          
    return( 
        
        <div className="container text-left mt-5">
          {signupdata.redirect? <Redirect to="/"/>:''}
           
            {/* <h1>Create your account</h1>
            <form onSubmit={(e) => onSubmit(e)}>
            <br />
            <input
                type="name"
                placeholder="Your name here"
                name="name"
                autoComplete="on"
                onChange={(e) => onChange(e)}
            />
            <br />
            <input
                type="phoneno"
                placeholder="Your phoneno here"
                name="phoneno"
                autoComplete="on"
                onChange={(e) => onChange(e)}
            />
            <br />
            <input
                type="email"
                placeholder="Your email here"
                name="email"
                autoComplete="on"
                onChange={(e) => onChange(e)}
            />
            <br />
            <input
                type="password"
                placeholder="Your password here"
                name="password"
                autoComplete="on"
                onChange={(e) => onChange(e)}
            />
            <br/>
            <button type="submit">Signup</button>
            </form>
            <br />
            <br />
            <br />
            <h6>
            
            </h6> */}
          {signupdata.alert? <div class="alert alert-danger" role="alert">{signupdata.alertMessage}</div>:''}
          <form onSubmit={(e) => onSubmit(e)}>
          <h1 className="text-left text-success"> Sign up for free!</h1>
          <div className="form-row">
          <div className="form-group col-md-6">
            <label>Name</label>
            <input name="name" value={name} className="form-control" type="text" placeholder="Enter your name" onChange={(e) => onChange(e)}/>
          </div>
          <div className="form-group col-md-6">
            <label>Phone</label>
            <input name="phoneno" value={phoneno} className="form-control" type="text" placeholder="Enter your phone number" onChange={(e) => onChange(e)}/>
            <small id="emailHelp" className="form-text text-muted">Your phone number will not be shared unless you allow</small>
          </div>
          </div>
          <div className="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input name="email" value={email} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={(e) => onChange(e)}/>
          </div>
          <div className="form-row">
          <div className="form-group col-md-6">
            <label for="exampleInputPassword1">Password</label>
            <input name="password" value={password} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={(e) => onChange(e)}/>
          </div>
          <div className="form-group col-md-6">
            <label for="exampleInputPassword2">Confirm password</label>
            <input name="password2" value={password2} type="password" className="form-control" id="exampleInputPassword2" placeholder="Confirm password" onChange={(e) => onChange(e)}/>
          </div>
          </div>
          <div className="form-group">
          <label for="location">Choose Location</label>
            <select className="form-control" name='location' onChange={(e) => onChange(e)}>
              <option value={location}>Faisalabad</option>
              <option value={location}>Islamabad</option>
              <option value={location}>Karachi</option>
              <option value={location}>Lahore</option>
              <option value={location}>Peshawar</option>
              <option value={location}>Rawalpindi</option>
            </select>
          </div>
          <button type="submit" className="btn btn-success" disabled={signupdata.disable}>Sign up</button>
          </form>
        </div>
        
    )
}