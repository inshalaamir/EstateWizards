import "./navv.css";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import { useHistory } from 'react-router-dom';



export default function Nav(){
  const history = useHistory()
    const loggedin=useSelector(state=>state.authreducer.islogged)
    return( 
        // <nav>
        //     <h3>Logo</h3>
        //     <ul className="nav-links">
        //         {!loggedin ?<Link className="link-style" to="/signin">
        //             <li>Sign In</li>
        //         </Link>:''}
        //         {!loggedin ?
        //         <Link className="link-style" to="/signup">
        //             <li>Sign Up</li>    
        //         </Link>: ''}

        //         {loggedin ?
        //         <Link className="link-style" to="/logout">
        //             <li>logout</li>    
        //         </Link>: ''}

                

                
        //     </ul> 

        // </nav>

        <nav className="navbar navbar-expand-lg navbar-light bg-success">
  <a className="navbar-brand" href="/">&nbsp;<i className="fas fa-home"></i></a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav m-auto">
 
      <Link className="link-style ml-3" to="/">
      <li className="nav-item">BUY</li>    
      </Link>
      <Link className="link-style ml-3" to="/rent">
      <li>RENT</li>    
      </Link>
      <Link className="link-style ml-3" to="/createad">
      <li>ADVERTISE</li>    
      </Link>
      <Link className="link-style ml-3" to="/">
      <li>PLACES TO STAY</li>    
      </Link>
      <Link className="link-style ml-3" to="/">
      <li>BECOME A HOST</li>    
      </Link>
      

    </ul>
    <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          More
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <li class="nav-item">
            <Link to='/predict'>Predict property price</Link>
          </li>
        </div>
      </li>
    {loggedin?<li class="nav-item dropdown" style={{marginRight:'50px'}}>
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Account
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li>: 
  <button className="btn btn-outline-danger my-2 my-sm-0 text-white" style={{marginRight:'50px'}} onClick={() => history.push('/signin')} >Sign in</button>}
    
  </div>
  
  
</nav>
    )
}