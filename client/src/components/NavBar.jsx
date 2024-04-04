import React from 'react';

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar" href="/" style={{ position: 'absolute', left: 15, top: 8, fontSize: '2rem' }}>
          NineDimensions
        </a>
        
      </div>
    </nav>
  );
}

export default NavBar;

