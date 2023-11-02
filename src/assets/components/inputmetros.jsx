import React from 'react';

const InputMetros = React.forwardRef((props, ref) => {
    const { inputMetros2, setInputMetros2 } = props;

    return (
        <div className="mb-3">
            <label htmlFor="metros2">Ingresa los Metros cuadrados:</label>
            <input
                type="number"
                id="metros2"
                value={inputMetros2}
                min="20"
                max="500"
                required
                onChange={(e) => setInputMetros2(e.target.value)}
                ref={ref}
            />
        </div>
    );
});

export default InputMetros;
