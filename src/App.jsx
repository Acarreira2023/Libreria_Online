import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout.jsx';
import Home from './views/Home/Home.jsx';
import ItemListContainer from './views/ItemListContainer/ItemListContainer.jsx';
import ItemDetailContainer from './views/ItemDetailContainer/ItemDetailContainer.jsx';
import CartView from './views/CartView/CartView.jsx';
import Login from './views/Login/Login.jsx';
import Perfil from './views/Perfil/Perfil.jsx';
import AdminDashboard from './views/AdminDashboard/AdminDashboard.jsx';
import Nosotros from './views/Nosotros/Nosotros.jsx';
import NotFound from './views/NotFound/NotFound.jsx';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<ItemListContainer />} />
        <Route path="/producto/:id" element={<ItemDetailContainer />} />
        <Route path="/carrito" element={<CartView />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/perfil" 
          element={
            <ProtectedRoute>
              <Perfil />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;

