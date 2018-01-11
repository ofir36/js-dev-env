// @flow
import type { Action } from '../types';
import initialState from './initialState';
import type { State } from '../types/todo';

const todoReducer = (state: State = initialState.todos, action: Action): State => {
    switch (action.type) {
        case 'ADD_TODO':
            return [...state, action.todo];
        default:
            return state;
    }
};

export default todoReducer;
