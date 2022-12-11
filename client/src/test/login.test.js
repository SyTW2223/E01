import { afterEach, beforeEach, expect, it } from '@jest/globals';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Login from "../components/Login";
import '@testing-library/jest-dom/extend-expect';
import {cleanup, render, screen} from './test-utils'

describe('Login component Tests', () => {
  // Renders the necesary stuff
  beforeEach(() => {
    mockHandler = jest.fn();
    render(<BrowserRouter><Login /></BrowserRouter>);
  });

  // Clears all renders
  afterEach(() => {
    cleanup();
  });
  
  describe('Rendering test for Login component', () => {
    it ('Should render', () => {
      expect(screen.getByText(/sign up/i)).toBeInTheDocument();
    });
    
    it ('Should have a button', () => {
      expect(screen.getByRole('button'));
    });

    it ('Should have link to register', () => {
      expect(screen.getByRole('link'));
    });

    it ('Should have a form', () => {
      expect(screen.findByRole('form'));
    });

    it ('Should have inputs where give information for the login', () => {
      expect(screen.findByRole('input'));
    });
  });
});

