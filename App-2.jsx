import { useState } from 'react';

const products = [
  { name: 'Pepsi 33cl', price: 4 },
  { name: 'Ice Tea 33cl', price: 4 },
  { name: 'Red Bull 25cl', price: 5 },
  { name: 'Pinte Fada Blonde 50cl', price: 8 },
];

export default function App() {
  const [cart, setCart] = useState([]);
  const [payment, setPayment] = useState(null);
  const [history, setHistory] = useState([]);
  const [total, setTotal] = useState(0);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.name === product.name);
      if (existing) {
        return prev.map((p) =>
          p.name === product.name ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const encaisser = () => {
    if (cart.length === 0 || !payment) return;
    const totalCart = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);
    setHistory([...history, { cart, payment, total: totalCart }]);
    setTotal((prev) => prev + totalCart);
    setCart([]);
    setPayment(null);
  };

  const totalToPay = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);

  return (
    <div style={{ padding: '1rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Encaissement - Bar 1</h1>
      <h2>Total encaissé : {total} €</h2>

      <div style={{ margin: '1rem 0' }}>
        <h3>Ajouter un article :</h3>
        {products.map((p) => (
          <button
            key={p.name}
            onClick={() => addToCart(p)}
            style={{ margin: '0.5rem' }}
          >
            {p.name} - {p.price} €
          </button>
        ))}
      </div>

      <div style={{ margin: '1rem 0' }}>
        <h3>Panier :</h3>
        {cart.length === 0 && <p>Aucun article</p>}
        <ul>
          {cart.map((item) => (
            <li key={item.name}>
              {item.name} x{item.quantity} — {item.price * item.quantity} €
            </li>
          ))}
        </ul>
        <p><strong>Total à encaisser : {totalToPay} €</strong></p>
      </div>

      <div style={{ margin: '1rem 0' }}>
        <h3>Mode de paiement :</h3>
        {['CB', 'Espèces'].map((m) => (
          <button
            key={m}
            onClick={() => setPayment(m)}
            style={{
              margin: '0.5rem',
              backgroundColor: payment === m ? '#cfe2ff' : ''
            }}
          >
            {m}
          </button>
        ))}
      </div>

      <button
        onClick={encaisser}
        disabled={cart.length === 0 || !payment}
        style={{ padding: '0.5rem 1rem', marginTop: '1rem' }}
      >
        Encaisser {totalToPay} €
      </button>

      <div style={{ marginTop: '1rem' }}>
        <h3>Historique :</h3>
        <ul>
          {history.map((entry, i) => (
            <li key={i}>
              {entry.cart.map((p) => `${p.name} x${p.quantity}`).join(', ')} — {entry.total} € ({entry.payment})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
