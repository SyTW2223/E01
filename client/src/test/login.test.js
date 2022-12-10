import { afterEach, beforeEach, expect } from '@jest/globals';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Login from "../components/Login";
import {cleanup, render, screen} from './test-utils'

let component;

describe('Login component Tests', () => {
  beforeEach(() => {
    component = render(<BrowserRouter><Login /></BrowserRouter>);
  });

  afterEach(() => {
    cleanup()
  });
  
  describe('Rendering test for Login component', () => {
    test ('Should render', () => {
      expect(component)
    });
  });
});

