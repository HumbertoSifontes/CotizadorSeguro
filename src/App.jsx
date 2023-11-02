import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from './assets/pages/formulario';
import ParticlesBackground from './assets/components/particles_background';
import Historial from './assets/pages/historial';
import Simb from './assets/components/simb';
import { Toaster } from 'react-hot-toast';
import DarkMode from './assets/components/DarkMode/DarkMode'

function App() {

  return (
    <div className="App">
      <Router>
        <Simb/>
        <DarkMode/>
        <ParticlesBackground />
        <Routes>
          <Route path = "/" element = {<Form />} />
          <Route path = "/historial" element = {<Historial/>} />
        </Routes>
        <Toaster/>
      </Router>
    </div>
  )
}

export default App
