// @flow
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as _actions from '../actions/todoActions'; // add _ to prevent accidently trying dispatching events
import type { State } from '../types';
import type { Todo } from '../types/todo';
import TodoList from './TodoList';
import { Header, Icon } from 'semantic-ui-react';
import TodoInput from './TodoInput';
import '../styles/todoPage.css';

type Props = {
    todos: Todo[],
    actions: typeof _actions
};

type LocalState = {
    todoName: string,
    inputFixed: boolean,
    editedTodo: Todo
};

class TodoPage extends React.Component<Props, LocalState> {
    state = {
        todoName: '',
        inputFixed: false,
        editedTodo: {
            id: 0,
            name: ''
        }
    };

    componentDidUpdate() {
        if (this.editInput) this.editInput.focus();
    }

    editInput: ?HTMLInputElement;

    addTodo = () => {
        if (this.state.todoName === '') return;

        const todo = {
            id: +new Date(),
            name: this.state.todoName
        };

        this.props.actions.addTodo(todo);
        this.setState({ todoName: '' });
    };

    deleteTodo = (e, { todoid }) => {
        this.props.actions.deleteTodo(todoid);
    };

    onNameChange = e => {
        const todoName = e.currentTarget.value;
        this.setState({ todoName });
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

    onInputPassed = () => {
        this.setState({ inputFixed: true });
    };

    onInputVisible = () => {
        this.setState({ inputFixed: false });
    };

    editInputRef = input => {
        this.editInput = input;
    };

    render() {
        return (
            <div styleName="container">
                <Header as="h1" textAlign="center">
                    <Icon name="tasks" />
                    Todos
                </Header>
                <TodoInput
                    isFixed={this.state.inputFixed}
                    onChange={this.onNameChange}
                    onPassed={this.onInputPassed}
                    onVisible={this.onInputVisible}
                    onSubmit={this.addTodo}
                    todoName={this.state.todoName}
                />
                <TodoList
                    todos={this.props.todos}
                    onDelete={this.deleteTodo}
                    onEdit={this.onEdit}
                    editedTodo={this.state.editedTodo}
                    onEditConfirm={this.onEditConfirm}
                    onEditNameChange={this.onEditNameChange}
                    editInputRef={this.editInputRef}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: State) => {
    return {
        todos: state.todos
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(_actions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoPage);
