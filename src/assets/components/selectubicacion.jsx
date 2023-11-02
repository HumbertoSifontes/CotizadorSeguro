import React from 'react';

const SelectUbicacion = React.forwardRef((props, ref) => {
    const { selectUbicacion, setSelectUbicacion, datosUbicacion } = props;

    return (
        <div className="mb-3">
            <label htmlFor="ubicacion">Selecciona su ubicación</label>
            <select
                id="ubicacion"
                value={selectUbicacion}
                onChange={(e) => setSelectUbicacion(e.target.value)}
                ref={ref}
            >
                <option value="...">...</option>
                {datosUbicacion.map((elemento) => (
                    <option key={elemento.tipo} value={elemento.factor}>
                        {elemento.tipo}
                    </option>
                ))}
            </select>
        </div>
    );
});

export default SelectUbicacion;
