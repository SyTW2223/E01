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
    it ('Sign up Button', () => {
      expect(screen.getByTestId('sign-up-button')).toBeInTheDocument();
    });

    it ('Sign up username input', () => {
      expect(screen.getByTestId('sign-up-username')).toBeInTheDocument();
    });

    it ('Sign up pwd input', () => {
      expect(screen.getByTestId('sign-up-pwd')).toBeInTheDocument();
    });

    it ('Sign In link', () => {
      expect(screen.getByTestId('sign-in-link')).toBeInTheDocument();
    });

    it ('Sign Up Typography', () => {
      expect(screen.getByTestId('sign-up-typography')).toBeInTheDocument();
    });
  });
});