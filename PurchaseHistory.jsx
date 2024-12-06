import React from 'react';
import { useLocation } from 'react-router-dom';
import './PurchaseHistory.css';

function PurchaseHistory() {
  const location = useLocation();
  const history = location.state?.history || []; // Recebe o histórico passado via navegação

  // Função para calcular o valor total de cada item (preço * quantidade)
  const calculateTotal = (item) => {
    return item.price * item.quantity;
  };

  // Função para calcular o total gasto (soma de todos os valores totais)
  const calculateTotalSpent = () => {
    return history.reduce((total, item) => total + calculateTotal(item), 0);
  };

  return (
    <div className="purchase-history">
      <header className="history-header">
        <div className="history-icon">
          <img src="/shopping-cart-icon.png" alt="Histórico" />
          <div className="history-text">
            <h1>Histórico de Compras</h1>
            <p>Local: Loja de Eldória</p>
          </div>
        </div>
      </header>

      <main>
        {/* Novo layout para os cabeçalhos */}
        <div className="history-table-header">
          <div className="table-header-item">Item</div>
          <div className="table-header-item">Qtde</div>
          <div className="table-header-item">Valor Un.</div>
          <div className="table-header-item">Valor Total</div>
        </div>

        {/* Tabela com o histórico de compras */}
        <table className="history-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Qtde</th>
              <th>Valor Un.</th>
              <th>Valor Total</th>
            </tr>
          </thead>
          <tbody>
            {history.map((purchase, index) => (
              <tr key={index}>
                <td>{purchase.name}</td>
                <td>{purchase.quantity}</td>
                <td>R${purchase.price}</td>
                <td>R${calculateTotal(purchase).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Total gasto */}
        <div className="total-spent">
          <h3>Total Gasto: R${calculateTotalSpent().toFixed(2)}</h3>
        </div>
      </main>
    </div>
  );
}

export default PurchaseHistory;
