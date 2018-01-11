// @flow
import type { Action } from '../types';
import type { Todo } from '../types/todo';

export const addTodo = (todo: Todo): Action => ({ type: 'ADD_TODO', todo });
