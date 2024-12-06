import React, { useState } from 'react';

function ProductForm({ onAddProduct }) {
  // Lista de produtos
  const products = [
    { name: 'Espada Longa', price: 10 },
    { name: 'Machado de Guerra', price: 15 },
    { name: 'Maça da Vida', price: 5 },
    { name: 'Arco e Flecha', price: 20 },
    { name: 'Escudo de Madeira', price: 5 },
    { name: 'Besta', price: 25 },
    { name: 'Armadura de Couro', price: 30 },
  ];

  const [product, setProduct] = useState(products[0]); // Produto inicial selecionado
  const [quantity, setQuantity] = useState(1); // Quantidade inicial

  const handleSubmit = (e) => {
    e.preventDefault();
    if (quantity < 1) return; // Prevenir envio de quantidade inválida
    onAddProduct(product, quantity); // Adiciona o produto ao carrinho
    setQuantity(1); // Reseta a quantidade após adicionar
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <label htmlFor="product-select">
        Produto
        <select
          id="product-select"
          value={product.name}
          onChange={(e) =>
            setProduct(products.find((item) => item.name === e.target.value))
          }
        >
          {products.map((item, index) => (
            <option key={index} value={item.name}>
              {item.name} - R${item.price}
            </option>
          ))}
        </select>
      </label>

      <label htmlFor="quantity">
        Qtde.
        <input
          id="quantity"
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
        />
      </label>

      <button type="submit">Adicionar</button>
    </form>
  );
}

export default ProductForm;
