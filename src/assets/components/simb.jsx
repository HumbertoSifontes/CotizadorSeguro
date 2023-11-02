import React from 'react';
import simbolo from '../images/logo_argprog.png';
import simbolo2 from '../images/logo_untref.png';

const Simb = () => {

  return (
    <div className="container-fluid barra">
        <div className="navbar-header">
          <img src={simbolo} alt="" className="d-inline-block align-text-top img-fluid arg" />
        </div>
        <div className="navbar-header">
          <img src={simbolo2} alt="" className="d-inline-block align-text-top img-fluid imguntref" />
        </div>
    </div>
  );
};

export default Simb;
