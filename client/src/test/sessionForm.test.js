import { afterEach, beforeEach, expect } from '@jest/globals';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import SessionForm from "../components/form/SessionForm";
import { Provider } from 'react-redux';
import { store } from '../app/store';
import '@testing-library/jest-dom/extend-expect';
import {cleanup, render, screen} from './test-utils'

describe('SessionForm component Tests', () => {
// Renders the necesary stuff
beforeEach(() => {
  render(
    <Provider store={store}>
      <BrowserRouter>
          <SessionForm />
      </BrowserRouter>
    </Provider>
  );
});

// Clears all renders
afterEach(() => {
  cleanup();
});

describe('Rendering test for SessionForm component', () => {
    it ('SessionForm add session button', () => {
      expect(screen.getByTestId('add-session-btn')).toBeInTheDocument();
    });

    it ('SessionForm add sessions input', () => {
      expect(screen.getByTestId('add-session-input')).toBeInTheDocument();
    });
    
    it ('SessionForm complete sessions button', () => {
      expect(screen.getByTestId('complete-session-btn')).toBeInTheDocument();
    });
    
    it ('Should render objectives form', () => {
      expect(screen.getByTestId('objectives-form')).toBeInTheDocument();
    });
  });
});