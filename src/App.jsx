import { Routes, Route } from 'react-router-dom'; {/* importamos las rutas y las rutas */}
import Navbar from './components/Navbar'; {/* importamos la barra de navegacion */}
import Home from './pages/Home'; {/* importamos la pagina principal */}
import RestaurantDetail from './pages/RestaurantDetail'; {/* importamos la pagina de detalle del restaurante */}

function App() {
  return (
    <div>
      <Navbar /> {/* mostramos la barra de navegacion */}
      <Routes> {/* definimos las rutas de la aplicacion */}
        <Route path="/" element={<Home />} /> {/* ruta para la pagina principal */}
        <Route path="/restaurant/:id" element={<RestaurantDetail />} /> {/* ruta para la pagina de detalle del restaurante */}
      </Routes>
    </div>
  );
}

export default App;
