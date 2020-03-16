import React from 'react';
import { Navbar, NavbarBrand} from 'reactstrap';

function App() {
  return (
    <div>
      <Navbar dark color="primary">
        <div className="container">
          <NavbarBrand href="/">Ristorante ConFusion</NavbarBrand>
        </div>
      </Navbar>
    </div>
  );
}

export default App;
