import React from 'react';

function NavBar() {
  const linkStyle = {
    position: 'absolute',
    left: 15,
    top: 8,
    fontSize: '2rem',
    textDecoration: 'none', 
    color: 'black', 
    cursor: 'default', 
    transition: 'color 0.3s' 
  };

  const hoverStyle = {
    color: '#007bff' 
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a href="/" style={linkStyle} onMouseEnter={(e) => e.target.style.color = '#007bff'} onMouseLeave={(e) => e.target.style.color = 'black'}>
          NineDimensions
        </a>
      </div>
    </nav>
  );
}

export default NavBar;
