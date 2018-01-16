// @flow
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/todoActions';
import type { State } from '../types';
import type { Todo } from '../types/todo';
import TodoList from './TodoList';
import { Header, Icon } from 'semantic-ui-react';
import TodoInput from './TodoInput';
import '../styles/todoPage.css';

type Props = {
    todos: Todo[],
    actions: typeof actions
};

type LocalState = {
    todoName: string,
    inputFixed: boolean
};

class TodoPage extends React.Component<Props, LocalState> {
    state = {
        todoName: '',
        inputFixed: false
    };

    addTodo = () => {
        if (this.state.todoName === '') return;

        const todo = {
            id: +new Date(),
            name: this.state.todoName
        };

        this.props.actions.addTodo(todo);
        this.setState({ todoName: '' });
    };

    onNameChange = e => {
        const todoName = e.currentTarget.value;
        this.setState({ todoName });
    };

    onInputPassed = () => {
        this.setState({ inputFixed: true });
    };

    onInputVisible = () => {
        this.setState({ inputFixed: false });
    };

    deleteTodo = (e, data) => {
        this.props.actions.deleteTodo(data.todoid);
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
                <TodoList todos={this.props.todos} onDelete={this.deleteTodo} />
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
        actions: bindActionCreators(actions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoPage);
