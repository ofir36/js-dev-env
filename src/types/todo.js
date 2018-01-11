// @flow

export type Todo = {
    name: string
};

export type State = Todo[];

export type Action = { type: 'ADD_TODO', todo: Todo };
