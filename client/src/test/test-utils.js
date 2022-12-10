import React from 'react';
import { render as rtlRender } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import userReducer from '../features/userSlice'
import { store } from '../app/store'
import { Routes, Route } from 'react-router-dom';

// Custom render function for redux testing
// const render = ( ui, {initialState, store = configureStore(login(), initialState), ...renderOptions} = {}) => {
//   const Wrapper = ({ children }) => {
//     return <Provider store={store}>{children}</Provider>
//   }
//   return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
// }

// const render = (children) => {  
//   return <Provider store={store}>{children}</Provider>
// }

// Segundo vídeo
const render = (children) => rtlRender(
  // <Routes>
  //   <Route path='/__test__' element={
      <Provider store={store}>
        {children}
      </Provider>
  //   }/>
  // </Routes>
)

export { render };
export * from '@testing-library/react'
