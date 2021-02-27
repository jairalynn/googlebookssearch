import React from "react";


function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="/">
        React Google Search
      </a>
      <a className="nav-link" href="/">
        Search
      </a>
      <a className="nav-link" href="/save">
        Saved Books
      </a>
    </nav>
  );
}

export default Nav;
