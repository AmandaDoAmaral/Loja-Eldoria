import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductForm from './ProductForm';
import Cart from './Cart';
import './ShoppingList.css';

function ShoppingList() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [history, setHistory] = useState([]); // Estado para o histórico de compras
  const navigate = useNavigate();

  // Adiciona um produto ao carrinho
  const handleAddProduct = (product, quantity) => {
    const productTotal = product.price * quantity;
    const existingProductIndex = cart.findIndex((item) => item.name === product.name);

    if (existingProductIndex !== -1) {
      // Se o produto já estiver no carrinho, atualiza a quantidade
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += quantity;
      setCart(updatedCart);
    } else {
      // Se não estiver no carrinho, adiciona o produto
      setCart([...cart, { ...product, quantity }]);
    }

    // Atualiza o total do carrinho
    setTotal(total + productTotal);
  };

  // Limpa o carrinho e reseta o histórico
  const handleClearCart = () => {
    setCart([]); // Limpa o carrinho
    setTotal(0); // Reseta o total
  };

  // Adiciona os itens do carrinho ao histórico e navega para a página de histórico
  const handleViewHistory = () => {
    const updatedHistory = [...history, ...cart]; // Adiciona os itens do carrinho ao histórico
    setHistory(updatedHistory); // Atualiza o estado do histórico
    setCart([]); // Limpa o carrinho após transferir para o histórico
    navigate('/purchase-history', { state: { history: updatedHistory } }); // Navega para a página de histórico com os dados
  };

  // Função para calcular o total de itens no carrinho
  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <div className="shopping-list">
      <header>
        <h1>
          <span>Lista de</span> compras
        </h1>
      </header>
      <div className="shopping-content">
        <aside className="sidebar">
          <ProductForm onAddProduct={handleAddProduct} />
        </aside>

        <main className="main-content">
          <section className="cart-section">
            {/* Exibe o carrinho com total e a opção de limpar o carrinho */}
            <Cart cart={cart} total={total} onClearCart={handleClearCart} />

            {/* Exibe o total de itens no carrinho se houver itens */}
            {cart.length > 0 && (
              <p className="cart-total-text">
                Total de itens no carrinho: <strong>{getTotalItems()}</strong>
              </p>
            )}

            {/* Botão para ver o histórico de compras */}
            <button className="history-button" onClick={handleViewHistory}>
              Ver Histórico de Compras
            </button>
          </section>
        </main>
      </div>
    </div>
  );
}

export default ShoppingList;
