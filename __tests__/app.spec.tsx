import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import App from '../app/index';

describe('To-Do App', () => {
  it('should display the title', () => {
    const { getByText } = render(<App />);

    const title = getByText('📝 To-Do List');

    expect(title).toBeTruthy();
  });

  it('should display the input field', () => {
    const { getByPlaceholderText } = render(<App />);

    const input = getByPlaceholderText('Digite uma tarefa...')

    expect(input).toBeTruthy();
  });

  it('should display the add button', () => {
    const { getByText } = render(<App />);

    const addButton = getByText('Adicionar');

    expect(addButton).toBeTruthy();
  });

  it('should add a new task to the list', () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<App />);

    const input = getByPlaceholderText('Digite uma tarefa...');
    const addButton = getByText('Adicionar');

    fireEvent.changeText(input, 'Estudar');
    fireEvent.press(addButton);

    expect(queryByText('• Estudar')).toBeTruthy();
  });

  it('should not add a task when input is empty', () => {
    const { getByText, queryByText } = render(<App />);

    const addButton = getByText('Adicionar');

    fireEvent.press(addButton);

    expect(queryByText('•')).toBeNull();
  });

  it('should not add a task when input is only whitespace', () => {
    const { getByText, queryByText, getByPlaceholderText } = render(<App />);

    const input = getByPlaceholderText('Digite uma tarefa...');
    const addButton = getByText('Adicionar');

    fireEvent.changeText(input, '     ');
    fireEvent.press(addButton);

    expect(queryByText('•     ')).toBeNull();
  });

  it('should remove a task when the remove button is pressed', () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<App />);

    const input = getByPlaceholderText('Digite uma tarefa...');
    const addButton = getByText('Adicionar');

    fireEvent.changeText(input, 'Lavar o carro');
    fireEvent.press(addButton);

    expect(queryByText('• Lavar o carro')).toBeTruthy();

    const deleteButton = getByText('❌');
    fireEvent.press(deleteButton);

    expect(queryByText('• Lavar o carro')).toBeNull();
  });

  it('should show empty state message when there are no tasks', () => {
    const { getByText } = render(<App />);

    expect(getByText('Nenhuma tarefa adicionada.')).toBeTruthy();
  });

  it('should add multiple tasks to the list', () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<App />);
  
    const input = getByPlaceholderText('Digite uma tarefa...');
    const addButton = getByText('Adicionar');
  
    const tasks = ['Acordar', 'Estudar', 'Lavar o carro'];
  
    tasks.forEach((task) => {
      fireEvent.changeText(input, task);
      fireEvent.press(addButton);
    });
  
    tasks.forEach((task) => {
      expect(queryByText(`• ${task}`)).toBeTruthy();
    });
  });

  it('should add a task, remove it, and display "Nenhuma tarefa adicionada" when list is empty', async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<App />);
  
    const input = getByPlaceholderText('Digite uma tarefa...');
    const addButton = getByText('Adicionar');
  
    fireEvent.changeText(input, 'Estudar React');
    fireEvent.press(addButton);
  
    expect(queryByText('• Estudar React')).toBeTruthy();
  
    const deleteButton = getByText('❌');
    fireEvent.press(deleteButton);
  
    expect(queryByText('• Estudar React')).toBeNull();
  
    expect(getByText('Nenhuma tarefa adicionada.')).toBeTruthy();
  });  
});
