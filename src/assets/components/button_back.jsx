import React, { useState } from 'react';

function ButtonBack() {
  const [efectoActivo, setEfectoActivo] = useState(false);

  const activarEfecto = () => {
    setEfectoActivo(true);
    setTimeout(() => {
      setEfectoActivo(false);
    }, 2000)
  };

  return (
    <button
      className={`btn_form ${efectoActivo ? 'activo' : ''} btn-lg`}
      onClick={() => {
        activarEfecto();
      }}
      type={"submit"}
    >
      <span className='botonName'>Volver</span>
    </button>
  );
}

export default ButtonBack;