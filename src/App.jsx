import Dashboard from "./pages/Dashboard.jsx"
import Inicio from "./pages/Inicio.jsx"
import Registro from "./pages/Registro.jsx"
import NavBar from './components/NavBar.jsx'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import RecuperarContraseña from "./pages/RecuperarContraseña.jsx"

function App() {
  return (
  <div>
    <NavBar/>
   <main className='pages-adresses'>
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/" element={<Inicio />}/> 
      <Route path="/registro" element={<Registro />}/>
      <Route path="/recuperacion" element={<RecuperarContraseña />}/>
    </Routes>
   </main>
   </div>
  );
}

export default App;
