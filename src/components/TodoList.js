// @flow
import React from 'react';
import type { Todo } from '../types/todo';

type Props = {
    todos: Todo[]
};

const TodoList = ({ todos }: Props) => {
    return <ul>{todos.map(todo => <li key={todo.name}>{todo.name}</li>)}</ul>;
};

export default TodoList;
