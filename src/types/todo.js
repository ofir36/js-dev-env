// @flow

export type Todo = {
    id: number,
    name: string
};

export type State = Todo[];

export type Action =
    | { type: 'ADD_TODO', todo: Todo }
    | { type: 'DELETE_TODO', id: number }
    | { type: 'UPDATE_TODO', todo: Todo };
