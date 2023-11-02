import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ButtonBack from '../components/button_back';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

function Historial() {
  const [historialCotizaciones, setHistorialCotizaciones] = useState(
    JSON.parse(localStorage.getItem('historialCotizaciones')) || []
  );

  const handleRemove = (index) => {
    const updatedHistorial = [...historialCotizaciones];
    updatedHistorial.splice(index, 1);
    setHistorialCotizaciones(updatedHistorial);
    localStorage.setItem('historialCotizaciones', JSON.stringify(updatedHistorial));
    toast.success('Cotización borrada del historial', {
      duration: 3000,
      style: {
        border: '3px solid #0bec30',
        padding: '16px',
      },
  });
  };

  const handleClearAll = () => {
    setHistorialCotizaciones([]);
    localStorage.removeItem('historialCotizaciones');
    toast.success('Historial borrado con éxito!', {
      duration: 3000,
      style: {
        border: '3px solid #0bec30',
        padding: '16px',
      },
  });
  };

  return (
    <div className="container-fluid formulario card text-center rotate-scale-up-horizontal col-md-12 p-0 pb-4">
      <div className="titulo">
        <h1 className="center separador">Historial</h1>
      </div>
      <div className=" center div-cotizador">
        <table>
          <thead>
            <tr>
              <th>Fecha de cotización</th>
              <th>Propiedad</th>
              <th>Ubicación</th>
              <th>Metros cuadrados</th>
              <th>Póliza mensual</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {historialCotizaciones.map((fila, index) => (
              <tr key={index}>
                <td>{fila.fechaCotizacion}</td>
                <td>{fila.propiedad}</td>
                <td>{fila.ubicacion}</td>
                <td>{fila.metrosCuadrados}</td>
                <td>$ {fila.poliza}</td>
                <td>
                  <button className='btn_delete' onClick={() => handleRemove(index)}>
                    <FaTrash/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className='btn_delete' onClick={handleClearAll}>
          <span className='botonName'>Limpiar Historial</span>
      </button>
      <Link to="/">
          <ButtonBack />
      </Link>
    </div>
  );
}

export default Historial;
