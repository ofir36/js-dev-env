// @flow
import type { Action } from '../types';
import type { Todo } from '../types/todo';

export const addTodo = (todo: Todo): Action => ({ type: 'ADD_TODO', todo });
export const updateTodo = (todo: Todo): Action => ({
    type: 'UPDATE_TODO',
    todo
});
export const deleteTodo = (id: number): Action => ({
    type: 'DELETE_TODO',
    id
});
