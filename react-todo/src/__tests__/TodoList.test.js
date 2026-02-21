import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {
  test('renders TodoList and initial tasks', () => {
    render(<TodoList />);
    expect(screen.getByText(/Learn React/i)).toBeInTheDocument();
    expect(screen.getByText(/Build a Todo App/i)).toBeInTheDocument();
  });

  test('adds a new todo item', () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText(/Add a new todo/i);
    const addButton = screen.getByText(/Add Todo/i);
    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(addButton);
    expect(screen.getByText(/New Task/i)).toBeInTheDocument();
  });

  test('toggles todo completion status', () => {
    render(<TodoList />);
    const todoItem = screen.getByText(/Learn React/i);
    fireEvent.click(todoItem);
    expect(todoItem).toHaveStyle('text-decoration: line-through');
    fireEvent.click(todoItem);
    expect(todoItem).not.toHaveStyle('text-decoration: line-through');
  });

  test('deletes a todo item', () => {
    render(<TodoList />);
    const todoItem = screen.getByText(/Learn React/i);
    const deleteButtons = screen.getAllByText(/Delete/i);
    fireEvent.click(deleteButtons[0]);
    expect(todoItem).not.toBeInTheDocument();
  });
});