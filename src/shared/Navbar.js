import React from 'react';
import './Navbar.css';


const Navbar = (props) => {
  const cognitoURL = process.env.REACT_APP_COGINTO_URL
  return (
    <nav className='navbar'>
      <div className='navbar-group'>
        <p>You have {props.userGroup} roles</p>
      </div>
      <div className='button-group'>
      {props.userGroup == 'Admins' && 
          <div className='button-group'>
            <button onClick={() => window.open(cognitoURL)} className="amazon-button">
              Manage Groups
            </button>
          </div>
        }
        <button onClick={props.SignOutHandler} className="amazon-button">
          Sign out
        </button>
      </div>
    </nav>
  );
};
  
export default Navbar;