import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {
  
  test('renders the initial todos', () => {
    render(<TodoList />);
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
  });

  test('allows users to add a new todo', () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText('Add a new todo');
    const button = screen.getByText('Add Todo');

    fireEvent.change(input, { target: { value: 'Master Jest' } });
    fireEvent.click(button);

    expect(screen.getByText('Master Jest')).toBeInTheDocument();
  });

  test('toggles a todo status when clicked', () => {
    render(<TodoList />);
    const todoItem = screen.getByText('Learn React');
    
    // Initial state: not completed (no line-through)
    expect(todoItem).not.toHaveStyle('text-decoration: line-through');
    
    // Click to toggle
    fireEvent.click(todoItem);
    expect(todoItem).toHaveStyle('text-decoration: line-through');
    
    // Click again to untoggle
    fireEvent.click(todoItem);
    expect(todoItem).not.toHaveStyle('text-decoration: line-through');
  });

  test('deletes a todo item when delete button is clicked', () => {
    render(<TodoList />);
    const todoText = screen.getByText('Learn React');
    // Get the delete button specifically for 'Learn React'
    // In our component, it's the first button in the first li
    const deleteButtons = screen.getAllByText('Delete');
    
    fireEvent.click(deleteButtons[0]);

    expect(todoText).not.toBeInTheDocument();
  });
});