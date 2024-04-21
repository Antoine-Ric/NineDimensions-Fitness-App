import React from 'react';

function NavBar() {
  const linkStyle = {
    position: 'absolute',
    left: 15,
    top: 8,
    fontSize: '2rem',
    textDecoration: 'none', 
    color: 'inherit', 
    cursor: 'default' 
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a href="/" style={linkStyle}>
          NineDimensions
        </a>
      </div>
    </nav>
  );
}

export default NavBar;
