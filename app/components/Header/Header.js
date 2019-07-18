import React from 'react';
import './style.scss';
import NavBar from '../Nav/NavBar';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="header">
        <div className="nav-bar">
          <NavBar/>
        </div>
      </div>
    );
  }
}

export default Header;
