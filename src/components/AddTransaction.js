import React, {useState, useContext} from 'react'
import { GlobalContext } from '../context/GlobalState';

export const AddTransaction = () => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState(0);

  const { addTransaction } = useContext(GlobalContext);

  const onSubmit = e => {
    e.preventDefault();

    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text,
      amount: +amount
    }

    addTransaction(newTransaction);

    setText('');
    setAmount(0);
  }

  return (
    <>
      <h3>Agregar nueva transacción</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text">Detalle</label>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Ingrese el detalle..." />
        </div>
        <div className="form-control">
          <label htmlFor="amount"
            >Monto <br />
            (negativ - gasto, positivo - ingreso)</label
          >
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Ingrese el monto..." />
        </div>
        <button className="btn">Agregar Transacción</button>
      </form>
    </>
  )
}
