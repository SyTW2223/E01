import { afterEach, beforeEach, expect } from '@jest/globals';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Home from "../components/Home";
import '@testing-library/jest-dom/extend-expect';
import {cleanup, render, screen} from './test-utils'

describe('Home component Tests', () => {
  // Renders the necesary stuff
  beforeEach(() => {
    render(<BrowserRouter><Home /></BrowserRouter>);
  });

  // Clears all renders
  afterEach(() => {
    cleanup();
  });
  
  describe('Rendering test for Home component', () => {
    it ('Home Typography', () => {
      expect(screen.getByTestId('home-typography')).toBeInTheDocument();
    });

    it ('Home Form', () => {
      expect(screen.getByTestId('home-form')).toBeInTheDocument();
    });
  });
});