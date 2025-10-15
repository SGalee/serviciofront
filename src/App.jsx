import Dashboard from "./pages/Dashboard.jsx"
import Inicio from "./pages/Inicio.jsx"
import Registro from "./pages/Registro.jsx"
import NavBar from './components/NavBar.jsx'
import {BrowserRouter, Routes, Route} from "react-router-dom"

function App() {
  return (
  <div>
    <NavBar/>
   <main className='pages-adresses'>
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/" element={<Inicio />}/> 
      <Route path="/registro" element={<Registro />}/>
    </Routes>
   </main>
   </div>
  );
}

export default App;
