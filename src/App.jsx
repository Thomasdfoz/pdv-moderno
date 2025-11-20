import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { PDV } from './pages/PDV';
import { Products } from './pages/Products';
import { Sales } from './pages/Sales';

function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/pdv" element={<PDV />} />
            <Route path="/produtos" element={<Products />} />
            <Route path="/vendas" element={<Sales />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;
