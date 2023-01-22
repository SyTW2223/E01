import { afterEach, beforeEach, expect } from '@jest/globals';
import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import PreviousSession from "../components/PreviousSession";
import { Provider } from 'react-redux';
import { store } from '../app/store';
import '@testing-library/jest-dom/extend-expect';
import {cleanup, render, screen} from './test-utils';

describe('PreviousSession component Tests', () => {
// Renders the necesary stuff
beforeEach(() => {
  render(
    <Provider store={store}>
      <Router>
          <PreviousSession />
      </Router>
    </Provider>
  );
});

// Clears all renders
afterEach(() => {
  cleanup();
});

describe('Rendering test for PreviousSession component', () => {
    it ('PreviousSession filter input', () => {
      expect(screen.getByTestId('filter-input')).toBeInTheDocument();
    });

    it ('PreviousSession previous sessions button', () => {
      expect(screen.getByTestId('filter-box')).toBeInTheDocument();
    });
  });
});