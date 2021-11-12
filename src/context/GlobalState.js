import React, { createContext, useReducer, useEffect } from 'react';
import AppReducer from './AppReducer';

// Initial state
const initialState = {
  transactions: []
}

// Create context
export const GlobalContext = createContext();

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState, () => {
    const localData = localStorage.getItem('transactions');
    return localData ? {
      transactions: JSON.parse(localData)
    } : initialState;
  });


  /*useEffect(() => {
    const transacciones = JSON.parse(localStorage.getItem('transactions'))
    
    if (transacciones) {
      setTransacciones(transacciones);
      console.log(transacciones);
    }
}, [])*/

  useEffect(() => { 
    localStorage.setItem('transactions', JSON.stringify(state.transactions));
  }, [state]);


  // Actions
  function deleteTransaction(id) {
    dispatch({
      type: 'DELETE_TRANSACTION',
      payload: id
    });
  }

  function addTransaction(transaction) {
    dispatch({
      type: 'ADD_TRANSACTION',
      payload: transaction
    });
  }

  return (<GlobalContext.Provider value={{
    transactions: state.transactions,
    deleteTransaction,
    addTransaction
  }}>
    {children}
  </GlobalContext.Provider>);
}