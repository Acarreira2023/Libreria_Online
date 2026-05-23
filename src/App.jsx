import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout.jsx';
import Home from './views/Home/Home.jsx';
import ItemListContainer from './views/ItemListContainer/ItemListContainer.jsx';
import ItemDetailContainer from './views/ItemDetailContainer/ItemDetailContainer.jsx';
import CartView from './views/CartView/CartView.jsx';
import NotFound from './views/NotFound/NotFound.jsx';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<ItemListContainer />} />
        <Route path="/producto/:id" element={<ItemDetailContainer />} />
        <Route path="/carrito" element={<CartView />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
