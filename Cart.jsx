import React from 'react';

function Cart({ cart, total, onClearCart }) {
  return (
    <div className="cart">
      <h2 className="cart-title">Produtos no carrinho</h2>
      <ul className="cart-list">
        {cart.length > 0 ? (
          cart.map((item, index) => (
            <li key={index} className="cart-item">
              <span className="cart-item-name">
                {item.quantity}x {item.name}
              </span>
              <span className="cart-item-price">
                R${(item.price * item.quantity).toFixed(2)}
              </span>
            </li>
          ))
        ) : (
          <li className="cart-empty">Seu carrinho está vazio.</li>
        )}
      </ul>
      <div className="cart-total">
        <h3>Total: R${total.toFixed(2)}</h3>
      </div>
      {cart.length > 0 && (
        <button className="cart-clear-button" onClick={onClearCart}>
          Limpar Carrinho
        </button>
      )}
    </div>
  );
}

export default Cart;
