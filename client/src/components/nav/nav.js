import "./navv.css";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import { useHistory } from 'react-router-dom';
import Logo from "../../assets/EWLogo.svg"



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

        <nav className="navbar navbar-expand-lg navbar-light bg-white">
  <a className="navbar-brand" href="/"><img src={Logo} width="100" height="50" alt="logo"></img></a>
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
      <Link className="link-style ml-3" to="/viewmap">
      <li>PROPERTY FINDER </li>    
      </Link>
      <Link className="link-style ml-3" to="/createad">
      <li>ADVERTISE</li>    
      </Link>
      <Link className="link-style ml-3" to={{pathname:"/placestostay"}}>
      <li>PLACES TO STAY</li>    
      </Link>
      <Link className="link-style ml-3" to="/host">
      <li>BECOME A HOST</li>    
      </Link>
      

    </ul>
    <div class="btn-group">
      <button type="button" class="btn btn-sm btn-success dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        More
      </button>
      <div class="dropdown-menu">
          <li class="nav-item">
            <Link class="dropdown-item" to='/predict'>Predict property price</Link>
          </li>
      </div>
    </div>
    {loggedin?
    <div class="btn-group" style={{marginRight:'50px', marginLeft:"5px"}}>
  <button type="button" class="btn btn-danger btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Account
  </button>
  <div class="dropdown-menu">
    <a class="dropdown-item" href="#">Inbox</a>
    <a class="dropdown-item" href="#">Liked posts</a>
    <a class="dropdown-item" href="#">Account settings</a>
    <div class="dropdown-divider"></div>
    <a class="dropdown-item" href="#">Logout</a>
  </div>
  </div>: 
  <button className="btn btn-sm btn-outline-success my-2 my-sm-0 text-success signin" style={{marginRight:'50px', marginLeft:"5px"}} onClick={() => history.push('/signin')} >Sign in</button>}
    
  </div>
  
  
</nav>
    )
}