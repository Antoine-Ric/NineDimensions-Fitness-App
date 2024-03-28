import React from 'react';

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar" href="/" style={{ position: 'absolute', left: 15, top: 8, fontSize: '2rem' }}>
          NineDimensions
        </a>
        <a className="nav-link" href="/about" style={{ position: 'absolute', right: 100, top: 9, fontSize: '1.75rem' }}>
          About
        </a>
        <a className="nav-link" href="/mission" style={{ position: 'absolute', left: 1210, top: 9, fontSize: '1.75rem' }}>
          Mission
        </a>
      </div>
    </nav>
  );
}

export default NavBar;

