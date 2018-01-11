// @flow
import type { Store as ReduxStore, Dispatch as ReduxDispatch } from 'redux';
import type { State as TodoState, Action as TodoAction } from './todo';

export type State = {
    todos: TodoState
};

export type Store = ReduxStore<State, Action, Dispatch>;

export type Action = TodoAction;

export type Dispatch = ReduxDispatch<Action>;
