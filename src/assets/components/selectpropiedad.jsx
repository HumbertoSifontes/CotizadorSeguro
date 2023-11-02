import React from 'react';

const SelectPropiedad = React.forwardRef((props, ref) => {
    const { selectPropiedad, setSelectPropiedad, datosPropiedad } = props;

    return (
        <div className="mb-3">
            <label htmlFor="propiedad">Selecciona el tipo de propiedad</label>
            <select
                id="propiedad"
                value={selectPropiedad}
                onChange={(e) => setSelectPropiedad(e.target.value)}
                ref={ref}
            >
                <option value="...">...</option>
                {datosPropiedad.map((elemento) => (
                    <option key={elemento.tipo} value={elemento.factor}>
                        {elemento.tipo}
                    </option>
                ))}
            </select>
        </div>
    );
});

export default SelectPropiedad;
