import React, { useState, useEffect, useRef } from 'react'
import './App.css';
import Slider from './components/Slider'
import SidebarItem from './components/SidebarItem'

const DEFAULT_OPTIONS = [
  {
    name: 'Brillo', //brillo
    property: 'brightness',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: "Transparencia",
    property: "opacity",
    value: 100,
    range: {
      min: 0,
      max: 100
    },
    unit: '%'
  },
  {
    name: 'Contraste', //contraste
    property: 'contrast',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Saturación', //saturación
    property: 'saturate',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Blanco y Negro', //escala de grises
    property: 'grayscale',
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: '%'
  },
  {
    name: "Invertir",
    property: "invert",
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: '%'
  },
  {
    name: 'Sepia',
    property: 'sepia',
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: '%'
  },
  {
    name: 'Rotación', //Giro del tono
    property: 'hue-rotate',
    value: 0,
    range: {
      min: 0,
      max: 360
    },
    unit: 'deg'
  },
  {
    name: 'Difuminado',
    property: 'blur',
    value: 0,
    range: {
      min: 0,
      max: 20
    },
    unit: 'px'
  }
]


function App() {

  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0)
  const [options, setOptions] = useState(DEFAULT_OPTIONS)
  const selectedOption = options[selectedOptionIndex]
  const [constraints, setConstraints] = useState({ audio: false, video: true })
  const [wrapper, setWrapper] = useState(false)
  const videoSt = useRef()
  const canvasSt = useRef()

  const toggleNavbar = () => setWrapper(!wrapper);

  function handleSuccess(stream) {
    window.stream = stream;
    videoSt.current.srcObject = stream
  }

  function handleError(error) {
    console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name)
  }

  useEffect(() => {
    navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError)
  }, [])

  function handleSliderChange({ target }) {
    setOptions(prevOptions => {
      return prevOptions.map((option, index) => {
        if (index !== selectedOptionIndex) return option //si no cambia el state, retorna la misma opción
        return { ...option, value: target.value }
      })
    })
  }

  function getImageStyle() {
    const filters = options.map(option => {
      return `${option.property}(${option.value}${option.unit})`
    })
    return { filter: filters.join(' ') }
  }

  function getStyleforCanvas() {
    const filters = options.map(option => {
      return `${option.property}(${option.value}${option.unit}) `
    })
    let estilosCanvas = ""
    filters.forEach(filtro => {
      estilosCanvas += filtro
    })
    return estilosCanvas
  }

  function screenShot() {
    const ctx = canvasSt.current.getContext('2d')
    //ctx.filter = "brightness(190%) opacity(70%) blur(15px)"
    ctx.filter = getStyleforCanvas() //para aplicar los filtros del video al canvas
    ctx.drawImage(videoSt.current, 0, 0, 450, 400)
  }

  return (
    <div className={`d-flex ${wrapper ? 'toggled' : ''}`} id="wrapper">
      {/* SIDEBAR */}
      <div className="bg-dark border-dark" id="sidebar-wrapper">
        <div className="sidebar-heading font-weight-bold text-primary">Video Filters &nbsp;<i className="fas fa-photo-video"></i></div>
        <div className="list-group list-group-flush">
          {options.map((option, index) => {
            return (
              <SidebarItem
                key={index}
                name={option.name}
                active={index === selectedOptionIndex}
                handleClick={() => setSelectedOptionIndex(index)}
              />
            )
          })}
        </div>
      </div>
      {/* SIDEBAR */}

      {/* PAGE CONTENT */}
      <div id="page-content-wrapper">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-dark">
          <button className="btn btn-primary btn-lg" id="menu-toggle" onClick={toggleNavbar}>Filtros</button>

          <button className="bg-danger navbar-toggler" onClick={() => screenShot()}>
            <i className="fas fa-camera fa-2x"></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <button className="btn btn-danger btn-lg ml-auto" onClick={() => screenShot()}><i className="fas fa-camera"></i></button>
          </div>
        </nav>

        <div className="container-fluid">

          <Slider
            min={selectedOption.range.min}
            max={selectedOption.range.max}
            value={selectedOption.value}
            unit={selectedOption.unit}
            handleChange={handleSliderChange}
          />

          <div className="streaming d-flex flex-column">

            <video style={getImageStyle()} playsInline autoPlay ref={videoSt}></video>
            <canvas width="500" height="400" ref={canvasSt}></canvas>

          </div>
        </div>
      </div>
      {/* PAGE CONTENT */}
      {/* <div className="streaming">
        <video style={getImageStyle()} playsInline autoPlay ref={videoSt}></video>
        <canvas width="450" height="400" ref={canvasSt}></canvas>
      </div> */}
    </div>
  );
}

export default App;
