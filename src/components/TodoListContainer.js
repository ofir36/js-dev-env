// @flow
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TodoList from './TodoList';
import * as actionCreators from '../actions/todoActions';
import type { Todo } from '../types/todo';
import type { State as AppState } from '../types';

type Props = {
    actions: typeof actionCreators,
    todos: Todo[]
};

type State = {
    editedTodo: Todo
};

class TodoListContainer extends React.Component<Props, State> {
    state = {
        editedTodo: {
            id: 0,
            name: ''
        }
    };

    componentDidUpdate() {
        if (this.editInput) this.editInput.focus();
    }

    editInput: ?HTMLInputElement;

    deleteTodo = (e, { todoid }) => {
        this.props.actions.deleteTodo(todoid);
    };

    onEdit = (e, { todo }) => {
        this.setState(prevState => {
            const editedTodo =
                prevState.editedTodo.id === 0
                    ? { ...todo, name: '' }
                    : { id: 0, name: '' };
            return { editedTodo };
        });
    };

    onEditConfirm = e => {
        if (e.key === 'Enter') {
            this.props.actions.updateTodo(this.state.editedTodo);
            this.setState({ editedTodo: { id: 0, name: '' } });
        }
    };

    onEditNameChange = e => {
        e.persist();

        this.setState(prevState => {
            const editedTodo = {
                ...prevState.editedTodo,
                name: e.target.value
            };
            return { editedTodo };
        });
    };

    editInputRef = input => {
        this.editInput = input;
    };

    render() {
        return (
            <TodoList
                todos={this.props.todos}
                onDelete={this.deleteTodo}
                onEdit={this.onEdit}
                editedTodo={this.state.editedTodo}
                onEditConfirm={this.onEditConfirm}
                onEditNameChange={this.onEditNameChange}
                editInputRef={this.editInputRef}
            />
        );
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        todos: state.todos
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoListContainer);
