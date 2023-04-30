import React from 'react';
import './Navbar.css';

const Navbar = (props) => {
    return (
      <nav className='navbar'>
        <div className='navbar-group'>
          <p>You have {props.userGroup} roles</p>
        </div>
        <button onClick={props.SignOutHandler} className="amazon-button">
          Sign out
       </button>
      </nav>
    );
  };
  
  export default Navbar;