// @flow
import type { Action } from '../types';
import initialState from './initialState';
import type { State } from '../types/todo';

const todoReducer = (
    state: State = initialState.todos,
    action: Action
): State => {
    switch (action.type) {
        case 'ADD_TODO':
            return [...state, action.todo];
        case 'DELETE_TODO':
            return state.filter(todo => todo.id !== action.id);
        case 'UPDATE_TODO':
            return state.map(
                todo => (todo.id === action.todo.id ? action.todo : todo)
            );
        default:
            (action: empty); // checks that every case is covered
            return state;
    }
};

export default todoReducer;
