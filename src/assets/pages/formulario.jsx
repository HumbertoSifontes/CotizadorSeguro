import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ButtonForm from '../components/button_form';
import { toast } from 'react-hot-toast';
import SelectPropiedad from '../components/selectpropiedad';
import SelectUbicacion from '../components/selectubicacion';
import InputMetros from '../components/inputmetros';

const datosPropiedad = [
    { tipo: '...', factor: '' },
    { tipo: 'Casa', factor: 1.09 },
    { tipo: 'P.H.', factor: 1.05 },
    { tipo: 'Depto. Edificio', factor: 1.02 },
    { tipo: 'Barrio Privado', factor: 1.19 },
    { tipo: 'Oficina', factor: 2.39 },
    { tipo: 'Local Comercial', factor: 1.41 },
    { tipo: 'Depósito Logística', factor: 1.92 },
];

const datosUbicacion = [
    { tipo: '...', factor: '' },
    { tipo: 'CABA', factor: 1.13 },
    { tipo: 'Tandil', factor: 1.04 },
    { tipo: 'Costa Atlántica', factor: 1.29 },
    { tipo: 'Patagonia', factor: 1.00 },
];

const av = "https://daibelisl.github.io/datosJSONCotizador/datos.json";
const costoM2 = 35.86;

class Cotizador {
  constructor(costoM2, factorPropiedad, factorUbicacion, metros2) {
    this.costoM2 = parseFloat(costoM2);
    this.factorPropiedad = parseFloat(factorPropiedad);
    this.factorUbicacion = parseFloat(factorUbicacion);
    this.metros2 = parseInt(metros2);
  }

  cotizarPoliza() {
    let resultado = this.costoM2 * this.factorPropiedad * this.factorUbicacion * this.metros2;
    return resultado.toFixed(2);
  }
}

const fetchLocal = (selectPropiedadRef, selectUbicacionRef) => {
    cargarCombo(datosPropiedad, selectPropiedadRef);
    cargarCombo(datosUbicacion, selectUbicacionRef);
}

const cargarCombo = (array, select) => {
    select.innerHTML = ''; 
    array.forEach((elemento) => {
        select.innerHTML += `<option value="${elemento.factor}">${elemento.tipo}</option>`;
    });
};

