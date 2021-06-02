import React, { useState } from "react";
import axios from "axios";
import {Redirect} from "react-router-dom"
import {useSelector,useDispatch} from "react-redux";
import {signedin, forAdmin} from "../../actions"
import {Link} from "react-router-dom";
import {useHistory} from 'react-router-dom'


export default function Signin(){
    const dispatch=useDispatch();
    const history = useHistory()
    

    const [loginData, SetLoginData] = useState({
        email: "",
        password: "",
        dataa:"",
        alert:false,
        redirect:useSelector(state=>state.authreducer.islogged)
    });

    async function login(email, password){
      const config = {
          headers: {
          "Content-Type": "application/json",
        },
      };
    
      const body = {email, password}
      
      if(email=="admin@EW" && password=="12345"){
        dispatch(forAdmin())
        history.push({pathname:'/admin'})
      }
      else{
    
      const res=await axios.post("http://localhost:5000/user/signin",body,config)
      console.log(res.data);
      SetLoginData({ ...loginData, dataa:res.data.userid});
      if(res.data.success){
        
        const recieveddata={id:res.data.userid,name:res.data.name,location:res.data.location,token:res.data.token, }
        dispatch(signedin(recieveddata))
        alert("login sucessfull")
        if(recieveddata){
          SetLoginData({ ...loginData, redirect:true});
        }

      }
      else{
        SetLoginData({ ...loginData, alert:true})
      }
      
    }
    }

    
    
    const { email, password } = loginData;
  
    const onChange = (e) =>
      
      SetLoginData({ ...loginData, [e.target.name]: e.target.value });
  
    const onSubmit = (e) => {
      e.preventDefault();
      if(email==='' || password===''){
        alert("empty fields")
      }
      else{
      console.log(email, password);
      login(email,password)
      }
      
      };
  
    

    
          
    return( 
        
        <div className="container text-left mt-5">
          {loginData.redirect? <Redirect to="/"/>:''}
           
            {/* <h1>Sign In to your account</h1>
            <form onSubmit={(e) => onSubmit(e)}>
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
            <button type="submit">Login</button>
            </form>
            <br />
            <br />
            <br />
            <h6>
            
            </h6> */}
            {loginData.alert? <div class="alert alert-danger" role="alert">Invalid Credentials</div>:''}
          <form onSubmit={(e) => onSubmit(e)}>
          <h1 className="text-left text-success"> Sign in</h1>
          <p>&nbsp;<i class="fas fa-user"></i>   Sign into your account</p>
          <div class="form-group mt-5">
            <label for="exampleInputEmail1">Email address</label>
            <input name="email" value={email} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={(e) => onChange(e)}/>
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input name="password" value={password} type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" onChange={(e) => onChange(e)}/>
          </div>
          <button type="submit" class="btn btn-success">Sign in</button>
          </form>

          <small id="emailHelp" className="form-text text-muted mt-4">Don't have an account? <Link className="text-success" to="/signup">Sign up</Link> </small>
          
        </div>
        
    )
}

