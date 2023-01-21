import { afterEach, beforeEach, expect } from '@jest/globals';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from "../components/Navbar";
import { Provider } from 'react-redux';
import { store } from '../app/store';
import '@testing-library/jest-dom/extend-expect';
import {cleanup, render, screen} from './test-utils'

describe('Navbar component Tests', () => {
// Renders the necesary stuff
beforeEach(() => {
  render(
    <Provider store={store}>
      <BrowserRouter>
          <Navbar />
      </BrowserRouter>
    </Provider>
  );
});

// Clears all renders
afterEach(() => {
  cleanup();
});

describe('Rendering test for Navbar component', () => {
    it ('Navbar main button', () => {
      expect(screen.getByTestId('title-btn')).toBeInTheDocument();
    });

    it ('Navbar previous sessions button', () => {
      expect(screen.getByTestId('psessions-btn')).toBeInTheDocument();
    });
    
    it ('Should render account button', () => {
      expect(screen.getByTestId('account-btn')).toBeInTheDocument();
    });
    
    it ('Should render account icon', () => {
      expect(screen.getByTestId('account-icon')).toBeInTheDocument();
    });

    it ('Should render menu', () => {
      expect(screen.getByTestId('navbar-menu')).toBeInTheDocument();
    });

    it ('Should render menu item 1', () => {
      expect(screen.getByTestId('menu-item-1')).toBeInTheDocument();
    });

    it ('Should render menu item 2', () => {
      expect(screen.getByTestId('menu-item-1')).toBeInTheDocument();
    });
  });
});