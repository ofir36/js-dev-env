// @flow
import React from 'react';
import type { Todo } from '../types/todo';
import { Segment, Button, Transition, Input } from 'semantic-ui-react';
import '../styles/todoPage.css';

type Props = {
    todos: Todo[],
    onDelete: Function,
    onEdit: Function,
    onEditConfirm: Function,
    onEditNameChange: Function,
    editInputRef: Function,
    editedTodo: Todo
};

const TodoList = ({
    todos,
    onDelete,
    onEdit,
    editedTodo,
    onEditConfirm,
    onEditNameChange,
    editInputRef
}: Props) => (
    <Transition.Group as={Segment.Group} animation="fly right">
        {todos.map(todo => (
            <Segment key={todo.id} clearing size="big">
                {todo.id === editedTodo.id ? (
                    <Input
                        placeholder={todo.name}
                        value={editedTodo.name}
                        onChange={onEditNameChange}
                        styleName="editInput"
                        onKeyPress={onEditConfirm}
                        ref={editInputRef}
                        transparent
                        focus
                    />
                ) : (
                    todo.name
                )}
                <Button
                    icon="trash"
                    floated="right"
                    color="red"
                    onClick={onDelete}
                    todoid={todo.id}
                    circular
                    basic
                />
                <Button
                    icon="pencil"
                    floated="right"
                    color="black"
                    onClick={onEdit}
                    todo={todo}
                    circular
                    basic
                />
            </Segment>
        ))}
    </Transition.Group>
);

export default TodoList;
