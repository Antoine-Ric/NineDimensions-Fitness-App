import React from 'react';

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar" href="/" style={{ position: 'absolute', left: 10, top: 5, fontSize: '2rem' }}>
          NineDimensions
        </a>
        <a className="nav-link" href="/about" style={{ position: 'absolute', right: 100, top: 9, fontSize: '1.75rem' }} >
          About
        </a>
      </div>
    </nav>
  );
}

export default NavBar;

