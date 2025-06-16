import { useState } from 'react';

const products = [
  { name: 'Pepsi 33cl', price: 4 },
  { name: 'Ice Tea 33cl', price: 4 },
  { name: 'Red Bull 25cl', price: 5 },
  { name: 'Pinte Fada Blonde 50cl', price: 8 },
];

export default function App() {
  const [selected, setSelected] = useState(null);
  const [payment, setPayment] = useState(null);
  const [total, setTotal] = useState(0);
  const [history, setHistory] = useState([]);

  const encaisser = () => {
    if (!selected || !payment) return;
    const entry = { ...selected, payment };
    setHistory([...history, entry]);
    setTotal(total + selected.price);
    setSelected(null);
    setPayment(null);
  };

  return (
    <div style={{ padding: '1rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Encaissement - Bar 1</h1>
      <h2>Total : {total} €</h2>

      <div style={{ margin: '1rem 0' }}>
        <h3>Choisir un produit :</h3>
        {products.map((p) => (
          <button key={p.name} onClick={() => setSelected(p)} style={{ margin: '0.5rem' }}>
            {p.name} - {p.price} €
          </button>
        ))}
      </div>

      <div style={{ margin: '1rem 0' }}>
        <h3>Mode de paiement :</h3>
        {['CB', 'Espèces'].map((m) => (
          <button key={m} onClick={() => setPayment(m)} style={{ margin: '0.5rem' }}>
            {m}
          </button>
        ))}
      </div>

      <button onClick={encaisser} disabled={!selected || !payment}>
        Encaisser
      </button>

      <div style={{ marginTop: '1rem' }}>
        <h3>Historique :</h3>
        <ul>
          {history.map((e, i) => (
            <li key={i}>{e.name} - {e.price} € ({e.payment})</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
