import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import ShoppingList from './ShoppingList';
import PurchaseHistory from './PurchaseHistory'; // Página do histórico de compras

// Componente para Layout Global
function Layout({ children }) {
  return (
    <div className="layout">
      <header className="header">
        <h1>Loja de Compras Eldória</h1>
      </header>
      <main className="main-content">{children}</main>
      <footer className="footer">
        <p>© 2024 Loja Eldória</p>
      </footer>
    </div>
  );
}

// Componente de Rota Protegida
function ProtectedRoute({ isAuthenticated, children }) {
  return isAuthenticated ? children : <Navigate to="/" />;
}

function App() {
  // Simulação de autenticação
  const isLoggedIn = true; // Altere para `false` para testar o redirecionamento

  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Página de Login */}
          <Route path="/" element={<LoginForm />} />

          {/* Página da Lista de Compras com Rota Protegida */}
          <Route
            path="/shopping-list"
            element={
              <ProtectedRoute isAuthenticated={isLoggedIn}>
                <Layout>
                  <ShoppingList />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Página do Histórico de Compras com Rota Protegida */}
          <Route
            path="/purchase-history"
            element={
              <ProtectedRoute isAuthenticated={isLoggedIn}>
                <Layout>
                  <PurchaseHistory />
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
