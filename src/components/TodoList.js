// @flow
import React from 'react';
import type { Todo } from '../types/todo';
import { Segment, Button, Transition } from 'semantic-ui-react';
import '../styles/todoPage.css';

type Props = {
    todos: Todo[],
    onDelete: Function
};

const TodoList = ({ todos, onDelete }: Props) => (
    <Transition.Group as={Segment.Group} animation="fly right">
        {todos.map(todo => (
            <Segment key={todo.id} clearing size="big">
                {todo.name}
                <Button
                    icon="trash"
                    floated="right"
                    color="red"
                    onClick={onDelete}
                    todoid={todo.id}
                    circular
                    basic
                />
            </Segment>
        ))}
    </Transition.Group>
);

export default TodoList;
