import { Navbar,Nav,Container } from 'react-bootstrap';

import { NavLink } from 'react-router-dom';


const MainNavigation = (props) => {
   
  
    const isLogin = localStorage.getItem("token");
    
    let url;
    if(isLogin===null){
      url="/signup"
    }else{
        url="/login"
    }
    return (
     <header>
      <Navbar sticky="top" className='bg-primary' variant="primary">
          <Container>
            
            <Nav className="navbar navbar-primary bg-primary"  >
              <NavLink className="me-3" style={({isActive})=>isActive?{color:"black"}:{color:"yellow"}} to='/signup'>Signup</NavLink>
              <NavLink className="me-3" style={({isActive})=>isActive?{color:"black"}:{color:"yellow"}} to={url}>Login</NavLink>
              
            </Nav>
          
            
          </Container>
        </Navbar>
   
      
     </header>
    )
}

export default MainNavigation