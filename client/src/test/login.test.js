import { afterEach, beforeEach, expect } from '@jest/globals';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Login from "../components/Login";
import '@testing-library/jest-dom/extend-expect';
import {cleanup, render, screen} from './test-utils'

describe('Login component Tests', () => {
  // Renders the necesary stuff
  beforeEach(() => {
    render(<BrowserRouter><Login /></BrowserRouter>);
  });

  // Clears all renders
  afterEach(() => {
    cleanup();
  });
  
  describe('Rendering test for Login component', () => {
    it ('Sign in Button', () => {
      expect(screen.getByTestId('sign-in-button')).toBeInTheDocument();
    });

    it ('Sign in username input', () => {
      expect(screen.getByTestId('sign-in-username')).toBeInTheDocument();
    });

    it ('Sign in pwd input', () => {
      expect(screen.getByTestId('sign-in-pwd')).toBeInTheDocument();
    });

    it ('Sign In link', () => {
      expect(screen.getByTestId('sign-up-link')).toBeInTheDocument();
    });

    it ('Sign in Typography', () => {
      expect(screen.getByTestId('sign-in-typography')).toBeInTheDocument();
    });
  });
});