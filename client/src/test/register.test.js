import { afterEach, beforeEach, expect } from '@jest/globals';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Register from "../components/Register";
import '@testing-library/jest-dom/extend-expect';
import {cleanup, render, screen} from './test-utils'

describe('Register component Tests', () => {
  // Renders the necesary stuff
  beforeEach(() => {
    render(<BrowserRouter><Register /></BrowserRouter>);
  });

  // Clears all renders
  afterEach(() => {
    cleanup();
  });
  
  describe('Rendering test for Register component', () => {
    it ('Should render', () => {
      expect(screen.getByText(/sign in/i)).toBeInTheDocument();
    });
    
    it ('Should have a button', () => {
      expect(screen.getByRole('button'));
    });

    it ('Should have link to login', () => {
      expect(screen.findByRole('link'));
    });

    it ('Should have a form', () => {
      expect(screen.findByRole('form'));
    });

    it ('Should have inputs where give information for the Register', () => {
      expect(screen.findByRole('input'));
    });
  });
});

