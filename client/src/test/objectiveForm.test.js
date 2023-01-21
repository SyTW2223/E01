import { afterEach, beforeEach, expect } from '@jest/globals';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ObjectiveForm from "../components/form/ObjectiveForm";
import { Provider } from 'react-redux';
import { store } from '../app/store';
import '@testing-library/jest-dom/extend-expect';
import {cleanup, render, screen} from './test-utils'

describe('ObjectiveForm component Tests', () => {
// Renders the necesary stuff
beforeEach(() => {
  const simulatedProps = {
    objective: {
    name: 'Learn React',
    tasks: ['Read the documentation', 'Build a small project'],
    completed: false
    },
    objectiveIndex: 0,
    handleTaskChange: jest.fn(),
    handleDeleteTask: jest.fn(),
    handleObjectiveChange: jest.fn(),
    handleAddTask: jest.fn(),
    handleCompleteObjective: jest.fn(),
    handleDeleteObjective: jest.fn()
  }
  render(
    <Provider store={store}>
      <BrowserRouter>
          <ObjectiveForm {...simulatedProps} />
      </BrowserRouter>
    </Provider>
  );
});

// Clears all renders
afterEach(() => {
  cleanup();
});

describe('Rendering test for ObjectiveForm component', () => {
    it ('ObjectiveForm add tasks button', () => {
      expect(screen.getByTestId('add-task-btn')).toBeInTheDocument();
    });
    
    it ('ObjectiveForm complete objectives button', () => {
      expect(screen.getByTestId('complete-objective-btn')).toBeInTheDocument();
    });
    
    it ('Delete objectives btn', () => {
      expect(screen.getByTestId('delete-objective-btn')).toBeInTheDocument();
    });
  });
});