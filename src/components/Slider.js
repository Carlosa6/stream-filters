import React from 'react'

export default function Slider({ min, max, value,unit, handleChange }) {
    return (
        <div className="d-flex align-items-center justify-content-center my-4 mx-2">
            <span className="font-weight-bold mr-2">Rango</span>
            <form className="range-field w-75">
                <input 
                    className="border-0 w-75" 
                    type="range" 
                    min={min} 
                    max={max} 
                    value={value} 
                    onChange={handleChange} 
                />
            </form>
            <span className="font-weight-bold text-dark ml-2 mt-1 valueSpan">{value}{unit}</span>
        </div>
    )
}
