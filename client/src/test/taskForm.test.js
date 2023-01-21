import { afterEach, beforeEach, expect } from '@jest/globals';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import TaskForm from "../components/form/TaskForm";
import { Provider } from 'react-redux';
import { store } from '../app/store';
import '@testing-library/jest-dom/extend-expect';
import {cleanup, render, screen} from './test-utils'

describe('TaskForm component Tests', () => {
// Renders the necesary stuff
beforeEach(() => {
  const simulatedProps = {
    task:"Test task",
    taskIndex: 0,
    objectiveIndex: 0,
    handleTaskChange: jest.fn(),
    handleDeleteTask: jest.fn(),
    objetiveCompleted: jest.fn()
  };

  render(
    <Provider store={store}>
      <BrowserRouter>
          <TaskForm {...simulatedProps} />
      </BrowserRouter>
    </Provider>
  );
});

// Clears all renders
afterEach(() => {
  cleanup();
});

describe('Rendering test for TaskForm component', () => {
    it ('TaskForm task name input', () => {
      expect(screen.getByTestId('task-name-input')).toBeInTheDocument();
    });

    it ('TaskForm delete tasks task', () => {
      expect(screen.getByTestId('task-delete-btn')).toBeInTheDocument();
    });
    
    it ('TaskForm complete objectives button', () => {
      expect(screen.getByTestId('task-complete-btn')).toBeInTheDocument();
    });
  });
});