const Form = () => {
    const [selectPropiedad, setSelectPropiedad] = useState('');
    const [selectUbicacion, setSelectUbicacion] = useState('');
    const [inputMetros2, setInputMetros2] = useState(20);
    const [valorPoliza, setValorPoliza] = useState(0);
    const [btnEnviarVisible, setBtnEnviarVisible] = useState(false);
    const [datos, setDatos] = useState(null);
    const [cotizacionExitosa, setCotizacionExitosa] = useState(false);
    const selectPropiedadRef = useRef(null);
    const selectUbicacionRef = useRef(null);
    const inputMetros2Ref = useRef(null);

    useEffect(() => {
        if (selectPropiedadRef.current && selectUbicacionRef.current) {
            fetchLocal(selectPropiedadRef.current, selectUbicacionRef.current);
        }
        fetch(av)
            .then((response) => {
                if (!response.ok) {
                throw new Error('La solicitud falló con estado: ' + response.status);
                }
                return response.json();
            })
            .then((data) => {
                setDatos(data);         
                cargarCombo(datosPropiedad, selectPropiedadRef.current);
                cargarCombo(datosUbicacion, selectUbicacionRef.current);
            }) 
            .catch((error) => {
                console.error('Error en la solicitud fetch:', error);
                alert('Error inesperado', 'Se ha producido un error. Intente nuevamente, por favor.', 'error');
            });

    }, []);

    const datosCompletos = () =>
        selectPropiedad !== '' && selectUbicacion !== '' && inputMetros2 >= 20;

    const cotizo = () => {
        if (selectPropiedad === '' || selectUbicacion === '') {
            toast.error('Debes completar todos los datos en pantalla.', {
                duration: 3000,
                style: {
                    border: '3px solid #ec0b0b',
                    padding: '16px',
                },
            });
        } else {
            const coti = new Cotizador(costoM2, selectPropiedad, selectUbicacion, inputMetros2);
            setValorPoliza(coti.cotizarPoliza());
            setBtnEnviarVisible(true);
            setCotizacionExitosa(true);
        }
    };

    const realizarCotizacion = () => {
        if (datosCompletos()) {
            cotizo();
            toast.success('Cotización realizada con éxito!', {
                duration: 3000,
                style: {
                    border: '3px solid #0bec30',
                    padding: '16px',
                },
            });
        } else {
            toast.error('Debes completar todos los datos en pantalla.', {
            duration: 3000,
            style: {
                border: '3px solid #ec0b0b',
                padding: '16px',
              },
            });
        }
    };

    const guardarEnHistorial = () => {
        if (datosCompletos()) {
            cotizo();
            const propiedadSeleccionada = selectPropiedadRef.current;
            const ubicacionSeleccionada = selectUbicacionRef.current;
    
            if (propiedadSeleccionada && ubicacionSeleccionada) {
                const propiedad = propiedadSeleccionada.options[propiedadSeleccionada.selectedIndex].text;
                const ubicacion = ubicacionSeleccionada.options[ubicacionSeleccionada.selectedIndex].text;
    
                const cotizacion = {
                    fechaCotizacion: new Date().toLocaleString(),
                    propiedad,
                    ubicacion,
                    metrosCuadrados: inputMetros2,
                    poliza: valorPoliza,
                };
    
                const historialCotizaciones = JSON.parse(localStorage.getItem('historialCotizaciones')) || [];
                historialCotizaciones.push(cotizacion);
                localStorage.setItem('historialCotizaciones', JSON.stringify(historialCotizaciones));
                setBtnEnviarVisible(false);
                toast.success('Cotización guardada con éxito!', {
                    duration: 3000,
                    style: {
                        border: '3px solid #0bec30',
                        padding: '16px',
                    },
                });
            }
        } else {
            toast.error('Debes completar todos los datos en pantalla.', {
                duration: 3000,
                style: {
                    border: '3px solid #ec0b0b',
                    padding: '16px',
                },
            });
        }
    };

    return (
        <div className="container-fluid formulario card text-center pb-2 scale-up-center col-md-12 p-0 pt-4 pb-4">
            <h1 className="center separador">Seguros del hogar</h1>
            <form className="p-4.m-auto" onSubmit={(e) => e.preventDefault()}> 
                <div className="row">
                    <div className="col-md-12">
                        <SelectPropiedad
                            selectPropiedad={selectPropiedad}
                            setSelectPropiedad={setSelectPropiedad}
                            datosPropiedad={datosPropiedad}
                            ref={selectPropiedadRef}
                        />
                    </div>
                    <div className="col-md-12">
                        <SelectUbicacion
                            selectUbicacion={selectUbicacion}
                            setSelectUbicacion={setSelectUbicacion}
                            datosUbicacion={datosUbicacion}
                            ref={selectUbicacionRef}
                        />
                    </div>
                    <div className="col-md-12">
                        <InputMetros
                            inputMetros2={inputMetros2}
                            setInputMetros2={setInputMetros2}
                            ref={inputMetros2Ref}
                        />
                    </div>
                </div>
                <ButtonForm realizarCotizacion={realizarCotizacion} />
                <div className="col-md-12 pt-3 pb-3">
                    <p className="importe">
                        Precio estimado: $ <span id="valorPoliza">{valorPoliza}</span>
                        {btnEnviarVisible && (
                            <span className="guardar" title="Guardar en historial" onClick={guardarEnHistorial}>
                            💾
                            </span>
                        )}
                    </p>
                </div>
                <div className="col-md-12 pt-2 pb-3">
                    <Link to="/historial" className='historialink'>
                        Ver Historial
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Form;
